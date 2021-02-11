import React, { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// import { handleResize, onMouseMove } from '../engine/main';

const SoundShape = () => {
	// React Hooks

	const [isAnimating, setAnimating] = useState(true);
	const mount = useRef(null);
	// const controls = useRef(null);
	useEffect(() => {
		initCanvas();
		animate();

		// start();
		// controls.current = { start, stop };
		// window.addEventListener('dblclick', addInstrument, false);
		// window.addEventListener('click', playSound, false);
		// window.addEventListener('mousemove', onMouseMove);
		// window.addEventListener('resize', handleResize);
		//Trash Clean up
		return () => {
			stop();
			// window.removeEventListener('resize', handleResize);
			//dragControls.removeEventListener('drag', onDrag);
			// for (let i = 0; i < scene.length; i++) {
			//   scene.remove(i);
			// }
		};
	}, []);

	const getMat = (color) => {
		// our material is a phong material, with no shininess (highlight) and a black specular
		return new THREE.MeshStandardMaterial({
			color: color,
			roughness: 0.9,
			//shininess:0,
			//specular:0x000000,
			emissive: 0x270000,
			shading: THREE.FlatShading // THREE.SmoothShading
		});
	};

	// colors

	const Colors = {
		green: 0x8fc999,
		blue: 0x5fc4d0,
		orange: 0xee5624,
		yellow: 0xfaff70
	};

	let colorsLength = Object.keys(Colors).length;

	function getRandomColor() {
		let colIndx = Math.floor(Math.random() * colorsLength);
		let colorStr = Object.keys(Colors)[colIndx];
		return Colors[colorStr];
	}

	// parameters to customize the planet
	let parameters = {
		minRadius: 30,
		maxRadius: 50,
		minSpeed: 0.015,
		maxSpeed: 0.025,
		particles: 300,
		minSize: 0.1,
		maxSize: 2
	};

	// For a THREEJS project we need at least
	// a scene
	// a renderer
	// a camera
	// a light (1 or many)
	// a mesh (an object to display)

	let scene, renderer, camera, jamShape, light;

	let WIDTH = window.innerWidth,
		HEIGHT = window.innerHeight;

	let controls;

	// initialise the Canvas

	function initCanvas() {
		//
		// THE SCENE
		//
		scene = new THREE.Scene();

		//
		// THE CAMERA
		//

		// Perspective or Orthographic
		// Field of view : I use 75, play with it
		// Aspect ratio : width / height of the screen
		// near and far plane : I usually set them at .1 and 2000
		/*
  camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane
  );
  */
		camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 2000);
		camera.position.z = 100;

		//
		// THE RENDERER
		//

		renderer = new THREE.WebGLRenderer({
			alpha: true,
			antialias: true
		});
		renderer.setSize(WIDTH, HEIGHT);
		renderer.shadowMap.enabled = true;

		// Make the renderer use the #canvas2 div to render le scene

		mount.current.appendChild(renderer.domElement);

		//
		// LIGHT
		//
		// test these
		// let globalLight = new THREE.HemisphereLight(skyColor, groundColor, intensity);
		// let ambiantLight = new THREE.AmbientLight( globalColor );
		// let pointLight = new THREE.PointLight(color, intensity, radius, decay);
		// let directionalLight = new THREE.DirectionlLight(color, intensity);

		ambientLight = new THREE.AmbientLight(0x663344, 2);
		scene.add(ambientLight);

		light = new THREE.DirectionalLight(0xffffff, 1.5);
		light.position.set(200, 100, 200);
		light.castShadow = true;
		light.shadow.camera.left = -400;
		light.shadow.camera.right = 400;
		light.shadow.camera.top = 400;
		light.shadow.camera.bottom = -400;
		light.shadow.camera.near = 1;
		light.shadow.camera.far = 1000;
		light.shadow.mapSize.width = 2048;
		light.shadow.mapSize.height = 2048;

		scene.add(light);

		//
		// CONTROLS
		// used to rotate around the scene with the mouse
		// you can drag to rotate, scroll to zoom
		//
		controls = new OrbitControls(camera, renderer.domElement);

		//
		// HANDLE SCREEN RESIZE
		//
		window.addEventListener('resize', handleWindowResize, false);

		//
		// CREATE THE OBJECT
		//
		/*
  let cubeGeom = new THREE.SphereGeometry(20,10,10);
  let matGeom = new THREE.MeshPhongMaterial({color:0xff0000, shading:THREE.FlatShading});
  cube = new THREE.Mesh(cubeGeom, matGeom);
  scene.add(cube);
  */

		jamShape = new jamShape();
		jamShape.mesh.rotation.x = 0.2;
		jamShape.mesh.rotation.z = 0.2;
		scene.add(jamShape.mesh);

		// START THE LOOP
		loop();
	}

	let JamShape = function () {
		//
		// CREATE A MESH
		//
		// A Mesh = Geometry + Material
		// A mesh must be added to the scene to be rendered
		// let mesh = new THREE.Mesh(geometry, material);
		// scene.add(mesh);

		// to create JamShape, we need
		// - a mesh for the planet
		// - a mesh for the ring
		// - a mesh that holds the planet and the ring

		// the geometry of the planet is a tetrahedron
		let geomPlanet = new THREE.TetrahedronGeometry(20, 2);

		// The shape of the planet is too perfect for my taste
		// let's manipulate the geometry and move the vertices randomly
		// to make it look like a rock

		let noise = 5;
		for (let i = 0; i < geomPlanet.vertices.length; i++) {
			let v = geomPlanet.vertices[i];
			v.x += -noise / 2 + Math.random() * noise;
			v.y += -noise / 2 + Math.random() * noise;
			v.z += -noise / 2 + Math.random() * noise;
		}

		// create a new material for the planet
		let matPlanet = getMat(Colors.orange);
		// create the mesh of the planet
		this.planet = new THREE.Mesh(geomPlanet, matPlanet);

		this.ring = new THREE.Mesh();
		this.nParticles = 0;

		// create the particles to populate the ring
		this.updateParticlesCount();

		// Create a global mesh to hold the planet and the ring

		this.mesh = new THREE.Object3D();
		this.mesh.add(this.planet);
		this.mesh.add(this.ring);

		this.planet.castShadow = true;
		this.planet.receiveShadow = true;

		// update the position of the particles => must be moved to the loop
		this.updateParticlesRotation();
	};
	/*maybe dont need this? not updating particles?*/
	JamShape.prototype.updateParticlesCount = function () {
		if (this.nParticles < parameters.particles) {
			// Remove particles

			for (let i = this.nParticles; i < parameters.particles; i++) {
				let p = new Particle();
				p.mesh.rotation.x = Math.random() * Math.PI;
				p.mesh.rotation.y = Math.random() * Math.PI;
				p.mesh.position.y = -2 + Math.random() * 4;
				this.ring.add(p.mesh);
			}
		} else {
			// add particles

			while (this.nParticles > parameters.particles) {
				let m = this.ring.children[this.nParticles - 1];
				this.ring.remove(m);
				m.userData.po = null;
				this.nParticles--;
			}
		}
		this.nParticles = parameters.particles;

		// We will give a specific angle to each particle
		// to cover the whole ring we need to
		// dispatch them regularly
		this.angleStep = (Math.PI * 2) / this.nParticles;
		this.updateParticlesDefiniton();
	};

	// Update particles definition
	/**
	 * maybe dont need this? no particles?
	 *
	 */
	JamShape.prototype.updateParticlesDefiniton = function () {
		for (let i = 0; i < this.nParticles; i++) {
			let m = this.ring.children[i];
			let s =
				parameters.minSize + Math.random() * (parameters.maxSize - parameters.minSize);
			m.scale.set(s, s, s);

			// set a random distance
			m.userData.distance =
				parameters.minRadius +
				Math.random() * (parameters.maxRadius - parameters.minRadius);

			// give a unique angle to each particle
			m.userData.angle = this.angleStep * i;
			// set a speed proportionally to the distance
			m.userData.angularSpeed = rule3(
				m.userData.distance,
				parameters.minRadius,
				parameters.maxRadius,
				parameters.minSpeed,
				parameters.maxSpeed
			);
		}
	};

	let Particle = function () {
		// Size of the particle, make it random
		let s = 1;

		// geometry of the particle, choose between different shapes
		let geom,
			random = Math.random();

		if (random < 0.25) {
			// Cube
			geom = new THREE.BoxGeometry(s, s, s);
		} else if (random < 0.5) {
			// Pyramid
			geom = new THREE.CylinderGeometry(0, s, s * 2, 4, 1);
		} else if (random < 0.75) {
			// potato shape
			geom = new THREE.TetrahedronGeometry(s, 2);
		} else {
			// thick plane
			geom = new THREE.BoxGeometry(s / 6, s, s); // thick plane
		}
		// color of the particle, make it random and get a material
		let color = getRandomColor();
		let mat = getMat(color);

		// create the mesh of the particle
		this.mesh = new THREE.Mesh(geom, mat);
		this.mesh.receiveShadow = true;
		this.mesh.castShadow = true;
		this.mesh.userData.po = this;
	};

	// Update particles position
	/**
	 * same dont need?
	 *
	 */
	JamShape.prototype.updateParticlesRotation = function () {
		// increase the rotation of each particle
		// and update its position

		for (let i = 0; i < this.nParticles; i++) {
			let m = this.ring.children[i];
			// increase the rotation angle around the planet
			m.userData.angle += m.userData.angularSpeed;

			// calculate the new position
			let posX = Math.cos(m.userData.angle) * m.userData.distance;
			let posZ = Math.sin(m.userData.angle) * m.userData.distance;
			m.position.x = posX;
			m.position.z = posZ;

			//*
			// add a local rotation to the particle
			m.rotation.x += Math.random() * 0.05;
			m.rotation.y += Math.random() * 0.05;
			m.rotation.z += Math.random() * 0.05;
			//*/
		}
	};

	function loop() {
		//
		// Life is about movement, make the cube rotate
		// increase the rotation by a small amount in each frame
		//cube.rotation.z +=.01;
		//cube.rotation.x +=.05;
		jamShape.planet.rotation.y -= 0.01;
		jamShape.updateParticlesRotation();
		//
		// RENDER !
		//
		renderer.render(scene, camera);

		//
		// REQUEST A NEW FRAME
		//
		requestAnimationFrame(loop);
	}

	function handleWindowResize() {
		// Recalculate Width and Height as they had changed
		HEIGHT = window.innerHeight;
		WIDTH = window.innerWidth;

		// Update the renderer and the camera
		renderer.setSize(WIDTH, HEIGHT);
		camera.aspect = WIDTH / HEIGHT;
		camera.updateProjectionMatrix();
	}

	initCanvas();

	function rule3(v, vmin, vmax, tmin, tmax) {
		let nv = Math.max(Math.min(v, vmax), vmin);
		let dv = vmax - vmin;
		let pc = (nv - vmin) / dv;
		let dt = tmax - tmin;
		let tv = tmin + pc * dt;
		return tv;
	}

	//Listens for Start and Stop
	// useEffect(() => {
	// 	if (isAnimating) {
	// 		controls.current.start();
	// 	} else {
	// 		controls.current.stop();
	// 	}
	// }, [isAnimating]);

	return (
		<motion.div
			exit={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			initial={{ opacity: 0.9 }}
			transition={{ duration: 0.5 }}
		>
			<div
				className='App'
				id='canvas2'
				ref={mount}
				style={{ background: 'transparent' }}
			/>
		</motion.div>
	);
};
export default SoundShape;

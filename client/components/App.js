import React, { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import { DragControls } from 'three/examples/jsm/controls/DragControls';
import * as Tone from 'tone';
import Instrument from './Instrument';
import { Slider } from './Slider';
import { About } from './About';
import Modal from 'react-modal';
import './css/App.css';
// import play_pause from '../../public/assets/play-pause.png';

import 'firebase/firestore';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from './Home';
import { Redirect } from 'react-router-dom';

const App = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const mount = useRef(null);
	const [isAnimating, setAnimating] = useState(true);
	const controls = useRef(null);
	const [redirectTo, setRedirectTo] = useState(false);

	const [user] = useAuthState(auth); //user JSON
	console.log('user-->', user);

	// Database Reference
	// const sceneRef = db.collection('scenes');
	// const citiesRef = db.collection('cities');

	// async function setCities() {
	//   return await citiesRef.doc('SF').set({
	//     name: 'San Francisco',
	//     state: 'CA',
	//     country: 'USA',
	//     capital: false,
	//     population: 860000,
	//   });
	// }

	// async function setScene() {
	//   return await sceneRef.doc('scene').set({
	//     scene:
	//   })
	// }
	// console.log(scene)
	// setCities();
	// get
	// const cityRef = db.collection('cities').doc('SF');

	// async function fetchCities() {
	//   const doc = await cityRef.get();
	//   if (!doc.exists) {
	//     console.log('No such document!');
	//   } else {
	//     console.log('Document data:', doc.data());
	//   }
	// }
	// fetchCities();

	// //db Collection reference
	// const sessionRef = db.collection('Session');
	// console.log('sessionRef-->', sessionRef);

	// //query
	// const query = async () => await sessionRef.get();
	// console.log('query-->', query());

	// const [SessionList] = useCollectionData(query);
	// console.log('SessionList-->', SessionList);

	//soundstuffs
	// const chords = [
	//   'A0 C1 E1',
	//   'F0 A0 C1',
	//   'G0 B0 D1',
	//   'D0 F0 A0',
	//   'E0 G0 B0',
	// ].map(formatChords);

	// Tone.Transport.scheduleRepeat(onRepeat, '16n');
	// Tone.Transport.start();
	// Tone.Transport.bpm.value = 90;
	// const synth = new Tone.Synth();
	// const gain = new Tone.Gain(0.7);
	// synth.oscillator.type = 'sine';
	// gain.toDestination();
	// synth.connect(gain);

	const toggleModal = () => {
		setModalOpen(!modalOpen);
	};

	useEffect(() => {
		const size = 1000;
		const aspect = window.innerWidth / window.innerHeight;
		let frameId;

		const scene = new THREE.Scene();
		const camera = new THREE.OrthographicCamera(
			(size * aspect) / -2,
			(size * aspect) / 2,
			size / 2,
			size / -2,
			-1000,
			1000
		);
		const handleResize = () => {
			const newAspect = window.innerWidth / window.innerHeight;
			camera.left = (size * newAspect) / -2;
			camera.right = (size * newAspect) / 2;
			camera.top = size / 2;
			camera.bottom = size / -2;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		};

		camera.position.z = 30;
		const renderer = new THREE.WebGLRenderer({ alpha: true });
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setClearColor(0x38373d, 1);
		mount.current.appendChild(renderer.domElement);

		//Lights
		const light = new THREE.DirectionalLight(0xffffff, 1);
		light.position.set(1, 1, 1).normalize();
		scene.add(light);

		//create Jam Space and the Hammer
		const jamSpaceGeometry = new THREE.RingGeometry(10, 10, 32);
		const jamSpaceMaterial = new THREE.MeshBasicMaterial({
			color: 0x1be322,
			side: THREE.DoubleSide,
			wireframe: true,
			wireframeLinewidth: 2
		});
		const jamSpace = new THREE.LineLoop(jamSpaceGeometry, jamSpaceMaterial);
		jamSpace.scale.set(20, 20, 20);
		scene.add(jamSpace);

		const hammerGeometry = new THREE.BoxGeometry(0.1, 10, 0.1);
		const hammerMaterial = new THREE.MeshBasicMaterial({
			color: 0x1be322,
			side: THREE.DoubleSide,
			wireframe: false
		});
		const hammer = new THREE.Mesh(hammerGeometry, hammerMaterial);
		hammer.position.y = 5;
		hammer.geometry.computeBoundingBox();
		let hammerBox = new THREE.Box3();
		hammerBox.setFromObject(hammer);
		jamSpace.add(hammer);

		//Instruments
		//generates a randomized set of instruments (in this case, 6)
		//includes random coordinates outside of jamSpace, and random sound
		const draggableObjects = [];
		const instruments = [];
		for (let i = 0; i <= 6; i++) {
			const newInstrument = new Instrument();
			instruments.push(newInstrument);
			draggableObjects.push(newInstrument.mesh);
			scene.add(newInstrument.mesh);
		}

		let dragControls = new DragControls(
			[...draggableObjects],
			camera,
			renderer.domElement
		);
		dragControls.addEventListener('drag', onDrag);
		function onDrag() {
			renderScene();
		}

		//Mouse Events
		const mouse = new THREE.Vector2();
		const raycaster = new THREE.Raycaster();
		let objectSelect;

		function onMouseMove(event) {
			event.preventDefault();
			mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
			mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
		}

		function addInstrument() {
			console.log(modalOpen);
			const newInstrument = new Instrument();
			instruments.push(newInstrument);
			scene.add(newInstrument.mesh);
			draggableObjects.push(newInstrument.mesh);
			dragControls = new DragControls(
				[...draggableObjects],
				camera,
				renderer.domElement
			);
		}

		function playSound() {
			if (objectSelect) {
				if (objectSelect.hover) {
					objectSelect.sound();
					console.log('sound fired!');
				}
			}
		}

		window.addEventListener('dblclick', addInstrument, false);
		window.addEventListener('click', playSound, false);
		window.addEventListener('mousemove', onMouseMove);
		window.addEventListener('resize', handleResize);

		let sliderValue = 0.05;
		let slider = document.getElementById('slider');
		slider.addEventListener('input', onInput);
		function onInput() {
			sliderValue = Number(slider.value);
		}

		//FireStore
		const sceneRef = db.collection('scenes');

		async function setScene() {
			return await sceneRef.doc('scenes').set({
				scene: scene.toJSON()
			});
		}

		async function fetchScene() {
			const doc = await sceneRef.doc('scene').get();
			if (!doc.exists) {
				console.log('No such document!');
			} else {
				console.log('Document data:', doc.data());
			}
		}
		// fetchScene();

		//  async function setCities() {
		//   return await citiesRef.doc('SF').set({
		//     name: 'San Francisco',
		//     state: 'CA',
		//     country: 'USA',
		//     capital: false,
		//     population: 860000,
		//   });
		// }

		//Render & Animate Functions
		const renderScene = () => {
			//  raycaster set up
			raycaster.setFromCamera(mouse, camera);
			const intersects = raycaster.intersectObjects(draggableObjects);
			if (intersects.length > 0) {
				if (objectSelect !== intersects[0].object) {
					if (objectSelect)
						objectSelect.material.emissive.setHex(objectSelect.currentHex);

					objectSelect = intersects[0].object;
					objectSelect.hover = true;
					objectSelect.currentHex = objectSelect.material.emissive.getHex();
					objectSelect.material.emissive.setHex(0xff0000);
				}
			} else {
				if (objectSelect)
					objectSelect.material.emissive.setHex(objectSelect.currentHex);

				objectSelect = null;
			}

			renderer.render(scene, camera);
		};
		const animate = () => {
			jamSpace.rotation.z += 0.01;

			hammerBox.copy(hammer.geometry.boundingBox).applyMatrix4(hammer.matrixWorld);
			hammerBox.setFromObject(hammer);

			jamSpace.rotation.z += sliderValue;
			//NEEDS OPTIMIZING ---
			instruments.forEach((instrument) => {
				//every instrument is rotated
				instrument.mesh.rotation.y += 0.01;
				instrument.mesh.rotation.x -= 0.01;

				//every instruments' collision trigger is set
				instrument.boundary
					.copy(instrument.mesh.geometry.boundingBox)
					.applyMatrix4(instrument.mesh.matrixWorld);

				if (instrument.boundary.intersectsBox(hammerBox)) {
					if (instrument.alreadyPlayed === false) {
						instrument.playSound();
						instrument.alreadyPlayed = true;
					}
				} else {
					instrument.alreadyPlayed = false;
				}
			});
			//if the hammer strikes the instrument, play note
			//setScene();
			renderScene();
			//fetchScene();
			frameId = window.requestAnimationFrame(animate);
		};

		const start = () => {
			if (!frameId) {
				frameId = requestAnimationFrame(animate);
			}
		};
		const stop = () => {
			cancelAnimationFrame(frameId);
			frameId = null;
		};

		start();
		controls.current = { start, stop };

		//Trash Clean up
		return () => {
			stop();
			window.removeEventListener('resize', handleResize);
			mount.current.removeChild(renderer.domElement);
			dragControls.removeEventListener('drag', onDrag);
			for (let i = 0; i < scene.length; i++) {
				scene.remove(i);
			}
		};
	}, []);

	//Listens for Start and Stop
	useEffect(() => {
		if (isAnimating) {
			controls.current.start();
		} else {
			controls.current.stop();
		}
	}, [isAnimating]);

	const endSession = () => {
		setRedirectTo(true);
		setAnimating(false);
	};
	if (redirectTo) {
		return <Redirect to='/' />;
	}
	return (
		<div
			className='App'
			ref={mount}
			// onClick={() => setAnimating(!isAnimating)}
		>
			<button onClick={() => setAnimating(!isAnimating)}>
				{/* <img
					src={play_pause}
					alt='play-pause'
					
				/> */}
				Play / Pause
			</button>
			<button
				onClick={() => {
					setRedirectTo(true);
				}}
			>
				End Session
			</button>
			<Slider id='slider' />
			<About toggleModal={toggleModal} />
			<Modal className='Modal' appElement={mount.current} isOpen={modalOpen}>
				<div className='modalTextDiv'>
					double click these shapes to adjust their sounds
					<br />
					single click to play a sound
					<br />
					jam with your friends or play by yourself <br />
					PLACEHOLDERS
				</div>
				<button className='closer' onClick={() => setModalOpen(!modalOpen)}>
					close
				</button>
			</Modal>
		</div>
	);
};

export default App;

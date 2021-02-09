import React, { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import { DragControls } from 'three/examples/jsm/controls/DragControls';
import * as Tone from 'tone';
import Instrument from './Instrument';
import Drums from './Drums';
import Chords from './Chords';
//import Trumpet from "./Trumpet";
import { Slider } from './Slider';
import { About } from './About';
import Modal from 'react-modal';
import './css/App.css';
import Chat from './Chat';
import socket from '../socket';
import { connect } from 'react-redux';
// import play_pause from '../../public/assets/play-pause.png';

import 'firebase/firestore';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from './Home';
import { Redirect } from 'react-router-dom';
import TonePalette from './TonePalette';

const App = () => {
  const [redirectTo, setRedirectTo] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [hovering, setHovering] = useState(false);
  const mount = useRef(null);
  const [isAnimating, setAnimating] = useState(true);
  const controls = useRef(null);
  const hover = useRef(null);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  useEffect(() => {
    const size = 1000;
    const aspect = window.innerWidth / window.innerHeight;
    let frameId;

    let { scene } = store.getState()
console.log("entrys scene", scene)
   oldScene = Object.fromEntries(scene)
   
    console.log('scnee from the store', scene)
   let newScene = new THREE.Scene()
   console.log('fresh scene', newScene)
    console.log('assigned scene', Object.assign(newScene, scene))
   
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
      wireframeLinewidth: 2,
    });
    const jamSpace = new THREE.LineLoop(jamSpaceGeometry, jamSpaceMaterial);
    jamSpace.scale.set(30, 30, 30);
    scene.add(jamSpace);

    const hammerGeometry = new THREE.BoxGeometry(0.1, 10, 0.1);
    const hammerMaterial = new THREE.MeshBasicMaterial({
      color: 0x1be322,
      side: THREE.DoubleSide,
      wireframe: false,
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
    oldScene.mesh ? ( scene.add( oldScene.mesh )) :
    for (let i = 0; i <= 2; i++) {
      const newInstrument = new Instrument();
      instruments.push(newInstrument);
      draggableObjects.push(newInstrument.mesh);
      scene.add(newInstrument.mesh);
    }
    const drums = [];
    for (let i = 0; i <= 2; i++) {
      const newDrum = new Drums();
      drums.push(newDrum);
      draggableObjects.push(newDrum.mesh);
      scene.add(newDrum.mesh);
    }
    const chords = [];
    for (let i = 0; i <= 2; i++) {
      const newChord = new Drums();
      chords.push(newChord);
      draggableObjects.push(newChord.mesh);
      scene.add(newChord.mesh);
    }
    /*     const trumpets = [];
    for (let i = 0; i <= 2; i++) {
      const newTrumpet = new Trumpet();
      trumpets.push(newTrumpet);
      draggableObjects.push(newTrumpet.mesh);
      scene.add(newTrumpet.mesh);
    } */
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
    function addDrum() {
      const newDrum = new Drums();
      drums.push(newDrum);
      scene.add(newDrum.mesh);
      draggableObjects.push(newDrum.mesh);
      dragControls = new DragControls(
        [...draggableObjects],
        camera,
        renderer.domElement
      );
    }
    function addChord() {
      const newChord = new Chords();
      chords.push(newChord);
      scene.add(newChord.mesh);
      draggableObjects.push(newChord.mesh);
      dragControls = new DragControls(
        [...draggableObjects],
        camera,
        renderer.domElement
      );
    }
    /*     function addTrumpet() {
      const newTrumpet = new Trumpet();
      trumpets.push(newTrumpet);
      scene.add(newTrumpet.mesh);
      draggableObjects.push(newTrumpet.mesh);
      dragControls = new DragControls(
        [...draggableObjects],
        camera,
        renderer.domElement
      );
    } */

    function playSound() {
      if (objectSelect) {
        if (objectSelect.hover) {
          console.log(objectSelect);
          objectSelect.sound();
        }
      }
    }
    const drumIcon = document.getElementById('drumIcon');
    drumIcon.addEventListener('click', function () {
      addDrum();
    });
    const addInstrumentIcon = document.getElementById('addInstrumentIcon');
    addInstrumentIcon.addEventListener('click', function () {
      addInstrument();
    });
    const chordIcon = document.getElementById('chordIcon');
    chordIcon.addEventListener('click', function () {
      addChord();
    });
    /*     const trumpetIcon = document.getElementById("trumpetIcon");
    trumpetIcon.addEventListener("click", function () {
      addTrumpet();
    }); */
    window.addEventListener('dblclick', addInstrument, false);
    window.addEventListener('click', playSound, false);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', handleResize);

    let sliderValue = 0.05;
    let slider = document.getElementById('slider');
    slider.addEventListener('change', onInput);
    function onInput() {
      sliderValue = Number(slider.value);
      console.log(slider);
    }

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

      hammerBox
        .copy(hammer.geometry.boundingBox)
        .applyMatrix4(hammer.matrixWorld);
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
      drums.forEach((drum) => {
        drum.mesh.rotation.y += 0.01;
        drum.mesh.rotation.x -= 0.01;

        drum.boundary
          .copy(drum.mesh.geometry.boundingBox)
          .applyMatrix4(drum.mesh.matrixWorld);

        if (drum.boundary.intersectsBox(hammerBox)) {
          if (drum.alreadyPlayed === false) {
            drum.playSound();
            drum.alreadyPlayed = true;
          }
        } else {
          drum.alreadyPlayed = false;
        }
      });
      chords.forEach((chord) => {
        chord.mesh.rotation.y += 0.01;
        chord.mesh.rotation.x -= 0.01;

        chord.boundary
          .copy(chord.mesh.geometry.boundingBox)
          .applyMatrix4(chord.mesh.matrixWorld);

        if (chord.boundary.intersectsBox(hammerBox)) {
          if (chord.alreadyPlayed === false) {
            chord.playSound();
            chord.alreadyPlayed = true;
          }
        } else {
          chord.alreadyPlayed = false;
        }
      });
      socket.emit('update_scene', scene);
      renderScene();
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
    setAnimating(false);
    auth.currentUser ? setRedirectTo('studio') : setRedirectTo('');
  };

  // if (redirectTo) {
  // 	return <Redirect to={redirectTo} />;
  // }
  return (
    <div
      className="App"
      ref={mount}
      style={{ background: 'transparent' }}
      // onClick={() => setAnimating(!isAnimating)}
    >
      <button className="startstop" onClick={() => setAnimating(!isAnimating)}>
        {/* <img
					src={play_pause}
					alt='play-pause'

				/> */}
        Play / Pause
      </button>
      <button
        className="startstop2"
        onClick={() => {
          endSession;
        }}
      >
        End Session
      </button>

      <Slider id="slider" />
      <About toggleModal={toggleModal} />
      <Modal className="Modal" appElement={mount.current} isOpen={modalOpen}>
        <div className="modalTextDiv">
          double click these shapes to adjust their sounds
          <br />
          single click to play a sound
          <br />
          jam with your friends or play by yourself <br />
          PLACEHOLDERS
        </div>
        <button className="closer" onClick={() => setModalOpen(!modalOpen)}>
          close
        </button>
      </Modal>
      <Chat id="chatbox" />
      <TonePalette />
    </div>
  );
};

export default App;

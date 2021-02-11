import * as THREE from 'three';
import Instrument from '../components/Instruments/Instrument';
import Drums from '../components/Instruments/Drums';
import Chords from '../components/Instruments/Chords';
import Marimba from '../components/Instruments/Marimba';
import Harp from '../components/Instruments/Harp';
import Keyboard from '../components/Instruments/Harp';
import Piano from '../components/Instruments/Harp';
import FeedbackDelay from '../components/Instruments/FeedbackDelay';

import { DragControls } from 'three/examples/jsm/controls/DragControls';
import { nanoid } from 'nanoid';
import { dragInstrument } from '../reducer/instruments';
import store from '../store';
import socket from '../socket';

let size, aspect, frameId, canvas;
let scene, camera, renderer, light;
let mouse, mouseThree, raycaster, objectSelect, dragControls;
let hammer, hammerBox, jamSpace;
let draggableObjects;
let sliderValue;
let instruments = [];
draggableObjects = [];

export const init = () => {
  socket.emit('get_all_instruments');
  instruments = store.getState().instruments;
  size = 1000;
  aspect = window.innerWidth / window.innerHeight;
  canvas = document.getElementById('canvas');

  scene = new THREE.Scene();
  camera = new THREE.OrthographicCamera(
    (size * aspect) / -2,
    (size * aspect) / 2,
    size / 2,
    size / -2,
    -1000,
    1000
  );
  camera.position.z = 30;
  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  // renderer.setClearColor(0x38373d, 1);
  canvas.appendChild(renderer.domElement);

  light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(1, 1, 1).normalize();
  scene.add(light);

  //create Jam Space and the Hammer
  let jamSpaceGeometry = new THREE.RingGeometry(10, 10, 32);
  let jamSpaceMaterial = new THREE.MeshBasicMaterial({
    color: 0x1be322,
    side: THREE.DoubleSide,
    wireframe: true,
    wireframeLinewidth: 2,
  });
  jamSpace = new THREE.LineLoop(jamSpaceGeometry, jamSpaceMaterial);
  jamSpace.scale.set(30, 30, 30);
  scene.add(jamSpace);

  let hammerGeometry = new THREE.BoxGeometry(0.1, 10, 0.1);
  let hammerMaterial = new THREE.MeshBasicMaterial({
    color: 0x1be322,
    side: THREE.DoubleSide,
    wireframe: false,
  });
  hammer = new THREE.Mesh(hammerGeometry, hammerMaterial);
  hammer.position.y = 5;
  hammer.geometry.computeBoundingBox();
  hammerBox = new THREE.Box3();
  hammerBox.setFromObject(hammer);
  jamSpace.add(hammer);

  instruments.forEach((instrument) => {
    draggableObjects.push(instrument.mesh);
  });

  dragControls = new DragControls(
    draggableObjects,
    camera,
    renderer.domElement
  );
  dragControls.addEventListener('drag', onDrag);
  //dragControls.addEventListener('dragend', onDragEnd);

  mouse = new THREE.Vector2();
  mouseThree = new THREE.Vector3();
  raycaster = new THREE.Raycaster();

  sliderValue = 0.05;
  let slider = document.getElementById('slider');
  slider.addEventListener('change', onInput);
  function onInput() {
    sliderValue = Number(slider.value);
  }

  //USER INTERFACE
  const drumIcon = document.getElementById('drumIcon');
  drumIcon.addEventListener('click', function () {
    addDrum();
  });
  const addInstrumentIcon = document.getElementById('addInstrumentIcon');
  addInstrumentIcon.addEventListener('click', function (e) {
    addInstrument();
  });
  const chordIcon = document.getElementById('chordIcon');
  chordIcon.addEventListener('click', function () {
    addChord();
  });
  const pianoIcon = document.getElementById('pianoIcon');
  pianoIcon.addEventListener('click', function () {
    addPiano();
  });
  const marimbaIcon = document.getElementById('marimbaIcon');
  marimbaIcon.addEventListener('click', function () {
    addMarimba();
  });
  const harpIcon = document.getElementById('harpIcon');
  harpIcon.addEventListener('click', function () {
    addHarp();
  });
  const feedbackDelayIcon = document.getElementById('feedbackDelayIcon');
  feedbackDelayIcon.addEventListener('click', function () {
    addfeedbackDelay();
  });
};

export const renderScene = () => {
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

export const animate = () => {
  jamSpace.rotation.z += 0.01;
  hammerBox.copy(hammer.geometry.boundingBox).applyMatrix4(hammer.matrixWorld);
  hammerBox.setFromObject(hammer);

  jamSpace.rotation.z += sliderValue;

  if (instruments) {
    instruments.forEach((instrument) => {
      instrument.mesh.rotation.y += 0.01;
      instrument.mesh.rotation.x -= 0.01;
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
  }

  // pianos.forEach((piano) => {
  //   piano.mesh.rotation.y += 0.01;
  //   piano.mesh.rotation.x -= 0.01;
  //   piano.boundary
  //     .copy(piano.mesh.geometry.boundingBox)
  //     .applyMatrix4(piano.mesh.matrixWorld);

  //   if (piano.boundary.intersectsBox(hammerBox)) {
  //     if (piano.alreadyPlayed === false) {
  //       piano.playSound();
  //       piano.alreadyPlayed = true;
  //     }
  //   } else {
  //     piano.alreadyPlayed = false;
  //   }
  // });
  // marimbas.forEach((marimba) => {
  //   marimba.mesh.rotation.y += 0.01;
  //   marimba.mesh.rotation.x -= 0.01;

  //   marimba.boundary
  //     .copy(marimba.mesh.geometry.boundingBox)
  //     .applyMatrix4(marimba.mesh.matrixWorld);

  //   if (marimba.boundary.intersectsBox(hammerBox)) {
  //     if (marimba.alreadyPlayed === false) {
  //       marimba.playSound();
  //       marimba.alreadyPlayed = true;
  //     }
  //   } else {
  //     marimba.alreadyPlayed = false;
  //   }
  // });
  // harps.forEach((harp) => {
  //   harp.mesh.rotation.y += 0.01;
  //   harp.mesh.rotation.x -= 0.01;

  //   harp.boundary
  //     .copy(harp.mesh.geometry.boundingBox)
  //     .applyMatrix4(harp.mesh.matrixWorld);

  //   if (harp.boundary.intersectsBox(hammerBox)) {
  //     if (harp.alreadyPlayed === false) {
  //       harp.playSound();
  //       harp.alreadyPlayed = true;
  //     }
  //   } else {
  //     harp.alreadyPlayed = false;
  //   }
  // });
  // feedbackDelays.forEach((feedbackDelay) => {
  //   feedbackDelay.mesh.rotation.y += 0.01;
  //   feedbackDelay.mesh.rotation.x -= 0.01;

  //   feedbackDelay.boundary
  //     .copy(feedbackDelay.mesh.geometry.boundingBox)
  //     .applyMatrix4(feedbackDelay.mesh.matrixWorld);

  //   if (feedbackDelay.boundary.intersectsBox(hammerBox)) {
  //     if (feedbackDelay.alreadyPlayed === false) {
  //       feedbackDelay.playSound();
  //       feedbackDelay.alreadyPlayed = true;
  //     }
  //   } else {
  //     feedbackDelay.alreadyPlayed = false;
  //   }
  // });

  const instrumentPositions = draggableObjects.map((instrument) => {
    return {
      id: instrument.id,
      position: [
        instrument.position.x,
        instrument.position.y,
        instrument.position.z,
      ],
    };
  });
  renderScene();
  frameId = window.requestAnimationFrame(animate);
};

const handleResize = () => {
  const newAspect = window.innerWidth / window.innerHeight;
  camera.left = (size * newAspect) / -2;
  camera.right = (size * newAspect) / 2;
  camera.top = size / 2;
  camera.bottom = size / -2;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

function onMouseMove(event) {
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  mouseThree.x = raycaster.ray.origin.x;
  mouseThree.y = raycaster.ray.origin.y;
}

function addInstrument() {
  socket.emit('add_instrument', {
    id: nanoid(),
    position: [mouseThree.x, mouseThree.y],
  });
}

function addDrum() {
  const newDrum = new Drums();
  const { mesh } = newDrum;
  //instruments.push(newDrum);
  socket.emit('add_instrument', {
    id: mesh.id,
    position: [mesh.position.x, mesh.position.y, mesh.position.z],
  });
}
function addChord() {
  const newChord = new Chords();
  const { mesh } = newChord;
  instruments.push(newChord);
  newChord.init();
  draggableObjects.push(mesh);
  dragControls = new DragControls(
    [...draggableObjects],
    camera,
    renderer.domElement
  );
  socket.emit('add_instrument', {
    id: mesh.id,
    position: [mesh.position.x, mesh.position.y, mesh.position.z],
  });
}

function addPiano() {
  const newPiano = new Piano();
  pianos.push(newPiano);
  scene.add(newPiano.mesh);
  draggableObjects.push(newPiano.mesh);
  dragControls = new DragControls(
    [...draggableObjects],
    camera,
    renderer.domElement
  );
}
function addMarimba() {
  const newMarimba = new Marimba();
  marimbas.push(newMarimba);
  scene.add(newMarimba.mesh);
  draggableObjects.push(newMarimba.mesh);
  dragControls = new DragControls(
    [...draggableObjects],
    camera,
    renderer.domElement
  );
}
function addHarp() {
  const newHarp = new Harp();
  harps.push(newHarp);
  scene.add(newHarp.mesh);
  draggableObjects.push(newHarp.mesh);
  dragControls = new DragControls(
    [...draggableObjects],
    camera,
    renderer.domElement
  );
}
function addfeedbackDelay() {
  const newfeedbackDelay = new FeedbackDelay();
  feedbackDelays.push(newfeedbackDelay);
  scene.add(newfeedbackDelay.mesh);
  draggableObjects.push(newfeedbackDelay.mesh);

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
    }
  }
}

const start = () => {
  if (!frameId) {
    frameId = requestAnimationFrame(animate);
  }
};
const stop = () => {
  cancelAnimationFrame(frameId);
  frameId = null;
};
//function onDrag() {}

function onDrag(e) {
  const draggingObjectReduxId = e.object.reduxid;
  store.dispatch(
    dragInstrument(draggingObjectReduxId, [
      e.object.position.x,
      e.object.position.y,
    ])
  );
  socket.emit('drag_instrument', {
    id: draggingObjectReduxId,
    position: [e.object.position.x, e.object.position.y],
  });
  renderScene();
}

function onShiftClick() {
  socket.emit('remove_instrument', objectSelect.reduxid);
  store.dispatch(removeInstrument(objectSelect.reduxid));
}

export {
  start,
  stop,
  playSound,
  addInstrument,
  onMouseMove,
  handleResize,
  onShiftClick,
};

export {
  size,
  aspect,
  frameId,
  canvas,
  scene,
  camera,
  renderer,
  light,
  mouse,
  raycaster,
  objectSelect,
  dragControls,
  hammer,
  jamSpace,
  draggableObjects,
  hammerBox,
  instruments,
};

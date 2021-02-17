import * as THREE from 'three'

import Instrument from '../components/Instruments/Instrument'
import {DragControls} from 'three/examples/jsm/controls/DragControls'
import {nanoid} from 'nanoid'
import {
  dragInstrument,
  receiveAllInstruments,
  receiveInstrument,
  removeInstrument,
} from '../reducer/instruments'
import store from '../store'
import socket from '../socket'

import {auth, fetchScene, sceneRef, setScene} from '../Firebase'

let singlePlayerSession
let size, aspect, frameId, canvas
let scene, camera, renderer
let directionalLight, pointLight
let mouse, mouseThree, raycaster, objectSelect, dragControls
let hammer, hammerBox, jamSpace
let draggableObjects
let sliderValue
let instruments = []
draggableObjects = []

let data
async function load() {
  data = await fetchScene().scene
  return data
}
if (auth.currentUser) {
  load()
  window.location.reload()
}

// Initializes the Scene
export const init = (sessionType) => {
  singlePlayerSession = sessionType
  scene = new THREE.Scene()

  if (singlePlayerSession) {
    const instru = store.getState().instruments
 
    instru.forEach((element) => {

      const newInstrument = new Instrument(
        element.id,
        element.position,
        element.soundType,
        element.soundIndex
      )
      newInstrument.init()
      // console.log('scene-->', scene)
    })
  } else {
    socket.emit('get_all_instruments')
    // instruments = store.getState().instruments

  }
  // console.log('store.get st instru', store.getState().instruments)

  size = 1000
  aspect = window.innerWidth / window.innerHeight
  canvas = document.getElementById('canvas')

  camera = new THREE.OrthographicCamera(
    (size * aspect) / -2,
    (size * aspect) / 2,
    size / 2,
    size / -2,
    -1000,
    1000
  )
  camera.position.z = 30
  renderer = new THREE.WebGLRenderer({alpha: true})
  renderer.setSize(window.innerWidth, window.innerHeight)
  canvas.appendChild(renderer.domElement)

  pointLight = new THREE.PointLight(0xff0000, 2, 0)
  pointLight.position.set(1000, 100, 1)
  scene.add(pointLight)
  directionalLight = new THREE.DirectionalLight(0xffffff, 1)
  directionalLight.position.set(1, 1, 1).normalize()
  scene.add(directionalLight)
  scene.fog = new THREE.Fog(0x040306, 10, 300)

  //create Jam Space and the Hammer
  let jamSpaceGeometry = new THREE.TorusGeometry(10, 0.25, 256, 128)
  let jamSpaceMaterial = new THREE.MeshPhongMaterial({
    color: 0x5e5a5d,
    side: THREE.DoubleSide,
  })

  jamSpace = new THREE.LineLoop(jamSpaceGeometry, jamSpaceMaterial)
  jamSpace.scale.set(34, 34, 34)
  jamSpace.position.setY(70)
  scene.add(jamSpace)

  let hammerGeometry = new THREE.BoxGeometry(0.1, 10, 0.1)
  let hammerMaterial = new THREE.MeshBasicMaterial({
    color: 0x5e5a5d,
    side: THREE.DoubleSide,
    wireframe: false,
  })
  hammer = new THREE.Mesh(hammerGeometry, hammerMaterial)
  hammer.position.y = 5
  hammer.geometry.computeBoundingBox()
  hammerBox = new THREE.Box3()
  hammerBox.setFromObject(hammer)
  jamSpace.add(hammer)

  instruments.forEach((instrument) => {
    draggableObjects.push(instrument.mesh)
  })

  dragControls = new DragControls(draggableObjects, camera, renderer.domElement)
  dragControls.addEventListener('drag', onDrag)

  mouse = new THREE.Vector2()
  mouseThree = new THREE.Vector3()
  raycaster = new THREE.Raycaster()

  sliderValue = 0.05
  let slider = document.getElementById('slider')
  slider.addEventListener('change', onInput)
  function onInput() {
 
    sliderValue = Number(slider.value)
  }

  //USER INTERFACE
  const drumIcon = document.getElementById('drumIcon')
  drumIcon.addEventListener('click', function () {
    addInstrument('drums', 'random')
  })
  const addInstrumentIcon = document.getElementById('addInstrumentIcon')
  addInstrumentIcon.addEventListener('click', function (e) {
    addInstrument('tones', 'random')
  })
  const chordIcon = document.getElementById('chordIcon')
  chordIcon.addEventListener('click', function () {
    addInstrument('chords', 'random')
  })
  const pianoIcon = document.getElementById('pianoIcon')
  pianoIcon.addEventListener('click', function () {
    addInstrument('pianos', 'random')
  })
  const marimbaIcon = document.getElementById('marimbaIcon')
  marimbaIcon.addEventListener('click', function () {
    addInstrument('marimbas', 'random')
  })
  const harpIcon = document.getElementById('harpIcon')
  harpIcon.addEventListener('click', function () {
    addInstrument('harps', 'random')
  })
  const feedbackDelayIcon = document.getElementById('feedbackDelayIcon')
  feedbackDelayIcon.addEventListener('click', function () {
    addInstrument('feedbackDelays', 'random')
  })
}

export const renderScene = () => {
  //  raycaster set up
  raycaster.setFromCamera(mouse, camera)
  const intersects = raycaster.intersectObjects(draggableObjects)
  if (intersects.length > 0) {
    if (objectSelect !== intersects[0].object) {
      if (objectSelect)
        objectSelect.material.emissive.setHex(objectSelect.currentHex)

      objectSelect = intersects[0].object
      objectSelect.hover = true
      objectSelect.currentHex = objectSelect.material.emissive.getHex()
      objectSelect.material.emissive.setHex(0xff0000)
    }
  } else {
    if (objectSelect)
      objectSelect.material.emissive.setHex(objectSelect.currentHex)

    objectSelect = null
  }

  renderer.render(scene, camera)
}

export const animate = () => {
  jamSpace.rotation.z += 0.01
  hammerBox.copy(hammer.geometry.boundingBox).applyMatrix4(hammer.matrixWorld)
  hammerBox.setFromObject(hammer)

  jamSpace.rotation.z += sliderValue
  jamSpace.rotation.y += sliderValue
  if (instruments) {
    instruments.forEach((instrument) => {
      instrument.mesh.rotation.y += 0.01
      instrument.mesh.rotation.x -= 0.01
      instrument.boundary
        .copy(instrument.mesh.geometry.boundingBox)
        .applyMatrix4(instrument.mesh.matrixWorld)
      if (instrument.boundary.intersectsBox(hammerBox)) {
        if (instrument.alreadyPlayed === false) {
          instrument.playSound()
          instrument.alreadyPlayed = true
        }
      } else {
        instrument.alreadyPlayed = false
      }
    })
  }

  const instrumentPositions = draggableObjects.map((instrument) => {
    return {
      id: instrument.id,
      position: [
        instrument.position.x,
        instrument.position.y,
        instrument.position.z,
      ],
    }
  })
  renderScene()
  frameId = window.requestAnimationFrame(animate)
}

const handleResize = () => {
  const newAspect = window.innerWidth / window.innerHeight
  camera.left = (size * newAspect) / -2
  camera.right = (size * newAspect) / 2
  camera.top = size / 2
  camera.bottom = size / -2
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

function onMouseMove(event) {
  event.preventDefault()
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

  mouseThree.x = raycaster.ray.origin.x
  mouseThree.y = raycaster.ray.origin.y
}

function addInstrument(soundType = 'tone', random) {
  let newInstrument
  if (random) {
    newInstrument = new Instrument(nanoid(), undefined, soundType)
  } else {
    newInstrument = new Instrument(
      nanoid(),
      [mouseThree.x, mouseThree.y],
      soundType
    )
  }
  if (singlePlayerSession) {
    store.dispatch(
      receiveInstrument({
        id: newInstrument.mesh.reduxid,
        position: [
          newInstrument.mesh.position.x,
          newInstrument.mesh.position.y,
        ],
        soundType,
        soundIndex: newInstrument.soundIndex,
      })
    )
    // instruments.push(newInstrument)
    newInstrument.init()
  } else {
    socket.emit('add_instrument', {
      id: newInstrument.mesh.reduxid,
      position: [newInstrument.mesh.position.x, newInstrument.mesh.position.y],
      soundType,
      soundIndex: newInstrument.soundIndex,
    })
  }
}

function playSound() {
  if (objectSelect) {
    if (objectSelect.hover) {

      objectSelect.playSound()
    }
  }
}

const start = () => {
  if (!frameId) {
    frameId = requestAnimationFrame(animate)
  }
}
const stop = () => {
  cancelAnimationFrame(frameId)
  frameId = null
}

function onDrag(e) {
  const draggingObjectReduxId = e.object.reduxid
  if (singlePlayerSession) {
    store.dispatch(
      dragInstrument(
        draggingObjectReduxId,
        [e.object.position.x, e.object.position.y],
        e.object.soundType,
        e.object.soundIndex
      )
    )
    instruments.forEach((sceneInstrument) => {
      if (sceneInstrument.mesh.reduxid === draggingObjectReduxId) {
        sceneInstrument.updatePosition(e.object.position.x, e.object.position.y)
      }
    })
  } else {
    store.dispatch(
      dragInstrument(
        draggingObjectReduxId,
        [e.object.position.x, e.object.position.y],
        e.object.soundType,
        e.object.soundIndex
      )
    )
    socket.emit('drag_instrument', {
      id: draggingObjectReduxId,
      position: [e.object.position.x, e.object.position.y],
      soundType: e.object.soundType,
      soundIndex: e.object.soundIndex,
    })
  }

  renderScene()
}

function onShiftClick() {
  if (singlePlayerSession) {
    socket.emit('remove_instrument')

    store.dispatch(removeInstrument(objectSelect.reduxid))
    instruments.forEach((sceneInstrument) => {
      if (sceneInstrument.mesh.reduxid === objectSelect.reduxid) {
        sceneInstrument.smash(objectSelect.reduxid)
      }
    })
  } else {
    socket.emit('remove_instrument', objectSelect.reduxid)
    store.dispatch(removeInstrument(objectSelect.reduxid))
  }
}

export {
  start,
  stop,
  playSound,
  addInstrument,
  onMouseMove,
  handleResize,
  onShiftClick,
}

export {
  size,
  aspect,
  frameId,
  canvas,
  scene,
  camera,
  renderer,
  directionalLight,
  pointLight,
  mouse,
  raycaster,
  objectSelect,
  dragControls,
  hammer,
  jamSpace,
  draggableObjects,
  hammerBox,
  instruments,
}

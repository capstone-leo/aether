import React, {useEffect, useState, useRef} from 'react'

import {
  scene,
  init,
  animate,
  start,
  stop,
  dragControls,
  addInstrument,
  playSound,
  handleResize,
  onMouseMove,
  onShiftClick,
} from '../engine/main'
import {Slider} from './Slider'
import {Instructions} from './Instructions'
import Keyboard from './Instruments/Keyboard'
import Modal from 'react-modal'
import './css/App.css'
import Chat from './Chat'
import socket from '../socket'
import {connect} from 'react-redux'

// import play_pause from '../../public/assets/play-pause.png';
import {motion} from 'framer-motion'
import store from '../store'

import 'firebase/firestore'
import 'firebase/auth'
import {auth, db, sceneRef, fetchScene, setScene} from '../Firebase'
import {Link, Redirect} from 'react-router-dom'
import TonePalette from './TonePalette'

const App = (props) => {
  const [redirectTo, setRedirectTo] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [enableOutline, setEnableOutline] = useState(false)
  const mount = useRef(null)
  const [isAnimating, setAnimating] = useState(true)
  const controls = useRef(null)
  const hover = useRef(null)

  const handleKeydown = (e) => {
    const isTabEvent = e.keyCode === 9
    if (isTabEvent) {
      setEnableOutline(true)
    }
  }
  const toggleModal = () => {
    setModalOpen(!modalOpen)
  }

  useEffect(() => {
    props.singleSession ? init(true) : init(false)
    animate()
    controls.current = {start, stop}
    window.addEventListener(
      'click',
      (e) => {
        if (e.shiftKey) {
          onShiftClick(e)
        }
      },
      false
    )

    window.addEventListener('keydown', handleKeydown)
    window.addEventListener('dblclick', () => addInstrument(), false)
    window.addEventListener('click', playSound, false)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('resize', handleResize)

    controls.current = {start, stop}

    //Trash Clean up
    return () => {
      stop()
      window.removeEventListener('dblclick', () => addInstrument(), false)
      window.removeEventListener('click', playSound, false)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', handleResize)
      for (let i = 0; i < scene.length; i++) {
        scene.remove(i)
      }
    }
  }, [])

  //Listens for Start and Stop
  useEffect(() => {
    if (isAnimating) {
      controls.current.start()
    } else {
      controls.current.stop()
    }
  }, [isAnimating])

  const LoadConfig = () => {
    return fetchScene()
  }

  const SaveConfig = () => {
    setAnimating(false)
    auth.currentUser ? setRedirectTo('studio') : setRedirectTo('')
    return setScene()
  }

  if (redirectTo) {
    return <Redirect to={redirectTo} />
  }
  return (
    <div
      className="App"
      id="canvas"
      ref={mount}
      style={{background: 'transparent'}}
    >
      <button
        className={
          enableOutline ? 'startstop' : 'no-outline-on-focus startstop'
        }
        onClick={() => setAnimating(!isAnimating)}
      >
        play / pause
      </button>
      {props.singleSession ? (
        <button
          className={
            enableOutline ? 'startstop2' : 'no-outline-on-focus startstop2'
          }
          onClick={() => {
            SaveConfig()
          }}
        >
          save configuration
        </button>
      ) : (
        <Link to="/">
          <button className="startstop2">exit to home</button>
        </Link>
      )}

      <Slider id="slider" modalOpen={modalOpen} />
      <Instructions toggleModal={toggleModal} enableOutline={enableOutline} />
      <Modal
        id="Modal"
        className={enableOutline ? 'Modal' : 'no-outline-on-focus Modal'}
        appElement={mount.current}
        isOpen={modalOpen}
      >
        <div className="modalTextDiv">
          <b> - How to Jam - </b>
          <br />
          <br />
          <br />
          GLOBAL actions
          <br />
          <br />
          double click: spawn a random soundshape
          <br />
          <br />
          hold down Shift + click: remove an instrument
          <br />
          <br />
          <i>
            drag and drop soundshapes into the AETHER to collaborate with others
          </i>
          <br />
          <br />
          chat to your friends
          <br />
          <br />
          <br />
          LOCAL actions
          <br />
          <br />
          single click: preview a sound
          <br />
          <br />
          play the full keyboard
          <br />
          <br />
          click to change the tempo
          <br />
          <br />
          log in, save your music session privately, and come back to jam later!
        </div>
        <button className="closer" onClick={() => setModalOpen(!modalOpen)}>
          close
        </button>
      </Modal>
      <Chat id="chatbox" enableOutline={enableOutline} />
      <TonePalette />
      <Keyboard modalOpen={modalOpen} />
    </div>
  )
}

export default App

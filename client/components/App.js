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
import {Redirect} from 'react-router-dom'
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
      // onClick={() => setAnimating(!isAnimating)}
    >
      <button
        className={
          enableOutline ? 'startstop' : 'no-outline-on-focus startstop'
        }
        onClick={() => setAnimating(!isAnimating)}
      >
        {/* <img

					src={play_pause}
					alt='play-pause'
          
				/> */}
        play / pause
      </button>
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
      {/* <button
        className="startstop2"
        onClick={() => {
          LoadConfig()
        }}
      >
        console your configuration
      </button> */}

      <Slider id="slider" />
      <Instructions toggleModal={toggleModal} enableOutline={enableOutline} />
      <Modal
        id="Modal"
        className={enableOutline ? 'Modal' : 'no-outline-on-focus Modal'}
        appElement={mount.current}
        isOpen={modalOpen}
      >
        <div className="modalTextDiv">
          - How to Jam -
          <br />
          <br />
          double click: spawn a random instrument
          <br />
          <br />
          single click: preview a sound for yourself
          <br />
          <br />
          hold down Shift + left-click: remove an instrument
          <br />
          <br />
          drag and drop soundshapes into the jamspace to collaborate with others
          <br />
          <br />
          play the full keyboard
          <br />
          <br />
          log in, save your music, and come back to jam later!
        </div>
        <button className="closer" onClick={() => setModalOpen(!modalOpen)}>
          close
        </button>
      </Modal>
      <Chat id="chatbox" />
      <TonePalette />
      <Keyboard modalOpen={modalOpen} />
    </div>
  )
}

export default App

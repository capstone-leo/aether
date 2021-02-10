import React, { useEffect, useState, useRef } from 'react';

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
} from '../engine/main';

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
    init();
    animate();

    // start();
    controls.current = { start, stop };
    window.addEventListener('dblclick', addInstrument, false);
    window.addEventListener(
      'click',
      (e) => {
        if (e.shiftKey) {
          onShiftClick(e);
        } else {
          playSound();
        }
      },
      false
    );
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', handleResize);
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

  //Listens for Start and Stop
  useEffect(() => {
    if (isAnimating) {
      controls.current.start();
    } else {
      controls.current.stop();
    }
  }, [isAnimating]);

  // const endSession = () => {
  //   setAnimating(false);
  //   auth.currentUser ? setRedirectTo('studio') : setRedirectTo('');
  // };

  // if (redirectTo) {
  //   return <Redirect to={redirectTo} />;
  // }
  return (
    <div
      className="App"
      id="canvas"
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

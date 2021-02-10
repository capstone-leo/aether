import React, { Component, useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import socket from '../socket';

import Loading from './Loading';
import SignIn from './SignIn';
import SignOut from './SignOut';
import BackgroundParticles from './Particles.js';
import InstructionsToggle from './Instructions';

import firebase from 'firebase/app';
import 'firebase/firestore';
import { firebaseApp, auth, db } from '../Firebase';

import { connect } from 'react-redux';
import { setNewUser, signOutUser } from '../reducer/user';

// Main Component
const Home = (props) => {
  // React Hooks
  const [user, loading, error] = useAuthState(auth); //user JSON
  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    console.log('user-->', user);
    console.log('props-->', props);
    if (user) props.setNewUser(user);
  }, [user]);
  const [enableOutline, setEnableOutline] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [redirectTo, setRedirectTo] = useState('');

  // Accessibility Handler
  const handleKeydown = (e) => {
    const isTabEvent = e.keyCode === 9;
    if (isTabEvent) {
      setEnableOutline(true);
    }
  };

  // Instructions Toggle
  const showDirections = (event) => {
    event.preventDefault();
    setShowInstructions(!showInstructions);
  };

  // Background Animation,
  // Conditional Auth render
  return (
    <>
      <div style={{ textAlign: 'center', marginTop: '15%', fontSize: '60px' }}>
        <BackgroundParticles />
        <header style={{ textShadow: '2px 6px 6 rgba(218, 217, 217, 0.346)' }}>
          a e t h e r
        </header>
        <br />

        {loading ? (
          <Loading />
        ) : auth.currentUser !== null ? (
          <>
            <Link to="/sesh">
              <button
                className={
                  enableOutline ? 'home-btn' : 'no-outline-on-focus home-btn'
                }
                type="button"
                style={{ textAlign: 'center', marginTop: '1%' }}
              >
                Start Jamming {'>'}
              </button>
            </Link>
            <br />
            <Link to="/studio">
              <button
                className={
                  enableOutline ? 'home-btn' : 'no-outline-on-focus home-btn'
                }
                type="button"
                style={{ textAlign: 'center', marginTop: '1%' }}
              >
                Account Page {'>'}
              </button>
            </Link>

            <br />
            <SignOut user={user} enableOutline={enableOutline} />
            <br />
            <InstructionsToggle
              enableOutline={enableOutline}
              showInstructions={showInstructions}
              showDirections={showDirections}
            />
          </>
        ) : (
          <>
            <Link to="/sesh">
              <button
                className={
                  enableOutline ? 'home-btn' : 'no-outline-on-focus home-btn'
                }
                type="button"
                style={{ textAlign: 'center', marginTop: '1%' }}
              >
                Start Jamming {'>'}
              </button>
            </Link>
            <br />
            <SignIn enableOutline={enableOutline} />
            <br />
            <InstructionsToggle
              enableOutline={enableOutline}
              showInstructions={showInstructions}
              showDirections={showDirections}
            />
          </>
        )}
        <br />
      </div>
    </>
  );
};

// Connect Redux
const mapStateToProps = (state) => ({ user: state.user });
const mapDispatchToProps = (dispatch) => ({
  setNewUser: (user) => dispatch(setNewUser(user)),
  signOutUser: (user) => dispatch(signOutUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

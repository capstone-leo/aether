<<<<<<< HEAD
import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import Particles from "react-particles-js";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyCL4dmyWs2djZQWA7SkJQM06ket2Z0VzJw",
  authDomain: "music-visual-jam-sesh.firebaseapp.com",
  databaseURL: "https://music-visual-jam-sesh-default-rtdb.firebaseio.com",
  projectId: "music-visual-jam-sesh",
  storageBucket: "music-visual-jam-sesh.appspot.com",
  messagingSenderId: "56740385434",
  appId: "1:56740385434:web:1f60538266d67451dc4523",
  measurementId: "G-QGC5XHSDST",
});
=======
import React, { Component, useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Particles from 'react-particles-js';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

// Initialize Firebase
firebase.initializeApp({});
>>>>>>> 2d81759fe8733c646048b611b4462e7e888100c7
// Initialize auth and firestore
export const auth = firebase.auth();
export const db = firebase.firestore();

// Main Component
const Home = () => {
	const [user] = useAuthState(auth); //user JSON
	useEffect(() => {
		window.addEventListener('keydown', handleKeydown);
		console.log('user-->', user);
	});
	// React Hooks
	const [enableOutline, setEnableOutline] = useState(false);
	const [showInstructions, setShowInstructions] = useState(false);
	const [redirectTo, setRedirectTo] = useState('');

	//Accessibility Handler
	const handleKeydown = (e) => {
		const isTabEvent = e.keyCode === 9;
		if (isTabEvent) {
			setEnableOutline(true);
		}
	};

<<<<<<< HEAD
    setShowInstructions(!showInstructions);
  };
  return (
    <>
      <div style={{ textAlign: "center", marginTop: "15%", fontSize: "60px" }}>
        <header id="mainHeader">a e t h e r</header>
        <p style={{ fontSize: "15px" }}>(working title)</p>
        <SignIn />
        <SignOut />
        <br />
        <Link to="/sesh">
          <button
            type="button"
            style={{ textAlign: "center", marginTop: "1%" }}
          >
            Start Jamming {">"}
          </button>
        </Link>
        <br />
        <button
          type="button"
          onClick={showDirections}
          style={{ textAlign: "center", marginTop: "1%", fontSize: "15px" }}
        >
          view instructions
        </button>

        {showInstructions ? (
          <ol style={{ textAlign: "center", fontSize: "15px" }}>
            <li>“One band. One Sound.”</li>
            <li>"If you ain't first, you're last" </li>
            <li>"You shall not pass!"</li>
            <li>"I am McLovin"</li>
            <li>
              "Life is like a box of chocolates, you never know what you're
              gonna get"
            </li>
          </ol>
        ) : null}
        <br />

        <Particles
          params={{
            particles: {
              line_linked: {
                shadow: {
                  enable: true,
                  color: "#3CA9D1",
                  blur: 5,
                },
              },
            },
          }}
          style={{
            width: "100%",
          }}
        />
      </div>
    </>
  );
=======
	//Instructions Toggle
	const showDirections = (event) => {
		event.preventDefault();

		setShowInstructions(!showInstructions);
	};

	// JSX
	return (
		<>
			<div style={{ textAlign: 'center', marginTop: '15%', fontSize: '60px' }}>
				<Particles
					id='particles-js'
					params={{
						particles: {
							line_linked: {
								shadow: {
									enable: true,
									color: `${randomColor}`,
									blur: 2
								}
							},
							interactivity: {
								detect_on: 'canvas',
								events: {
									onhover: {
										enable: true,
										mode: 'grab'
									},
									resize: true
								},
								modes: {
									grab: {
										distance: 400,
										line_linked: {
											opacity: 1
										}
									}
								}
							},
							move: {
								enable: true,
								speed: 0.6,
								direction: 'bottom-left',
								random: false,
								straight: false,
								out_mode: 'bounce',
								bounce: false,
								attract: {
									enable: false,
									rotateX: 600,
									rotateY: 1200
								}
							},
							retina_detect: true
						}
					}}
				/>
				<header style={{ textShadow: '0px 2px 6 rgba(218, 217, 217, 0.346)' }}>
					a e t h e r
				</header>
				<br />
				<Link to='/sesh'>
					<button
						className={enableOutline ? 'home-btn' : 'no-outline-on-focus home-btn'}
						type='button'
						style={{ textAlign: 'center', marginTop: '1%' }}
					>
						Start Jamming {'>'}
					</button>
				</Link>
				<br />

				{user ? (
					<SignOut
						user={user}
						enableOutline={enableOutline}
						setShowInstructions={setShowInstructions}
						showInstructions={showInstructions}
					/>
				) : (
					<SignIn
						user={user}
						enableOutline={enableOutline}
						setShowInstructions={setShowInstructions}
						showInstructions={showInstructions}
					/>
				)}

				<br />

				{showInstructions ? (
					<div
						style={{
							textAlign: 'center',
							fontSize: '15px',
							fontFamily: 'Source Code Pro, monospace'
						}}
					>
						<button
							type='button'
							className={enableOutline ? 'home-btn' : 'no-outline-on-focus home-btn'}
							onClick={showDirections}
							style={{ textAlign: 'center', marginTop: '1%', fontSize: '12px' }}
						>
							close instructions
						</button>
						<h4>“One band. One Sound.”</h4>
						<p>
							You have the unique opportunity to collaborate in realtime with other
							musicians
						</p>
						<p>Click a sound object Once to hear its sound.</p>
						<p>Click and Drag a sound object onto the Jam-Space</p>
						<p>When the Hammer strikes it, hear the sounds!</p>
						<p>
							Exlore the music you can create with your friends or match with users from
							around the world.
						</p>
					</div>
				) : (
					<button
						type='button'
						className={enableOutline ? 'home-btn' : 'no-outline-on-focus home-btn'}
						onClick={showDirections}
						style={{ textAlign: 'center', marginTop: '1%', fontSize: '12px' }}
					>
						view instructions
					</button>
				)}
				<br />
			</div>
		</>
	);
>>>>>>> 2d81759fe8733c646048b611b4462e7e888100c7
};

// Helper Components
function SignIn(props) {
	let user;
	const signInWithGoogle = () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		//instatiate new auth token
		auth.signInWithRedirect(provider);
		// 	.then((result) => {
		// 	user = result.user;
		// });
		//prompts separate window to google login
	};
	console.log('props-->', props);
	console.log('user-->', props.user);

	return user ? (
		<Redirect to='/studio' />
	) : (
		<button
			className={props.enableOutline ? 'home-btn' : 'no-outline-on-focus home-btn'}
			onClick={signInWithGoogle}
		>
			Sign In with Google
		</button>
	);
	// button to prompt Google login
}
function SignOut(props) {
	return auth.currentUser ? (
		<button
			className={props.enableOutline ? 'home-btn' : 'no-outline-on-focus home-btn'}
			onClick={() => auth.signOut()}
		>
			Sign Out
		</button>
	) : null;
}

// Helper Function
const randomColor = Math.floor(Math.random() * 16777215).toString(16);
export default Home;

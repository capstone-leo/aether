import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Particles from 'react-particles-js';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Initialize Firebase
firebase.initializeApp({
	apiKey: 'AIzaSyAWVIxjZTaEY90wBDSxj1v7ECUUKyG7Vb0',
	authDomain: 'sound-collabo.firebaseapp.com',
	projectId: 'sound-collabo',
	storageBucket: 'sound-collabo.appspot.com',
	messagingSenderId: '564645648142',
	appId: '1:564645648142:web:f0b8c196f95fd2b70c295f',
	measurementId: 'G-V44HEGZ64L'
});
// Initialize auth and firestore
export const auth = firebase.auth();
export const db = firebase.firestore();

// Main Component
const Home = () => {
	useEffect(() => {
		window.addEventListener('keydown', handleKeydown);
		// console.log(params);
	});

	const [enableOutline, setenableOutline] = useState(false);

	const [showInstructions, setShowInstructions] = useState(false);

	//Accessibility Handler
	const handleKeydown = (e) => {
		const isTabEvent = e.keyCode === 9;
		if (isTabEvent) {
			setenableOutline(true);
		}
	};

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
				<SignIn enableOutline={enableOutline} />
				<SignOut enableOutline={enableOutline} />
				<br />
				<button
					type='button'
					className={enableOutline ? 'home-btn' : 'no-outline-on-focus home-btn'}
					onClick={showDirections}
					style={{ textAlign: 'center', marginTop: '1%', fontSize: '12px' }}
				>
					view instructions
				</button>
				{showInstructions ? (
					<ol style={{ textAlign: 'center', fontSize: '15px' }}>
						<li>“One band. One Sound.”</li>
						<li>"If you ain't first, you're last" </li>
						<li>"You shall not pass!"</li>
						<li>"I am McLovin"</li>
						<li>
							"Life is like a box of chocolates, you never know what you're gonna get"
						</li>
					</ol>
				) : null}
				<br />
			</div>
		</>
	);
};

// Helper Components
function SignIn(props) {
	const signInWithGoogle = () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		//instatiate new auth token
		auth.signInWithPopup(provider);
		//prompts separate window to google login
	};

	return (
		<button
			className={props.enableOutline ? 'home-btn' : 'no-outline-on-focus home-btn'}
			onClick={signInWithGoogle}
		>
			Sign in with Google
		</button>
	); // button to prompt Google login
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

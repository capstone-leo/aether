import React, { Component, useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Particles from 'react-particles-js';
import { useAuthState } from 'react-firebase-hooks/auth';

import Loading from './Loading';
import SignIn from './SignIn';
import SignOut from './SignOut';

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
	});
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
									blur: 1.5
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
				<header style={{ textShadow: '2px 6px 6 rgba(218, 217, 217, 0.346)' }}>
					a e t h e r
				</header>
				<br />

				{loading ? (
					<Loading />
				) : props.user.displayName ? (
					<>
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
						<Link to='/studio'>
							<button
								className={enableOutline ? 'home-btn' : 'no-outline-on-focus home-btn'}
								type='button'
								style={{ textAlign: 'center', marginTop: '1%' }}
							>
								Account Page {'>'}
							</button>
						</Link>

						<br />
						<SignOut user={user} enableOutline={enableOutline} />
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
									className={
										enableOutline ? 'home-btn' : 'no-outline-on-focus home-btn'
									}
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
									Exlore the music you can create with your friends or match with users
									from around the world.
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
					</>
				) : (
					<>
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
									className={
										enableOutline ? 'home-btn' : 'no-outline-on-focus home-btn'
									}
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
									Exlore the music you can create with your friends or match with users
									from around the world.
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
					</>
				)}
				<br />
			</div>
		</>
	);
};


// Helper Function
const randomColor = Math.floor(Math.random() * 16777215).toString(16);

// Connect Redux
const mapStateToProps = (state) => ({ user: state.user });
const mapDispatchToProps = (dispatch) => ({
	setNewUser: (user) => dispatch(setNewUser(user)),
	signOutUser: (user) => dispatch(signOutUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

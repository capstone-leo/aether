import React, { Component, useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from './Home';

const UserAccountPage = (props) => {
	const [user] = useAuthState(auth); //user JSON
	const report = () => {
		console.log('user-->', auth.currentUser);
	};
	// const accountSignOut = () => {};

	// if (user) return <Redirect to='/' />;
	return (
		<div>
			{/* {!auth.currentUser ? (
				<Redirect to='/' />
			) : ( */}
			<>
				<button onClick={() => report()}>Report</button>
				<Link to='/sesh'>
					<button
						className={
							props.enableOutline ? 'home-btn' : 'no-outline-on-focus home-btn'
						}
						type='button'
						style={{ textAlign: 'center', marginTop: '1%' }}
					>
						Start Jamming
					</button>
				</Link>
				<button
					className={props.enableOutline ? 'home-btn' : 'no-outline-on-focus home-btn'}
					onClick={() => auth.signOut()}
				>
					Sign Out
				</button>
			</>
			{/* )} */}
		</div>
	);
};

export default UserAccountPage;

import React, { Component, useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from './Home';

const UserAccountPage = () => {
	const [user] = useAuthState(auth); //user JSON
	const report = () => {
		console.log('user-->', user);
	};
	return (
		<div>
			<button onClick={() => report()}></button>
			<Link to='/sesh'>
				<button>Start Jamming</button>
			</Link>
		</div>
	);
};

export default UserAccountPage;

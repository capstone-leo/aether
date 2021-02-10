import React, { Component, useState, useEffect, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { setNewUser } from '../reducer/user';
import { connect } from 'react-redux';

import { auth, db } from '../Firebase';
import Loading from './Loading';
import SignOut from './SignOut';
import BackgroundParticles from './Particles';

//Component
const UserAccountPage = (props) => {
	const [user, loading, error] = useAuthState(auth); //user JSON
	const [currentUser, setcurrentUser] = useState(auth.currentUser);
	useEffect(() => {
		console.log('account props.user-->', props.user);
		console.log('account current-->', auth.currentUser);
		if (auth.currentUser) props.setNewUser(user);
	}, [currentUser]);

	if (!auth.currentUser) return <Redirect to='/' />;
	return (
		<>
			{loading ? (
				<div style={{ textAlign: 'center', marginTop: '15%', fontSize: '60px' }}>
					<BackgroundParticles />
					<h6>Welcome!</h6>
					<Loading />
				</div>
			) : (
				<div style={{ textAlign: 'center', marginTop: '15%', fontSize: '60px' }}>
					<BackgroundParticles />

					<h6>Welcome, {auth.currentUser.displayName}!</h6>

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
					<br />
					<SignOut setcurrentUser={setcurrentUser} />
				</div>
			)}
		</>
	);
};

// Connect Redux
const mapStateToProps = (state) => ({ user: state.user });
const mapDispatchToProps = (dispatch) => ({
	setNewUser: (user) => dispatch(setNewUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserAccountPage);

import React, { Component, useState, useEffect, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { setNewUser } from '../reducer/user';
import { connect } from 'react-redux';

import { auth, db } from '../Firebase';
import Loading from './Loading';
import SignOut from './SignOut';

//Component
const UserAccountPage = (props) => {
	const [user, loading, error] = useAuthState(auth); //user JSON
	const [currentUser, setcurrentUser] = useState(props.user);
	useEffect(() => {
		console.log('account user-->', user);
		console.log('account props-->', props.user);
		console.log('account current-->', currentUser);
		if (user) props.setNewUser(user);
	});
	return (
		<>
			{user === null ? (
				<Redirect to='/' />
			) : loading ? (
				<div style={{ textAlign: 'center', marginTop: '15%', fontSize: '60px' }}>
					<h6>Welcome!</h6>
					<Loading />
				</div>
			) : (
				<div style={{ textAlign: 'center', marginTop: '15%', fontSize: '60px' }}>
					<h6>Welcome, {currentUser.displayName}!</h6>

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
					<SignOut onClick={() => setcurrentUser()} />
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

import React from 'react';
import { signOutUser } from '../reducer/user';
import { connect } from 'react-redux';
import { firebaseApp, auth, db } from '../Firebase';

const SignOut = (props) => {
	const signOut = () => {
		auth.signOut();
		props.signOutUser(props.user);
		props.setcurrentUser();
	};

	return props.user ? (
		<button
			className={props.enableOutline ? 'home-btn' : 'no-outline-on-focus home-btn'}
			onClick={() => signOut()}
		>
			Sign Out
		</button>
	) : null;
};

// Connect Redux
const mapStateToProps = (state) => ({ user: state.user });
const mapDispatchToProps = (dispatch) => ({
	signOutUser: (user) => dispatch(signOutUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignOut);

import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// import { AnimatePresence } from 'framer-motion';

import App from './App';
import Home from './Home';
import UserAccountPage from './UserAccountPage';

export default class Routes extends Component {
	render() {
		return (
			// <AnimatePresence>
			<Router>
				<Route exact path='/' component={Home} />
				<Route path='/sesh' component={App} />
				<Route path='/studio' component={UserAccountPage} />
			</Router>
			// </AnimatePresence>
		);
	}
}

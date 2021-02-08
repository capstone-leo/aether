import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import App from './App';
import Home from './Home';
import UserAccountPage from './UserAccountPage';

class Routes extends Component {
	render() {
		return (
			<Router>
				<Route exact path='/' component={Home} />
				<Route path='/sesh' component={App} />
				<Route path='/studio' component={UserAccountPage} />
			</Router>
		);
	}
}

export default Routes;

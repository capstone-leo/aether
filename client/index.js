import React from 'react';
import './components/css/index.css';

import ReactDOM from 'react-dom';
import Routes from './Components/Routes';

import { Provider } from 'react-redux';
import store from './store';

import './socket';

ReactDOM.render(
	<Provider store={store}>
		<Routes />
	</Provider>,
	document.getElementById('app')
);

import React from 'react';
import './components/css/index.css';

import ReactDOM from 'react-dom';
import Routes from './Components/Routes';

import './socket';

ReactDOM.render(<Routes />, document.getElementById('app'));

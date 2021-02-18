import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const middleware = composeWithDevTools(applyMiddleware(thunk));

const store = createStore(reducer, middleware);
window.store = store;

export default store;

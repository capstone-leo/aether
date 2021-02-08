import { combineReducers } from 'redux';
import messages from './messages';
import dragndrop from './dragndrop';
import user from './user';
export default combineReducers({ messages, user, dragndrop });

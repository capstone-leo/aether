import { combineReducers } from 'redux';
import messages from './messages';
import dragndrop from './dragndrop';
import scene from './scene'
import user from './user';
export default combineReducers({ messages, user, dragndrop, scene });

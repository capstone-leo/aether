import { combineReducers } from 'redux';
import messages from './messages';
import dragndrop from './dragndrop';
import user from './user';
import instruments from './instruments';
export default combineReducers({ messages, user, dragndrop, instruments });

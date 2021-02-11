const initialState = [];

// Action Type
const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';
const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';

// Action Creators
 const receiveMessages = (messages) => ({
	type: RECEIVE_MESSAGES,
	messages
});

const receiveMessage = (message) => ({
		type: RECEIVE_MESSAGE,
		message
});

// Reducer
const messageReducer = (state = initialState, action) => {
	switch (action.type) {
		case RECEIVE_MESSAGES:
			return action.messages;
		case RECEIVE_MESSAGE:
			return [...state, action.message];
		default:
			return state;
	}
};

module.exports = {messageReducer, receiveMessage, receiveMessages}
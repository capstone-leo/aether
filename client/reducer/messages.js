const initialState = [];

// Action Type
const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';
const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
const REMOVE_MESSAGE = 'REMOVE_MESSAGE';

// Action Creators
export const receiveMessages = (messages) => ({
	type: RECEIVE_MESSAGES,
	messages
});

export const receiveMessage = (message) => ({
		type: RECEIVE_MESSAGE,
		message
});

export const removeMessage = (message) => ({
	type: REMOVE_MESSAGE,
	message
})

// Reducer
export default (state = initialState, action) => {
	switch (action.type) {
		case RECEIVE_MESSAGES:
			return action.messages;
		case RECEIVE_MESSAGE:
			return [...state, action.message];
		default:
			return state;
	}
};

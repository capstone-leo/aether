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

export const removeMessage = (id) => ({
	type: REMOVE_MESSAGE,
	id,
})

// Reducer
export default (state = initialState, action) => {
	switch (action.type) {
		case RECEIVE_MESSAGES:
			return action.messages;
		case RECEIVE_MESSAGE:
			return [...state, action.message];
		case REMOVE_MESSAGE:
			return state.filter((message) => message.id !== action.id[0].id);
		default:
			return state;
	}
};

const initialState = [];

// Action Type
const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';
const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
const REMOVE_MESSAGE = 'REMOVE_MESSAGE'
// Action Creators
 const receiveMessages = (messages) => ({
	type: RECEIVE_MESSAGES,
	messages
});

const receiveMessage = (message) => ({
		type: RECEIVE_MESSAGE,
		message
});

const deleteMessage = (id) => ({
    type: REMOVE_MESSAGE,
    id
})

// Reducer
const messageReducer = (state = initialState, action) => {
	switch (action.type) {
		case RECEIVE_MESSAGES:
			return action.messages;
		case RECEIVE_MESSAGE:
			return [...state, action.message];
        case REMOVE_MESSAGE:
            return state.filter((message)=>message.id !== action.id)
		default:
			return state;
	}
};

module.exports = {messageReducer, receiveMessage, receiveMessages, deleteMessage}
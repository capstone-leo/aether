let newState;
const { Event } = require('../db')

const initialState = {}

const RECEIVE_PLAYERS = 'RECEIVE_PLAYERS';
const RECEIVE_PLAYER = 'RECEIVE_PLAYER';
const ASSIGN_ROOM = 'ASSIGN_ROOM';
const REMOVE_PLAYER = 'REMOVE_PLAYER'

const receivePlayers = players => ({
    type: RECEIVE_PLAYERS,
    players
});

const receivePlayer = (id, data) => ({
    type: RECEIVE_PLAYER,
    id,
    data
})

const assignRoom = (id, room) => ({
    type: ASSIGN_ROOM,
    id,
    room
})

const removePlayer = (id) => {
    type: REMOVE_PLAYER,
    id
}

const addPlayer = (id, player) => dispatch => {
    dispatch(receivePlayer(id, player));
    Event.joinRoom(player)
    Score.add(player)
};

const playerLeaves = player => dispatch => {
    dispatch(removePlayer(player.socketId));
    Event.leaveRoom(player);
}

const immutable = (state = initialState, action) => {
    switch (action.type) {
      case RECEIVE_PLAYERS:
        return action.players;
      case RECEIVE_PLAYER:
        newState = Object.assign({}, state);
        newState[action.id] = action.data;
        return newState;
      case ASSIGN_ROOM:
        newState = Object.assign({}, state);
        newState[action.id] = Object.assign({}, state[action.id], { room: action.room });
        return newState;
      case REMOVE_PLAYER:
        newState = Object.assign({}, state);
        delete newState[action.id];
        return newState;
      default:
        return state;
    }
  };
  
  
  const mutable = (state = initialState, action) => {
    switch (action.type) {
      case RECEIVE_PLAYERS:
        return action.players;
      case RECEIVE_PLAYER:
        state[action.id] = action.data;
        return state;
      case ASSIGN_ROOM:
        state[action.id].room = action.room;
        return state;
      case REMOVE_PLAYER:
        delete state[action.id];
        return state;
      default:
        return state;
    }
  };
  
  const chooseReducer = reducerMode => {
    switch (reducerMode) {
      case 'mutable': return mutable;
      case 'immutable': return immutable;
      default: return mutable;
    }
  };
  
const reducer = chooseReducer('immutable');
  
  module.exports = {
      reducer,
    receivePlayers,
    receivePlayer,
    assignRoom,
    removePlayer,
    addPlayer,
    playerLeaves,
   };
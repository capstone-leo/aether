let newState, idx;
const { findIndex }  = require('lodash');
const Room = require('../db/models/room');

/*----------  INITIAL STATE  ----------*/
const initialState = [];


/*----------  ACTION TYPES  ----------*/
const ADD_ROOM = 'ADD_ROOM';
const REMOVE_ROOM = 'REMOVE_ROOM';

/*----------  ACTION CREATORS  ----------*/
const addRoom = room => ({
  type: ADD_ROOM,
  room
});

const removeRoom = id => ({
  type: REMOVE_ROOM,
  id
});


/*----------  THUNK CREATORS  ----------*/
const destroyRoom = id => dispatch => {
  Room.blowUp(id);
  dispatch(removeWorld(id));
};

/*----------  REDUCER  ----------*/
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ROOM:
      if (findIndex(state, { id: action.room.id }) === -1) return [...state, action.world];
      else return state;
    case REMOVE_ROOM:
      idx = findIndex(state, { id: action.id });
      if (idx + 1) {
        newState = [...state];
        newState.splice(idx, 1);
        return newState;
      } else {
        return state;
      }
    default: return state;
  }
};

module.exports = { reducer, addRoom, removeRoom, destroyRoom };

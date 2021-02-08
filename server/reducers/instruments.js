const { pickBy } = require('lodash');
let newState;

/*----------  INITIAL STATE  ----------*/
const initialState = {};

/*----------  ACTION TYPES  ----------*/
const RECEIVE_ALL_INSTRUMENTS = 'RECEIVE_ALL_INSTRUMENTS';
const RECEIVE_INSTRUMENT = 'RECEIVE_INSTRUMENT';

/*----------  ACTION CREATORS  ----------*/
const receiveAllInstruments = instruments => ({
  type: RECEIVE_ALL_INSTRUMENTS,
  food
});

const receiveInstrument = (id, data) => ({
  type: RECEIVE_INSTRUMENT,
  id,
  data
});


/*----------  THUNK CREATORS  ----------*/


/*----------  REDUCER  ----------*/
const immutable = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_ALL_INSTRUMENTS:
      return action.instrument;
    case RECEIVE_INSTRUMENT:
      newState = Object.assign({}, state);
      newState[action.id] = action.data;
      return newState;
    default:
      return state;
  }
};

const mutable = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_ALL_INSTRUMENTS:
      return action.instruments;
    case RECEIVE_INSTRUMENT:
      state[action.id] = action.data;
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
  receiveAllInstruments,
  receiveInstrument
};
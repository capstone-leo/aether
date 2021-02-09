const { pickBy } = require('lodash');
let newState;

/*----------  INITIAL STATE  ----------*/
const initialState = [];

/*----------  ACTION TYPES  ----------*/
const RECEIVE_ALL_INSTRUMENTS = 'RECEIVE_ALL_INSTRUMENTS';
const RECEIVE_INSTRUMENT = 'RECEIVE_INSTRUMENT';

/*----------  ACTION CREATORS  ----------*/
const receiveAllInstruments = (instruments) => ({
  type: RECEIVE_ALL_INSTRUMENTS,
  instruments,
});

const receiveInstrument = (data) => ({
  type: RECEIVE_INSTRUMENT,
  instrument: { id: data.id, position: data.position },
});

/*----------  THUNK CREATORS  ----------*/

/*----------  REDUCER  ----------*/

const immutable = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_ALL_INSTRUMENTS:
      return action.instruments;
    case RECEIVE_INSTRUMENT:
      return [...state, action.instrument];
    default:
      return state;
  }
};

const mutable = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_ALL_INSTRUMENTS:
      return action.instruments;
    case RECEIVE_INSTRUMENT:
      return [...state, action.instrument];
    default:
      return state;
  }
};

const chooseReducer = (reducerMode) => {
  switch (reducerMode) {
    case 'mutable':
      return mutable;
    case 'immutable':
      return immutable;
    default:
      return mutable;
  }
};

const reducer = chooseReducer('immutable');

module.exports = {
  reducer,
  receiveAllInstruments,
  receiveInstrument,
};

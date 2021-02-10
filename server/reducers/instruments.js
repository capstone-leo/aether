const { pickBy } = require('lodash');
let newState;

/*----------  INITIAL STATE  ----------*/
const initialState = [];

/*----------  ACTION TYPES  ----------*/
const RECEIVE_ALL_INSTRUMENTS = 'RECEIVE_ALL_INSTRUMENTS';
const RECEIVE_INSTRUMENT = 'RECEIVE_INSTRUMENT';
const DRAG_INSTRUMENT = 'DRAG_INSTRUMENT';

/*----------  ACTION CREATORS  ----------*/
const receiveAllInstruments = (instruments) => ({
  type: RECEIVE_ALL_INSTRUMENTS,
  instruments,
});

const receiveInstrument = (data) => {
  console.log('data server --> ', data);
  return {
    type: RECEIVE_INSTRUMENT,
    instrument: { id: data.id, position: data.position },
  };
};

const dragInstrument = (id, position) => ({
  type: DRAG_INSTRUMENT,
  instrument: { id, position },
});

/*----------  THUNK CREATORS  ----------*/

/*----------  REDUCER  ----------*/

const immutable = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_ALL_INSTRUMENTS:
      return action.instruments;
    case RECEIVE_INSTRUMENT:
      return [...state, action.instrument];
    case DRAG_INSTRUMENT:
      const newState = state.map((instrument) => {
        if (instrument.id === action.instrument.id) {
          return {
            id: action.instrument.id,
            position: action.instrument.position,
          };
        } else {
          return instrument;
        }
      });
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
      return [...state, action.instrument];
    case DRAG_INSTRUMENT:
      return state.map((instrument) => {
        if (instrument.id === action.instrument.id) {
          return {
            id: action.instrument.id,
            position: Object.entries(action.instrument.position),
          };
        } else {
          return instrument;
        }
      });
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
  dragInstrument,
};

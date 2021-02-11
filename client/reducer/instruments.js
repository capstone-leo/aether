const { pickBy } = require('lodash');
let newState;

/*----------  INITIAL STATE  ----------*/
const initialState = [];

/*----------  ACTION TYPES  ----------*/
const RECEIVE_ALL_INSTRUMENTS = 'RECEIVE_ALL_INSTRUMENTS';
const RECEIVE_INSTRUMENT = 'RECEIVE_INSTRUMENT';
const DRAG_INSTRUMENT = 'DRAG_INSTRUMENT';
const REMOVE_INSTRUMENT = 'REMOVE_INSTRUMENT';

/*----------  ACTION CREATORS  ----------*/
export const receiveAllInstruments = (instruments) => ({
  type: RECEIVE_ALL_INSTRUMENTS,
  instruments,
});

export const receiveInstrument = (instrument) => {
  return {
    type: RECEIVE_INSTRUMENT,
    instrument,
  };
};

export const dragInstrument = (id, position, type, soundIndex) => ({
  type: DRAG_INSTRUMENT,
  instrument: { id, position, type, soundIndex },
});

export const removeInstrument = (id) => ({
  type: REMOVE_INSTRUMENT,
  id,
});

// let reduxInstrument = store.getState().instruments
// .filter((instrument)=>draggingObjectReduxId === instrument.reduxid)

/*----------  REDUCER  ----------*/
export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_ALL_INSTRUMENTS:
      return action.instruments;
    case RECEIVE_INSTRUMENT:
      newState = state.filter(
        (instrument) => instrument.id !== action.instrument.id
      );
      return [...newState, action.instrument];
    case DRAG_INSTRUMENT:
      return state.map((instrument) => {
        if (instrument.id === action.instrument.id) {
          return {
            id: action.instrument.id,
            position: action.instrument.position,
            type: action.instrument.type,
            soundIndex: action.instrument.soundIndex,
          };
        } else {
          return instrument;
        }
      });
    case REMOVE_INSTRUMENT:
      return state.filter((instrument) => instrument.id !== action.instrument);
    default:
      return state;
  }
};

//reducer at index of the object where ID === id we are given

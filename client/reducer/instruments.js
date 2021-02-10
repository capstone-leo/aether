const { pickBy } = require('lodash');

let newState;

/*----------  INITIAL STATE  ----------*/
const initialState = [];

/*----------  ACTION TYPES  ----------*/
const RECEIVE_ALL_INSTRUMENTS = 'RECEIVE_ALL_INSTRUMENTS';
const RECEIVE_INSTRUMENT = 'RECEIVE_INSTRUMENT';
const DRAG_INSTRUMENT = 'DRAG_INSTRUMENT';

/*----------  ACTION CREATORS  ----------*/
export const receiveAllInstruments = (instruments) => ({
  type: RECEIVE_ALL_INSTRUMENTS,
  instruments,
});

export const receiveInstrument = (id, position) => ({
  type: RECEIVE_INSTRUMENT,
  instrument: { id, position },
});

export const dragInstrument = (id, position) => ({
  type: DRAG_INSTRUMENT,
  instrument: { id, position },
});

// let reduxInstrument = store.getState().instruments
// .filter((instrument)=>draggingObjectReduxId === instrument.reduxid)

/*----------  REDUCER  ----------*/
export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_ALL_INSTRUMENTS:
      return action.instruments;
    case RECEIVE_INSTRUMENT:
      return [...state, action.instrument];
    case DRAG_INSTRUMENT:
      return state.map((instrument, index) => {
        console.log('hehllooooo', state[index ].id)
        // state[index].id === action.instrument.id
          // ? [...state, { ...action.instrument }]
          // : instrument;
      });
      
    default:
      return state;
  }
};

//state where the id entry is equal to action.instrument.id

// store.dispatch(dragInstrument)
//reducer at index of the object where ID === id we are given

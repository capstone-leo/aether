const { pickBy } = require('lodash');
let newState;

/*----------  INITIAL STATE  ----------*/
const initialState = {};

/*----------  ACTION TYPES  ----------*/
const RECEIVE_ALL_INSTRUMENTS = 'RECEIVE_ALL_INSTRUMENTS';
const RECEIVE_INSTRUMENT = 'RECEIVE_INSTRUMENT';

/*----------  ACTION CREATORS  ----------*/
export const receiveAllInstruments = (instruments) => ({
  type: RECEIVE_ALL_INSTRUMENTS,
  instruments,
});

export const receiveInstrument = (id, position) => ({
  type: RECEIVE_INSTRUMENT,
  id,
  position,
});

/*----------  REDUCER  ----------*/
export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_ALL_INSTRUMENTS:
      return action.instruments;
    case RECEIVE_INSTRUMENT:
      return { ...action.instrument };
    default:
      return state;
  }
};

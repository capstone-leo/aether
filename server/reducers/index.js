const { combineReducers } = require('redux');
const rooms = require('./rooms').reducer;
const players = require('./players');
const instrument = require('./instruments').reducer;

const playerReducer = players.reducer;
module.exports = combineReducers({
  rooms,
  playerReducer,
  instrument,
});

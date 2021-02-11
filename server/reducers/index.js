const { combineReducers } = require('redux');
const rooms = require('./rooms').reducer;
const players = require('./players');
const instrument = require('./instruments').reducer;
const messageReducer = require('./messages').messageReducer;

const playerReducer = players.reducer;
module.exports = combineReducers({
  rooms,
  playerReducer,
  instrument,
  messageReducer
});

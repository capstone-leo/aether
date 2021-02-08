const { combineReducers } = require('redux');
const rooms = require('./rooms').reducer;
const players = require('./players');
const instrument = require('./instruments').reducer;
const  { sceneReducer }  = require('./scene');
console.log('room', rooms);
console.log(players.reducer);
console.log(instrument);

const playerReducer = players.reducer;
console.log('scenereducer', sceneReducer)
module.exports = combineReducers({
  rooms,
  playerReducer,
  instrument,
  sceneReducer,
});

const store = require('../store');

const broadcastScene = (io) => {

  const { sceneReducer } = store.getState()
  console.log('the scene reducer', sceneReducer)

console.log(Object.entries(sceneReducer))
 
let sceneEntries = Object.entries(sceneReducer)
  setInterval(() => {
    io.sockets.emit('load_scene',  sceneEntries);
 console.log(sceneEntries)
  }, 1000);

};

module.exports = { broadcastScene };


const objectToMap = obj => {
  const keys = Object.keys(obj);
  const map = new Map();
  for(let i = 0; i < keys.length; i++){
     //inserting new key value pair inside map
     map.set(keys[i], obj[keys[i]]);
  };
  return map;
}
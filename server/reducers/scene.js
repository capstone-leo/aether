const THREE = require('three');

const initialState = new THREE.Scene();
console.log("reeuesrs scene", initialState)
const UPDATE_SCENE = 'UPDATE_SCENE';

const updateScene = (scene) => ({
  type: UPDATE_SCENE,
  scene,
});

const sceneReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SCENE:
      return action.scene;
    default:
      return state;
  }


};
  module.exports = { sceneReducer, updateScene };
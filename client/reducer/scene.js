import * as THREE from 'three';

const initialState = {};

const LOAD_SCENE = 'LOAD_SCENE';

export const loadScene = (scene) => ({
  type: LOAD_SCENE,
  scene,
});

export default (state = initialState, action) => {
  switch (action.type) {
  case LOAD_SCENE:
    return action.scene
  default: 
  return state
}
};

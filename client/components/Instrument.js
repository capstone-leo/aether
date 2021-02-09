import * as three from 'three';
import * as tone from 'tone';
import { scene, draggableObjects, dragControls } from '../engine/main';
import {
  playC4,
  playD4,
  playE4,
  playF4,
  playG4,
  playA4,
  playB4,
  playC5,
  sinB4,
  sinA4,
  sinC4,
  sinD4,
  sinE4,
  sinF4,
  sinG4,
  //transpo,
} from './tone.fn.js';

const soundList = [
  playC4,
  playD4,
  playE4,
  playF4,
  playG4,
  playA4,
  playB4,
  playC5,
  //transpo,
  sinB4,
  sinA4,
  sinC4,
  sinD4,
  sinE4,
  sinF4,
  sinG4,
  sinD4,
  sinA4,
  sinB4,
  sinC4,
  sinE4,
  sinG4,
];
function rainbow(numOfSteps, step) {
  // This function generates vibrant, "evenly spaced" colours (i.e. no clustering). This is ideal for creating easily distinguishable vibrant markers in Google Maps and other apps.
  // Adam Cole, 2011-Sept-14
  // HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
  var r, g, b;
  var h = step / numOfSteps;
  var i = ~~(h * 6);
  var f = h * 6 - i;
  var q = 1 - f;
  switch (i % 6) {
    case 0:
      r = 1;
      g = f;
      b = 0;
      break;
    case 1:
      r = q;
      g = 1;
      b = 0;
      break;
    case 2:
      r = 0;
      g = 1;
      b = f;
      break;
    case 3:
      r = 0;
      g = q;
      b = 1;
      break;
    case 4:
      r = f;
      g = 0;
      b = 1;
      break;
    case 5:
      r = 1;
      g = 0;
      b = q;
      break;
    default:
      break;
  }
  var c =
    '0x' +
    ('00' + (~~(r * 255)).toString(16)).slice(-2) +
    ('00' + (~~(g * 255)).toString(16)).slice(-2) +
    ('00' + (~~(b * 255)).toString(16)).slice(-2);
  return c;
}
class Instrument {
  constructor(id, position) {
    this.geometry = new three.BoxGeometry(50, 20, 20);
    this.material = new three.MeshLambertMaterial({
      //wireframe: true,
      color: Math.random() * 0xffffff,
      //wireframeLinewidth: 2,
    });
    this.mesh = new three.Mesh(this.geometry, this.material);
    //sets random X & Y coordinates where -300 >= X >= 300 & -150 >= Y >= 150 (basically it wont be in the circle)
    if (!position) {
      this.mesh.position.setX(
        Math.floor(Math.random() * 300 + 350) * (Math.random() < 0.5 ? -1 : 1)
      );
      this.mesh.position.setY(
        Math.floor(Math.random() * 150 + 170) * (Math.random() < 0.5 ? -1 : 1)
      );
    } else {
      this.mesh.position.setX(position[0]);
      this.mesh.position.setY(position[1]);
      //this.mesh.position.setZ(position[2]);
    }
    this.boundary = new three.Box3().setFromObject(this.mesh);
    this.boundaryHelper = new three.BoxHelper(this.mesh, 0xff0000);
    this.boundaryHelper.object = this.mesh;
    this.sound = soundList[Math.floor(Math.random() * soundList.length)];
    this.mesh.sound = this.sound;
    this.mesh.playSound = () => {
      this.mesh.sound();
    };
    this.alreadyPlayed = false;
    this.transportStarted = false;
  }
  transportStart = () => {
    tone.Transport.start();
    console.log('ok');
  };
  transportStop = () => {
    tone.Transport.stop();
  };
  playSound = () => {
    this.sound();
  };
  init = () => {
    scene.add(this.mesh);
    draggableObjects.push(this.mesh);
  };
}

export default Instrument;

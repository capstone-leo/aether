import * as three from "three";
import * as tone from "tone";
import {
  playPianoC1,
  playPianoC2,
  playPianoC3,
  playPianoC4,
  playPianoC5,
  playPianoD1,
  playPianoD2,
  playPianoD3,
  playPianoD4,
  playPianoD5,
  playPianoE1,
  playPianoE2,
  playPianoE3,
  playPianoE4,
  playPianoE5,
  playPianoF1,
  playPianoF2,
  playPianoF3,
  playPianoF4,
  playPianoF5,
  playPianoG1,
  playPianoG2,
  playPianoG3,
  playPianoG4,
  playPianoG5,
  playPianoA1,
  playPianoA2,
  playPianoA3,
  playPianoA4,
  playPianoA5,
  playPianoB1,
  playPianoB2,
  playPianoB3,
  playPianoB4,
  playPianoB5,
} from "../tone-functions/piano.js";

const pianoList = [
  playPianoC1,
  playPianoC2,
  playPianoC3,
  playPianoC4,
  playPianoC5,
  playPianoD1,
  playPianoD2,
  playPianoD3,
  playPianoD4,
  playPianoD5,
  playPianoE1,
  playPianoE2,
  playPianoE3,
  playPianoE4,
  playPianoE5,
  playPianoF1,
  playPianoF2,
  playPianoF3,
  playPianoF4,
  playPianoF5,
  playPianoG1,
  playPianoG2,
  playPianoG3,
  playPianoG4,
  playPianoG5,
  playPianoA1,
  playPianoA2,
  playPianoA3,
  playPianoA4,
  playPianoA5,
  playPianoB1,
  playPianoB2,
  playPianoB3,
  playPianoB4,
  playPianoB5,
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
    "0x" +
    ("00" + (~~(r * 255)).toString(16)).slice(-2) +
    ("00" + (~~(g * 255)).toString(16)).slice(-2) +
    ("00" + (~~(b * 255)).toString(16)).slice(-2);
  return c;
}
class Piano {
  constructor() {
    this.geometry = new three.BoxGeometry(50, 20, 20);
    this.material = new three.MeshLambertMaterial({
      //wireframe: true,
      color: Math.random() * 0xffffff,
      //wireframeLinewidth: 2,
    });
    this.mesh = new three.Mesh(this.geometry, this.material);
    //sets random X & Y coordinates where -300 >= X >= 300 & -150 >= Y >= 150 (basically it wont be in the circle)
    this.mesh.position.setX(
      Math.floor(Math.random() * 300 + 300) * (Math.random() < 0.5 ? -1 : 1)
    );
    this.mesh.position.setY(
      Math.floor(Math.random() * 150 + 150) * (Math.random() < 0.5 ? -1 : 1)
    );

    this.boundary = new three.Box3().setFromObject(this.mesh);
    this.boundaryHelper = new three.BoxHelper(this.mesh, 0xff0000);
    this.boundaryHelper.object = this.mesh;
    this.sound = pianoList[Math.floor(Math.random() * pianoList.length)];
    this.mesh.sound = this.sound;
    this.mesh.playSound = () => {
      this.mesh.sound();
    };
    this.alreadyPlayed = false;
    this.transportStarted = false;
  }
  transportStart = () => {
    tone.Transport.start();
    console.log("ok");
  };
  transportStop = () => {
    tone.Transport.stop();
  };
  playSound = () => {
    this.sound();
  };
}

export default Piano;

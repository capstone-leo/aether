import * as three from "three";
import * as tone from "tone";
import { scene, draggableObjects, instruments } from "../../engine/main";
import {
  drumList,
  chordList,
  feedbackDelayList,
  harpList,
  marimbaList,
  pianoList,
  toneList,
} from "../tone-functions";

class Instrument {
  constructor(id, position, type, soundIndex) {
    this.type = type;
    this.geometry = new three.BoxGeometry(50, 20, 20);
    this.material = new three.MeshLambertMaterial({
      //wireframe: true,
      color: Math.random() * 0xffffff,
      //wireframeLinewidth: 2,
      polygonOffset: true,
      polygonOffsetUnits: 1,
      polygonOffsetFactor: 0
    });
    this.mesh = new three.Mesh(this.geometry, this.material);
    this.mesh.reduxid = id;
    //sets random X & Y coordinates where -300 >= X >= 300 & -150 >= Y >= 150 (basically it wont be in the circle)
    if (!position) {
      console.log('position', position
      )
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

    this.soundIndex = soundIndex || this.getSoundIdx(this.type);
    this.sound = this.getSound(this.type);

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
  init = () => {
    instruments.push(this);
    draggableObjects.push(this.mesh);
    scene.add(this.mesh);
  };
  updatePosition = (newX, newY) => {
    this.mesh.position.setX(newX);
    this.mesh.position.setY(newY);
  };
  smash = (id) => {
    instruments.filter((instrument) => instrument.mesh.reduxid !== id);
    draggableObjects.filter((instrument) => instrument.reduxid !== id);
    scene.remove(this.mesh);
  };
  getSound = (type) => {
    switch (type) {
      case "drums":
        return drumList[this.soundIndex];

      case "chords":
        return chordList[this.soundIndex];

      case "feedbackDelays":
        return feedbackDelayList[this.soundIndex];

      case "harps":
        return harpList[this.soundIndex];

      case "marimbas":
        return marimbaList[this.soundIndex];

      case "pianos":
        return pianoList[this.soundIndex];

      case "tones":
        return toneList[this.soundIndex];
      default:
        return toneList[this.soundIndex];
    }
  };
  getSoundIdx = (type) => {
    switch (type) {
      case "drums":
        return Math.floor(Math.random() * drumList.length);

      case "chords":
        return Math.floor(Math.random() * chordList.length);

      case "feedbackDelays":
        return Math.floor(Math.random() * feedbackDelayList.length);

      case "harps":
        return Math.floor(Math.random() * harpList.length);

      case "marimbas":
        return Math.floor(Math.random() * marimbaList.length);

      case "pianos":
        return Math.floor(Math.random() * pianoList.length);

      case "tones":
        return Math.floor(Math.random() * toneList.length);
      default:
        return Math.floor(Math.random() * toneList.length);
    }
  };
}

export default Instrument;

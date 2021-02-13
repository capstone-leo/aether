import * as three from 'three';
import * as tone from 'tone';
import { scene, draggableObjects, instruments } from '../../engine/main';
import {
  drumList,
  chordList,
  feedbackDelayList,
  harpList,
  marimbaList,
  pianoList,
  toneList,
} from '../tone-functions';

class Instrument {
  constructor(id, position, soundType, soundIndex, color) {
    this.geometry = new three.BoxGeometry(50, 20, 20);
    this.material = new three.MeshLambertMaterial({
      //wireframe: true,
      color: Math.random() * 0xffffff,
      
      polygonOffset: true,
      polygonOffsetUnits: 1,
      polygonOffsetFactor: 0,
    });
    this.mesh = new three.Mesh(this.geometry, this.material);
    this.mesh.reduxid = id;
    this.soundType = soundType;
    this.mesh.soundType = this.soundType;
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

    this.soundIndex = soundIndex || this.getSoundIdx(this.soundType);
    this.sound = this.getSound(this.soundType);
    this.mesh.soundIndex = this.soundIndex;
    this.mesh.sound = this.sound;
    this.mesh.color = this.getColor(this.soundType);
    this.mesh.material.color = new three.Color(this.getColor(soundType));

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
  getSound = (soundType) => {
    switch (soundType) {
      case 'drums':
        return drumList[this.soundIndex];

      case 'chords':
        return chordList[this.soundIndex];

      case 'feedbackDelays':
        return feedbackDelayList[this.soundIndex];

      case 'harps':
        return harpList[this.soundIndex];

      case 'marimbas':
        return marimbaList[this.soundIndex];

      case 'pianos':
        return pianoList[this.soundIndex];

      case 'tones':
        return toneList[this.soundIndex];
      default:
        return toneList[this.soundIndex];
    }
  };
  getSoundIdx = (soundType) => {
    switch (soundType) {
      case 'drums':
        return Math.floor(Math.random() * drumList.length);

      case 'chords':
        return Math.floor(Math.random() * chordList.length);

      case 'feedbackDelays':
        return Math.floor(Math.random() * feedbackDelayList.length);

      case 'harps':
        return Math.floor(Math.random() * harpList.length);

      case 'marimbas':
        return Math.floor(Math.random() * marimbaList.length);

      case 'pianos':
        return Math.floor(Math.random() * pianoList.length);

      case 'tones':
        return Math.floor(Math.random() * toneList.length);
      default:
        return Math.floor(Math.random() * toneList.length);
    }
  };

  getColor = (soundType) => {
    switch (soundType) {
      case 'drums':
        return 0xff0404; /*red*/

      case 'chords':
        return 0xfd7b02; /*orange*/

      case 'feedbackDelays':
        return 0xff00c8; /*pinky*/

      case 'harps':
        return 0x1b7500; /*green*/

      case 'marimbas':
        return 0x0420c4; /*blue*/

      case 'pianos':
        return 0x8303fa; /*purp*/

      case 'tones':
        return Math.random() * 0xffffff;
      default:
        return Math.random() * 0xffffff;
    }
  };

  // getGeometry = (geometry) => {
  //   switch (geometry) {
  //     case 'drums':
  //       return 0xff0404; /*red*/

  //     case 'chords':
  //       return 0xfd7b02; /*orange*/

  //     case 'feedbackDelays':
  //       return 0xff00c8; /*pinky*/

  //     case 'harps':
  //       return 0x1b7500; /*green*/

  //     case 'marimbas':
  //       return 0x0420c4; /*blue*/

  //     case 'pianos':
  //       return 0x8303fa; /*purp*/

  //     case 'tones':
  //       return Math.random() * 0xffffff;
  //     default:
  //       return Math.random() * 0xffffff;
  //   }
  // };
}

export default Instrument;

import * as three from 'three';
import * as tone from 'tone';
import { scene } from '../../engine/main';
import Instrument from './Instrument';



/* class Drums {
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
    this.sound = drumList[Math.floor(Math.random() * drumList.length)];
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
  };
}
 */

/* class Drums extends Instrument{
  constructor(id, position){
    super(){
      
    }

  }
}
export default Drums;
 */
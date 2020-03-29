import Phaser from "phaser";
import {GameScene} from './scenes/GameScene.js';
import {BootScene} from "./scenes/BootScene.js";
import {JoyStickTest} from "./scenes/JoyStickTest";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: document.body.clientWidth,
  height: document.body.clientHeight,
  physics: {
    default: 'arcade',
    arcade: {
        gravity: {  },
        debug: true
    }
  },
  pixelArt: true,
  roundPixels: true,
  scene: [BootScene,GameScene,JoyStickTest]
};

const game = new Phaser.Game(config);
import Phaser from "phaser";
import {GameScene} from './scenes/GameScene.js';
import {BootScene} from "./scenes/BootScene.js";

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
  scene: [BootScene,GameScene]
};

const game = new Phaser.Game(config);
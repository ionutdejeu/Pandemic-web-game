import Phaser from "phaser";
import {GameScene} from './scenes/GameScene.js';
import {BootScene} from "./scenes/BootScene.js";
import {JoyStickTest} from "./scenes/JoyStickTest";
import {GameEndedScene} from "./scenes/GameEndedScene";
import {GameWonScene} from "./scenes/GameWonScene";
const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: document.body.clientWidth,
  height: document.body.clientHeight,
  physics: {
    default: 'arcade',
    arcade: {
        gravity: {  },
        debug: false
    }
  },
  pixelArt: true,
  roundPixels: true,
  scene: [BootScene,GameScene,JoyStickTest,GameEndedScene,GameWonScene]
};

const game = new Phaser.Game(config);
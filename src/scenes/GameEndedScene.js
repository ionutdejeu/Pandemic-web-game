 
import { AgentController } from "../prefabs/AgentController";
import {FollowScrollingCamera} from '../shared/FollowScrollingCamera';
import {JoystickGameObject} from '../shared/JoystickGameObject';

export const ScenKey = "GameEndedScene"
export class GameEndedScene extends Phaser.Scene {
    
    constructor() {
        super({key: ScenKey});
    }
    
    preload() { 
        
    }

    create(){
        var graphics = this.add.graphics();

        graphics.fillGradientStyle(0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 1);
        graphics.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height);
    
        
    }
     
}
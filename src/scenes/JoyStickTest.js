 
import { AgentController } from "../prefabs/AgentController";
import {FollowScrollingCamera} from '../shared/FollowScrollingCamera';
import {JoystickGameObject} from '../shared/JoystickGameObject';

export const ScenKey = "JoyStickTest"
export class JoyStickTest extends Phaser.Scene {
    
    constructor() {
        super({
            key: ScenKey
        })
        this.group = {};
        
    }
    

    preload() { 
        
        AgentController.loadAssets(this);
        
    }

    create(){
        this.agentsPhysicsGroup = this.physics.add.group();
        for (var i = 0; i < 5; i++)
        {
            var agent = new AgentController(this,this.agentsPhysicsGroup)
            
        }
         //this.cameras.main.setBounds(0, 0, this.map.widthInPixels * 4, this.map.heightInPixels * 4);
         this.cameras.remove(this.cameras.main);
         var camera = new FollowScrollingCamera(this,{
             x:0,
             y:0,
             bottom:1500,
             right:1500
         });
         //this.joystickObject = new JoystickGameObject(this,0,0);

        
    }
     
}
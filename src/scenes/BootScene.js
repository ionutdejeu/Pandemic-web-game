import Phaser from "phaser";
import roguelikeCity_magentaPng from '../assets/roguelikeCity_magenta.png';
import Pandemic_cityJSON from '../assets/Pandemic_city.json';
import {ScenKey as MainSceneKey}  from './GameScene';
export const ScenKey = "BootScene"
export class BootScene extends Phaser.Scene {
    
    constructor() {
        super({
            key: ScenKey
        })
        this.group = {};
        
    }
    

    preload() { 
        
        //AgentController.loadAssets(this);
         
        this.loadTileMap();
        
    }

    create(){
        this.scene.launch(MainSceneKey);
    }
    loadTileMap() {
        // load the map tileset image
        this.load.image('roguelikeCity_magentaPng',roguelikeCity_magentaPng ); 
        this.load.tilemapTiledJSON('roguelikeCity_magenta',Pandemic_cityJSON);
      }
}
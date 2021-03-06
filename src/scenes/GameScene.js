import Phaser from "phaser";
import { AgentController } from "../prefabs/AgentController";
import {ScrollingCamera} from '../shared/ScrollingCamera';
import {GameManager} from '../prefabs/GameManager';

export const ScenKey = "GameScene"
export class GameScene extends Phaser.Scene {
    
    constructor() {
        super({
            key: ScenKey
        })
        this.agentsPhysicsGroup = {};
        this.mapScaleFactor = 4;    
    }
    

    preload() {
        AgentController.loadAssets(this);
        
    }

    create() {
        
        this.createMap();
        this.createAgents();

        // Loads the spatial tree
        this.physics.world.step(0);

       
    }

    createAgents(){

        this.gManager = new GameManager(this);     

    }
    createLayer(layerName,tileSet,setCollsion){
        var newLayer = this.map.createStaticLayer(layerName, tileSet, 0, 0);
        newLayer.setScale(this.mapScaleFactor);
        if(setCollsion === true){
            newLayer.setCollisionByExclusion([-1]);
        }
        return newLayer;
    }
     
    createMap() {
        // create the tile map
        this.map = this.make.tilemap({ key: 'roguelikeCity_magenta' });
        console.log(this.map)
        // add the tileset image to our map
        this.tiles = this.map.addTilesetImage('roguelikeCity_magenta', 'roguelikeCity_magentaPng', 16, 16, 0, 1);
        // create our background
        this.groundLayer = this.map.createStaticLayer('Ground', this.tiles, 0, 0);
        this.groundLayer.setScale(this.mapScaleFactor);

        // create our walltp 
        this.BuildingsLayer = this.map.createStaticLayer('Buildings', this.tiles, 0, 0);
        this.BuildingsLayer.setScale(this.mapScaleFactor);
        this.BuildingsLayer.setCollisionByExclusion([-1]);

        // create our furniture 
        this.furniture = this.map.createStaticLayer('Details', this.tiles, 0, 0);
        this.furniture.setScale(this.mapScaleFactor);
        

        // create our charis 
        this.QuarantineZoneLayer = this.map.createStaticLayer('QuarantineZone', this.tiles, 0, 0);
        this.QuarantineZoneLayer.setScale(this.mapScaleFactor);
        this.QuarantineZoneLayer.setCollisionByExclusion([-1]);

        console.log(this.physics.world.bounds);
        //update the world bounds
        this.physics.world.bounds.width = this.map.widthInPixels * this.mapScaleFactor;
        this.physics.world.bounds.height = this.map.heightInPixels * this.mapScaleFactor;

        //limit the camera to the size of our map
        //this.cameras.main.setBounds(0, 0, this.map.widthInPixels * 4, this.map.heightInPixels * 4);
        this.cameras.remove(this.cameras.main);
        var camera = new ScrollingCamera(this,{
            x:0,
            y:0,
            bottom:this.map.widthInPixels *this.mapScaleFactor,
            right:this.map.heightInPixels * this.mapScaleFactor
        });
    }
    

}


import { AgentController,AngetController_Events } from "./AgentController";
import { GameHud } from "./GameHud";
import {ScenKey as GameEndedSceneKey} from '../scenes/GameEndedScene';
import {ScenKey as GameWonSceneKey} from '../scenes/GameWonScene';
export class GameManager {

    constructor(scene){
        this.scene = scene;
        this.hud = new GameHud(scene,this);
        this.sickPeople = 0;
        this.totalPeople = 0;
        this.totalPeopleWentHome = 0;
        this.agentsPhysicsGroup = this.scene.physics.add.group(
            {
                bounceX: 1,
                bounceY: 1,
                collideWorldBounds: true,
                velocityX: 300,
                velocityY: 150
            });

        this.scene.physics.add.collider(this.agentsPhysicsGroup,this.agentsPhysicsGroup,(object1,object2)=>{
            object1.getHit(object2.stats);
            object2.getHit(object1.stats);
            object1.visual.animate('attack');
            object2.visual.animate('getHit');
        });
        this.scene.physics.add.collider(this.agentsPhysicsGroup,this.scene.BuildingsLayer);
        this.scene.physics.add.collider(this.agentsPhysicsGroup,this.scene.QuarantineZoneLayer);

        this.spawnPoints = [
            new Phaser.Math.Vector2(100,100),
            new Phaser.Math.Vector2(2000,100),
            new Phaser.Math.Vector2(1000,1000),
        ];
        this.spawnLimit = 50;
        this.spawnRatePerSec = 1;
        this.spawnTimer =  this.scene.time.addEvent({
            delay: 1000/this.spawnRatePerSec,// ms
            callback: ()=>{
                this.spawnAgents();
            },
            callbackScope: this,
            loop: true
        });
        this.gameTimer =  this.scene.time.addEvent({
            delay: 1200,
            callback: ()=>{
                this.gameWon();
            },
            callbackScope: this,
            loop: false
        });

        this.scene.events.on(AngetController_Events.AgentController_GetSick,this.agentGotSick,this);
        this.scene.events.on(AngetController_Events.AgentController_ExitScene,this.peopleWentHome,this);
    }
    agentGotSick(){
        this.checkGameEnded();
        this.updateHud();
    }
    peopleWentHome(){
        this.totalPeopleWentHome ++;
        this.updateHud();
    }
    updateHud(){
        this.hud.updateLevelSummaryLabel(this.sickPeople,this.totalPeople,this.totalPeopleWentHome);
    }
    updateGameState(){
        var agents = this.agentsPhysicsGroup.getChildren();
        this.sickPeople = 0;
        for (let index = 0; index < agents.length; index++) {
            const ag = agents[index];
            if(ag.stats._isSick === true){
                this.sickPeople ++;
            }
        }
        this.totalPeople = agents.length
    }
    spawnAgents(){
        var total = this.agentsPhysicsGroup.countActive()
        if(total <= this.spawnLimit){
            var agent = new AgentController(this.scene);
            var randomPos = this.spawnPoints[Phaser.Math.Between(0,this.spawnPoints.length-1)];
            this.agentsPhysicsGroup.add(agent);
        
            agent.setPosition(randomPos.x,randomPos.y);
            agent.setRandomSpeedAndDirection();
            
            this.updateGameState();   
            this.updateHud();

        }
    }
    checkGameEnded(){
        this.updateGameState();
        if(this.sickPeople-this.totalPeople === 0){
            // this end game 
            console.log('GAME LOST');
            this.scene.game.scene.start(GameEndedSceneKey);
        }
    }
    gameWon(){
        console.log(this.scene);
        console.log('GAME WON');
        this.scene.scene.manager.start(GameWonSceneKey);
    }
    
    

}
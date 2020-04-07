import { AgentBaseUI } from './AgentUi';
import { AgentsStats } from './AgentStats';
export const AngetController_Events = { 
    AgentController_GetSick:'AgentController_GetSick',
    AgentController_ExitScene:'AgentController_ExitScene'
}
export class AgentController extends Phaser.GameObjects.Container{
    
    constructor(scene){
        super(scene,0,0,null);
        this.scene = scene;
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.setSize(100,100);
        this.body.setCircle(35,15,15);
        this.setInteractive();
         
        this.setRandomSpeedAndDirection();
        this.stats = new AgentsStats();
        this.stats.random();
        this.visual = new AgentBaseUI(scene,this.stats);
        this.add(this.visual);
        this.on('pointerup', function (pointer) {

            this.moveToQuarantien();
    
        },this);
        this.visual.updateSickState();
        this.existScene =  this.scene.time.addEvent({
            delay: 50000,// ms
            callback: ()=>{
                this.destroy();
            },
            callbackScope: this,
            loop: false
        });

    }
    
    static loadAssets(scene) {
        AgentBaseUI.loadAssets(scene);
    }

    setStats(){
        this.stats.random();
    }

    setStartingPosition(scene){
        var spriteBounds = Phaser.Geom.Rectangle.Inflate(
            Phaser.Geom.Rectangle.Clone(
                scene.physics.world.bounds),
            -100,
            -100);
        var pos = Phaser.Geom.Rectangle.Random(spriteBounds);
        this.setPosition(pos.x, pos.y);
        this.setRandomSpeedAndDirection();
    }
    holdPosition(){
        this.body.setVelocity(0,0);
    }
    setRandomSpeedAndDirection(){
        this.body.setVelocity(Phaser.Math.Between(-100, 100), Phaser.Math.Between(100, 100));
    }
    getHit(otherObjectStats){

        if(otherObjectStats._isSick === true && this.stats._isSick === false){
            this.stats._isSick = true;
            this.visual.updateSickState();
            this.scene.events.emit(AngetController_Events.AgentController_GetSick,this);
        }
        
    }
    moveToQuarantien(){
        var quarantine = new Phaser.Geom.Rectangle(1408,640,320,256);
        var pos = Phaser.Geom.Rectangle.Random(quarantine);
        this.setPosition(pos.x,pos.y);
        this.holdPosition();
        this.disableInteractive();
        
    }
    destroy(){
        this.scene.events.emit(AngetController_Events.AgentController_ExitScene,this);
        this.existScene.destroy();
        this.visual.destroy();
        super.destroy();
    }

}
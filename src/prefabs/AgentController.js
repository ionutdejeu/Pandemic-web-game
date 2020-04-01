
import { AgentBaseUI } from './AgentUi';
import { AgentsStats } from './AgentStats';

export class AgentController extends Phaser.GameObjects.Container{
    
    constructor(scene,physicsGroup){
        super(scene,0,0,null);
        this.scene = scene;
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.setSize(100,100);
        this.body.setCircle(35,15,15);
        this.setInteractive();
        this.setStartingPosition(scene);
        this.stats = new AgentsStats();
        this.enableCollision = false;
        this.setStats();
        this.visual = new AgentBaseUI(scene,this.stats);
        this.add(this.visual);
        this.on('pointerup', function (pointer) {

            this.moveToQuarantien();
    
        },this);
        this.visual.updateSickState();
        setTimeout(()=>{this.enableCollision = true; }, 3000);

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
        this.body.setBounce(1, 1).setCollideWorldBounds(true);
        this.setRandomSpeedAndDirection();
    }
    holdPosition(){
        this.body.setVelocity(0,0);
    }
    setRandomSpeedAndDirection(){
        this.body.setVelocity(Phaser.Math.Between(-100, 100), Phaser.Math.Between(100, 100));
    }
    getHit(otherObjectStats){

        if(otherObjectStats._isSick && this.enableCollision){
            this.stats._isSick = true;
            this.visual.updateSickState();
        }
        
    }
    moveToQuarantien(){
        this.setPosition(2000,1000);
    }

}
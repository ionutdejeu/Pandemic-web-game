
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
        this.setStats();
        this.visual = new AgentBaseUI(scene,this.stats);
        this.add(this.visual);
        scene.input.setDraggable(this);
        scene.input.on('dragstart', function (pointer, gameObject) {

            if(gameObject == this){
                this.holdPosition();
                //this.scene.cameras.main.startFollow(this, true);
                 
            }
            

            
        },this);
        
        scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {

            gameObject.x = dragX;
            gameObject.y = dragY;
            // console.log(this.scene.cameras.main.getWorldPoint(dragX,dragY));
            // need to adjust the way that I process the position of the dragg point compared to the position on map

        });

        scene.input.on('dragend', function (pointer, gameObject) {
            if(gameObject == this){
                //this.setRandomSpeedAndDirection();
                //this.scene.cameras.main.stopFollow();
                console.log(this.scene.cameras.main);
            }
           
        },this);
    }
    powerUpActivatedHandler(payload){
        
        this.stats.applyPowerUpHandler(payload.options.type)
        console.log(this.stats._trust);
        this.visual.updateUI(this.stats._trust);
    }
    
    static loadAssets(scene) {
        AgentBaseUI.loadAssets(scene);
    }

    setStats(){
        this.stats = new AgentsStats();
        //this.stats.randomStats();
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
        //this.setRandomSpeedAndDirection();
    }
    holdPosition(){
        this.body.setVelocity(0,0);
    }
    setRandomSpeedAndDirection(){
        this.body.setVelocity(Phaser.Math.Between(100, 200), Phaser.Math.Between(100, 200));
    }
}
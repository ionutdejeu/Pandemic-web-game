
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
        this.setStartingPosition(scene);
        this.setStats();
        this.visual = new AgentBaseUI(scene,this.stats);
        this.add(this.visual);
         
        
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
        this.stats.randomStats();
    }

    setStartingPosition(scene){
        var spriteBounds = Phaser.Geom.Rectangle.Inflate(
            Phaser.Geom.Rectangle.Clone(
                scene.physics.world.bounds),
            -100,
            -100);
        var pos = Phaser.Geom.Rectangle.Random(spriteBounds);
        this.setPosition(pos.x, pos.y);
        this.body.setVelocity(Phaser.Math.Between(100, 200), Phaser.Math.Between(100, 200))
        .setBounce(1, 1).setCollideWorldBounds(true);
    }
}
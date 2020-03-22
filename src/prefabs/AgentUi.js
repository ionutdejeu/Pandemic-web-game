import char_male_brown_hair_spritemap from '../assets/char_male_brown_hair.png';
import blank_body_image from '../assets/blank_body.png';
import TextFactroy from '../shared/TextLabelFactory';
import { CircularHealthBar } from '../shared/CircularProgressbar';
export const required_assets = {
    head:{
      
        key:'char_male_brown_hair',
        file:char_male_brown_hair_spritemap,
        config:{frameWidth: 32, frameHeight: 32},
        anims:{
            idle:{
                frames:[0],
                key:'idle'
            },
            getHit:{
                frames:[1],
                key:'getHit'
            },
            attack:{
                frames:[2],
                key:'attack'
            }
        }
    },
    body:{
        key:'blank_body',
        file:blank_body_image
    }
}

export class AgentBaseUI extends Phaser.GameObjects.Container{
    
    constructor(scene,stats){
        super(scene,0,0);
        this.health = new CircularHealthBar(scene,0,0,stats.getStyleColor()); 
        this.add(this.health.bar);
        this.health.bar.setDepth(-1000);
        this.health.setValue(stats._trust);
        this.visualBody = scene.add.image(0,20,required_assets.body.key).setDepth(10);
        this.add(this.visualBody);
        this.head =  this.createSpriteWithAnimation(scene,required_assets.head);
        this.head.anims.play('idle');
        this.nameLabel = TextFactroy.create_text(scene,0,-50,stats.name);
        this.add(this.nameLabel);
    
    }

    updateUI(trust){
        this.health.setValue(Phaser.Math.Clamp(100-trust,0.01,99.99));
    }
    animate(key){
         
        this.head.anims.play(key);
        this.head.anims.chain('idle');
    }
    createSpriteWithAnimation(scene,assetObject){
        var sprite = scene.add.sprite(0, 0, assetObject.key)
        .setOrigin(0.5,0.5)
        .setScale(2);
         
        this.add(sprite);
        
        this.createAnimation(scene,sprite,assetObject.key,assetObject.anims.idle.key,0);
        this.createAnimation(scene,sprite,assetObject.key,assetObject.anims.getHit.key,1);
        this.createAnimation(scene,sprite,assetObject.key,assetObject.anims.attack.key,2);
        return sprite;
    }
    createAnimation (scene,spriteInstance,assetKey,animationKey,frameNumber){
        var config = {
            key: animationKey,
            frames: scene.anims.generateFrameNumbers(assetKey,{ frames: [ frameNumber ] }),
            frameRate: 1,
            duration:500,
            yoyo: false,
            repeat: 1
        }
        scene.anims.create(config)
        spriteInstance.anims.load(animationKey);
         
    }

    static loadAssets(scene) {
        scene.load.spritesheet(required_assets.head.key, 
            required_assets.head.file, 
            required_assets.head.config);
        scene.load.image(required_assets.body.key, 
                required_assets.body.file);
    }

}
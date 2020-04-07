 
import TextFactroy from '../shared/TextLabelFactory';
export const ScenKey = "GameWonScene"
export class GameWonScene extends Phaser.Scene {
    
    constructor() {
        super({key: ScenKey});
    }
    
    preload() { 
        
    }

    create(){
        var graphics = this.add.graphics();

        graphics.fillGradientStyle(0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 1);
        graphics.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height);
    
        this.messageText = TextFactroy.create_text(this,this.cameras.main.width/2,this.cameras.main.height/2,'Congratulations!!!!! you win. You saved people from getting sick. Please refresh to restart');
        this.messageText.setScrollFactor(0,0);
         

    }
     
}
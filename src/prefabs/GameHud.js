import { AgentController,AngetController_Events } from "./AgentController";
import TextFactroy from '../shared/TextLabelFactory';

export class GameHud extends Phaser.GameObjects.Container{
  constructor(scene,gameManager){
    super(scene,0,0);
    this.scene.add.existing(this);
    this.backgroundGraphics = scene.add.graphics();
    this.backgroundGraphics.fillStyle(0x757575);
    this.backgroundGraphics.lineStyle(1, 0x62C2CC, 1);
    //this.boundaryGraphics.strokeRect(0,0, radius||100);
    this.backgroundGraphics.fillRect(0, 0, this.scene.cameras.main.width, 50);
    this.backgroundGraphics.setScrollFactor(0,0);
    this.backgroundGraphics.setDepth(1000);
    this.setDepth(100);

    this.goalText = TextFactroy.create_text(this.scene,this.scene.cameras.main.width*0.25,25,'Protect healthy people!');
    this.goalText.setDepth(999);
    this.goalText.setScrollFactor(0,0);

    this.levelSummary = TextFactroy.create_text(this.scene,this.scene.cameras.main.width*0.75,25,'Sick: 0 / People: 0 / Went Home:0');
    this.levelSummary.setDepth(999);
    this.levelSummary.setScrollFactor(0,0);

    
    this.add(this.backgroundGraphics);
    this.add(this.goalText);
    this.add(this.levelSummary);
    

  }

  updateLevelSummaryLabel(healthy,total, peopleWentHome){
    this.levelSummary.setText('Sick: '+healthy+' / People: '+total +'/ Went Home: '+peopleWentHome);
  }
  

  
}
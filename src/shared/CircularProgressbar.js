import Phaser from "phaser";

export class CircularHealthBar { 
   
    constructor (scene , x, y,borderColor)
    {
        this.bar = new Phaser.GameObjects.Graphics(scene);
        this.x = x;
        this.y = y;
        this.value = 100;
        this.p = 360 / 100;
        this.borderColor = borderColor || 0x34b1eb;
        this.draw();
       
        scene.add.existing(this.bar);
    }
  
    decrease (amount)
    {
        this.value -= amount;
  
        if (this.value < 0)
        {
            this.value = 0;
        }
  
        this.draw();
  
        return (this.value === 0);
    }
    setValue(amount){
      this.value = amount;
      this.draw();
      return (this.value === 0);
    }
  
    draw ()
    {
        this.bar.clear();
        let d = Math.floor(this.p * this.value);
         
        this.bar.beginPath();
        
        this.bar.fillStyle(this.borderColor);
        this.bar.lineStyle(20, this.borderColor);   
         
        this.bar.arc(this.x, this.y, 40, Phaser.Math.DegToRad(0), Phaser.Math.DegToRad(d), true, 0.02);
        this.bar.strokePath();
        this.bar.closePath();
  
        
    }
  
  }
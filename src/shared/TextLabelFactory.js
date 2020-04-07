import Phaser from "phaser";


export default class TextFactroy{
     
    static create_text(scene,posX,posY,label){
        
        return scene.make.text({
            x: posX,
            y: posY,
            text: label,
            origin: { x: 0.5, y: 0.5 },
            align:'center',
            color: '#fff',
            stroke: '#004AFF',
            strokeThickness: 3,
            shadow: {
                offsetX: 2,
                offsetY: 2,
                color: '#2E85FF',
                blur: 2,
                stroke: true,
                fill: true
            },
            style: {
                font: 'bold 25px Arial',
                fill: '#2E85FF',
                wordWrap: { width: 300 },
        
            }
        });
    }   
}
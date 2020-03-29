

export class JoystickCameraGameObject extends Phaser.GameObjects.Container {

    constructor(camera,
        radius,
        color,
        strokeWidth
        ) {
            
        
        super(camera.scene, x, y);
        camera.scene.add.existing(this);
        this.camera = camera;
        this.setSize(0,0);
        this.setScrollFactor(0,0);
        this.direction      = new Phaser.Geom.Point(0, 0);
		this.distance       = 0;
		this.pinAngle       = 0;
        this.zero           = new Phaser.Geom.Point(0,0);
         
        this.boundaryGraphics = scene.add.graphics();
        this.boundaryGraphics.fillStyle(color|| 0x62C2CC);
        this.boundaryGraphics.lineStyle(strokeWidth|| 1, color|| 0x62C2CC, 1);
        this.boundaryGraphics.strokeCircle(0,0, radius||100);
        this.boundaryGraphics.strokeCircle(0,0, 1);
         
        this.lineGraphics = this.scene.add.graphics();
        this.lineGraphics.fillStyle(color|| 0x62C2CC);

        this.tempMatrix = new Phaser.GameObjects.Components.TransformMatrix();
        this.tempParentMatrix = new Phaser.GameObjects.Components.TransformMatrix();

        this.add(this.boundaryGraphics);
        this.add(this.lineGraphics);
        
        this.visible = false;
        scene.input.on('dragstart', function (pointer, gameObject) {
            this.setPosition(pointer.x,pointer.y);
            this.visible = true;
        },this);
        
        
        scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            
         
            this.lineGraphics.clear();
            var dragger = this.camera.matrix.applyInverse(dragX,dragY);
            var angle = this.pinAngle = Phaser.Math.RadToDeg(Phaser.Math.Angle.BetweenPoints(this.zero, dragger));
            var distance  = this.distance = Phaser.Geom.Point.GetMagnitude(dragger)
            var direction = new Phaser.Math.Vector2(dragger).normalize();
            this.lineGraphics.lineBetween(0,0,dragger.x,dragger.y);
            console.log(dragger,angle,direction);
            
            
        },this);
    
        scene.input.on('dragend', function (pointer, gameObject) {
           
            this.visible = false;
        },this);
        
    }
    enable() {
        this.disabled = false;
    }
    disable() {
        this.disabled = true;
    }
     
}
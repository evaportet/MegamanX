class bulletPrefab extends Phaser.GameObjects.Sprite
{
    //constructor(_scene,_posX,_posY,_spriteTag='bullet')
    constructor(_scene,_posX,_posY,_spriteTag)
    {
        super(_scene,_posX,_posY,_spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.scene = _scene;
    }

    deActivate()
    {
        this._posY = -100;
        this.setActive(false);
        console.log("te hago caso") //NO ME ESTA HACIENDO CASO BRO
 

    }

    destroyBullet(){
        this.destroy();
    }

    preUpdate()
    {
        if(this.y<=0 || this.y>=config.height)
        {
            this.active = false;
        }
    }
}
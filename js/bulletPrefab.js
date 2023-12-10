class bulletPrefab extends Phaser.GameObjects.Sprite
{
    //constructor(_scene,_posX,_posY,_spriteTag='bullet')
    constructor(_scene,_posX,_posY,_spriteTag)
    {
        super(_scene,_posX,_posY,_spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.scene = _scene;
        this.setColliders();
    }

    setColliders()
   {
       this.scene.physics.add.overlap
       (
           this.scene.enemyWalk,
           this,
           this.scene.enemyWalk.die(),
           null,
           this.scene.enemyWalk 
       );
   }

    deActivate()
    {
        this.setActive(false);
        this.x = -100;

    }

    preUpdate()
    {
        if(this.y<=0 || this.y>=config.height)
        {
            this.active = false;
        }
    }
}
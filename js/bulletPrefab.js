class bulletPrefab extends Phaser.GameObjects.Sprite
{
    //constructor(_scene,_posX,_posY,_spriteTag='bullet')
    constructor(_scene,_posX,_posY,_spriteTag)
    {
        super(_scene,_posX,_posY,_spriteTag);
        _scene.add.existing(this);
        this.nivel = _scene;
        //this.setBulletColliders();
    }

    setBulletColliders()
   {
       this.scene.physics.add.overlap
       (
           this.scene.enemyWalk,
           this,
           this.scene.enemyWalk.hitWalker,
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
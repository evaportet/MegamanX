class enemiesPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_posX,_posY,_spriteTag)
    {
        super(_scene,_posX,_posY,_spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        //this.anims.play(_spriteTag,true);
        this.scene = _scene;
        this.direccion = -1;
        this.body.setVelocityX(gamePrefs.ENEMY_SPEED * this.direccion);
        this.setColliders();
    }

   setColliders()
   {
       this.scene.physics.add.overlap
       (
           this.scene._player,
           this,
           this.scene._player.hitPlayer,
           null,
           this.scene._player, 

           this.scene._bullet,
           this,
           this.die(),
           null,
           this.scene._bullet 
       );

       /* this.scene.physics.add.overlap
       (
           this.scene._bullet,
           this,
           this.die(),
           null,
           this.scene._bullet 
       ); */

       /* this.scene.physics.add.collider
       (
           this,
           this.scene.walls
       ); */
   }
   die(){
    this.scene.cameras.main.shake(500,0.05);
    this.scene.cameras.main.flash(250,255,0,0);    
   }
}
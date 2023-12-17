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
        this.health = 7;
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
       );

        this.scene.physics.add.overlap
       (
           this.scene.bulletPool,
           this,
           this.die,
           null,
           this,  
       ); 
   }

   die(){ 

    if(this.health == 0){
        this.destroy();
        this.health =7;}
    else
    {
        this.health--;
        console.log(this.health);   
    }
        console.log("morisionado") 
       //  this.scene.bulletPool.deActivate; no quiere hacer caso
        
   }
   
}
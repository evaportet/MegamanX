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
           this  
       );  

       this.scene.physics.add.collider
        (
            this,
            this.scene.collision
        ); 
   }


   die(_enemy, _bullet){ 
    //this.scene._bullet.deActivate();
    this.scene.cameras.main.flash(250,0,50,50);           
    _bullet.deActivate();
  //  _bullet.body.reset(gamePrefs.gameWidth/2,gamePrefs.gameHeight/3);
    if(--_enemy.health == 0){
        _enemy.destroy();
        console.log("no morido") 
        _enemy.health = 0;
    }
    else
    {
        //_enemy.health--;
        console.log(_enemy.health);   
    }
        console.log("morisionado") 
        
   }
   
}
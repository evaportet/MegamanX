class player extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_posX,_posY,_spriteTag)
    {
        super(_scene,_posX,_posY,_spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.scene = _scene;
        this._player = this;
        this.setColliders();
        //CURSORES
        //;//////KEY INPUT
        // this.shiftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        //d this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.dashing = false;
        this.cursores = this.scene.input.keyboard.createCursorKeys();
    }
         setColliders()
        {
            this.scene.physics.add.collider
            (
                this,
                this.scene.walls // hay que crear las plataformas
            );        
        } 
    

    create(){
                /////// DISPARO
       /*  this.cursores.space.on
        (
            'down',
            function()
            {
                this.createBullet();
            },
            this
        ); */

        
    }
    
    Sword(_player,_enemy)
    {
       //Una vez arreglado el input, mover funcion aqui
    }

    preUpdate(time,delta)
    {
        if(this.y>=config.height)
        {
            this.active = false;
        }

       //CHECK ON GROUND PLAYER
      // const onGround = this._player.body.onFloor() || this._player.body.touching.down;
        
       //////PLAYER MOVEMENT
       if(this.cursores.left.isDown)
        { //ME MUEVO A LA IZQUIERDA
            this.body.setVelocityX(-gamePrefs.PLAYER_SPEED);
            this.setFlipX(true);
            //this.anims.play('run',true);
        }else
        if(this.cursores.right.isDown)
        { //ME MUEVO A LA DERECHA
            this.body.setVelocityX(gamePrefs.PLAYER_SPEED);
            this.setFlipX(false);
            //this.anims.play('run',true);
        }else
        { //NO ME MUEVO AT ALL
            this.body.setVelocityX(0);
            //this.hero.anims.stop().setFrame(0);
        }    
        
        //SALTO
        if(this.cursores.space.isDown
          //&& this.hero.body.blocked.down
          && this.body.onFloor()
          && Phaser.Input.Keyboard.DownDuration(this.cursores.space,250))
        {
            this.body.setVelocityY(-gamePrefs.PLAYER_JUMP);
        }

      /* if (this.shiftKey.isDown) //&& !this.dashing
       {
           //this.dashing = true;
           //this._player.setVelocityX((_player.flipX ? -1 : 1) * 500); //indicates if the player is facing left or right and multiplies the vel
           //_player.anims.play('dash',true);
           
           //to set the dash back to false
           //this.time.delayedCall(200, () => {
           //    this.dashing = false;
           //});
       }  */

       
  
          super.preUpdate(time,delta);
    }

}
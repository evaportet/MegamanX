class player extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_posX,_posY,_spriteTag)
    {
        super(_scene,_posX,_posY,_spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.scene = _scene;
        this._player = this;
        //this.setColliders();
        //CURSORES
        //;//////KEY INPUT
        this.cursores = this.scene.input.keyboard.createCursorKeys();
       // this.shiftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
       //d this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.dashing = false;
    }
         setColliders()
        {
            this.scene.physics.add.collider
            (
                this.hero,
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
       {
           this._player.body.velocity.x = -gamePrefs.PLAYER_SPEED;
           //console.log('Moving left');
           //_player.anims.play('left',true);
       }else
       if(this.cursores.right.isDown)
       {
           this._player.body.velocity.x = gamePrefs.PLAYER_SPEED;
           //console.log('Moving right');
           //_player.anims.play('right',true);
       }else
       {
           this._player.body.velocity.x = 0;
           //_player.anims.play('idle',true);
       } 

       
       if (this.cursores.up.isDown && this._player.body.onFloor()) {
           this._player.body.velocity.y -= gamePrefs.PLAYER_JUMP;
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
class player extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_posX,_posY,_spriteTag)
    {
        super(_scene,_posX,_posY,_spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.body.collideWorldBounds = true; // a ver las fisicas...
        this.body.setGravityY(300);
        this.health = 5;
        this.cursors = this.scene.input.keyboard.createCursorKeys();
               
            //DISPARO
                this.cursors.space.on
                (
                    'up',
                    function()
                    {
                        this.createBullet();
                    },
                    this
                );
    }
    
    create(){

    }  

    hitPlayer(_player,_enemy)
    {
        if(this.health == 0){
             this.body.reset(gamePrefs.gameWidth/2,gamePrefs.gameHeight*.95);
             this.health =5;
        }
        else
        {
            this.health--;
            this.scene.cameras.main.flash(250,255,0,0);     
        }
    }

    createBullet()
    {
        //Mirar si hay alguna bala reciclable en la pool
        var _bullet = this.scene.bulletPool.getFirst(false);
        
        if(!_bullet)
        {//Que no? La creo
            console.log('creando bala');
            _bullet = new bulletPrefab(this.scene,this.x,this.y,'bullet');
            this.scene.bulletPool.add(_bullet);
        }else
        {//Que si? La reciclo
            console.log('reciclando bala');
            _bullet.body.reset(this.x,this.y);
            _bullet.active = true;
        }
        //Hago cosas con la bala
        //Dar velocidad segun la direccion
        if(this.flipX == true){
            _bullet.body.setVelocityX(-gamePrefs.BULLET_SPEED);
            _bullet.setFlipX(true);
        }
        else{
            _bullet.body.setVelocityX(gamePrefs.BULLET_SPEED);
            _bullet.setFlipX(false);
        }
    }
     

    preUpdate(time,delta)
    {
        if(this.y>=config.height)
        {
            this.active = false;
        }

        //MOVIMIENTO
        if(this.cursors.left.isDown)
        { 
            this.body.setVelocityX(-gamePrefs.PLAYER_SPEED);
            this.setFlipX(true);    
        }
        else if(this.cursors.right.isDown)
        {
            this.body.setVelocityX(gamePrefs.PLAYER_SPEED);
            this.setFlipX(false);
        }else
        { 
            this.body.setVelocityX(0);
        }    
        
        //SALTO
        if(this.cursors.up.isDown && this.body.onFloor() && Phaser.Input.Keyboard.DownDuration(this.cursors.up,250))
        {
            this.body.setVelocityY(-gamePrefs.PLAYER_JUMP);
        }

        
        //console.log(this.body.x)

        super.preUpdate(time,delta);

        // if (this.shiftKey.isDown) //&& !this.dashing
        //{
            //this.dashing = true;
            //this._player.setVelocityX((_player.flipX ? -1 : 1) * 500); //indicates if the player is facing left or right and multiplies the vel
            //_player.anims.play('dash',true);
            
            //to set the dash back to false
            //this.time.delayedCall(200, () => {
            //    this.dashing = false;
            //});
        //}  
    }
}
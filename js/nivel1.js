class nivel1 extends Phaser.Scene
{
    constructor()
    {
        super({key:'nivel1'});
    }
    
    preload()
    { 
        //////PLAYER ASSETS
        this.load.setPath('assets/img');
        this.load.image('backG', 'background_loop.png');
        this.load.image('player','playerIdle.png');
        this.load.spritesheet('walker', 'enemies.png', {frameWidth: 49, frameHeight: 61});
        this.load.spritesheet('flyer', 'flyer.png', {frameWidth: 47, frameHeight: 47});
        this.load.image('bullet', 'bullet.png'); //cargado como img porque la distancia entre frames cambia
    }

    create()
    { 
        //////BACKGROUND
        this.bg_back = this.add.tileSprite(0,0,gamePrefs.STAGE_BG_WIDTH, gamePrefs.STAGE_BG_HEIGHT, 'backG').setOrigin(0);

        //////PLAYER
        this._player = new player(this,gamePrefs.gameWidth/2,gamePrefs.gameHeight*.95,'player');
        //_player = this.physics.add.sprite(config.width/2,config.height*.95,'player');
        this.physics.world.enable(this._player);
        this._player.body.collideWorldBounds = true;
        this._player.body.setGravityY(300);

        ////// ENEMY WALK
        this.enemyWalk = new walkerPrefab(this, 500, 187, 100, 300);

        ////// ENEMY FLY
        this.flyerWalk = new flyerPrefab(this, 700, 250, 100, 300);
        
        this.loadPools();

        //;//////KEY INPUT
        this.cursores = this.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.shiftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        this.dashing = false;


        //////ANIMATION
        this.loadAnimationsWalker();
        this.loadAnimationsFlyer();


        /////// DISPARO
        this.cursores.up.on
        (
            'down',
            function()
            {
                this.createBullet();
            },
            this
        );

        //CAMERA
        this.cameras.main.startFollow(this._player);
        this.cameras.main.setBounds(0,0, gamePrefs.STAGE_BG_WIDTH, 0);
        
    }

    loadPools()
    {
        this.bulletPool = this.physics.add.group();
         //this.enemyPool = this.physics.add.group();

    }

    createBullet()
    {
        //Mirar si hay alguna bala reciclable en la pool
        var _bullet = this.bulletPool.getFirst(false);
        
        if(!_bullet)
        {//Que no? La creo
            console.log('creando bala');
            _bullet = new bulletPrefab(this,this._player.x,this._player.y,'bullet');
            this.bulletPool.add(_bullet);
        }else
        {//Que si? La reciclo
            console.log('reciclando bala');
            _bullet.body.reset(this._player.x,this._player.y);
            _bullet.active = true;
        }
        //Hago cosas con la bala
        //Dar velocidad
        _bullet.body.setVelocityX(gamePrefs.BULLET_SPEED);
        //Ejecuta sonido
        //this.shoot.play();
    }

    loadAnimations()
    {
        this.anims.create(
        {
            key: 'idle',
            frames:this.anims.generateFrameNumbers('player', {start:0, end: 1}),
            frameRate: 10,
            repeat: -1
        });
                
        this.anims.create(
        {
            key: 'run_left',
            frames:this.anims.generateFrameNumbers('player', {start:2, end: 3}),
            frameRate: 10,
            repeat: -1
        });
        
        this.anims.create(
            {
            key: 'run_right',
            frames:this.anims.generateFrameNumbers('player', {start:4, end: 5}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create(
        {
            key: 'jump',
            frames:this.anims.generateFrameNumbers('player', {start:4, end: 5}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create(
        {
            key: 'dash',
            frames:this.anims.generateFrameNumbers('player', {start:4, end: 5}),
            frameRate: 10,
            repeat: -1
        }); 
    };   

    loadAnimationsWalker()
    {
        this.anims.create(
            {
                key: 'walk',
                frames:this.anims.generateFrameNumbers('walker', {start:2, end: 9}),
                frameRate: 10,
                repeat: -1
            });
    }

    loadAnimationsFlyer()
    {
        this.anims.create(
            {
                key: 'walkFlyer',
                frames:this.anims.generateFrameNumbers('flyer', {start:0, end: 2}),
                frameRate: 10,
                repeat: -1
            });
    }

    update()
    { 
        //CHECK ON GROUND PLAYER
        const onGround = this._player.body.onFloor() || this._player.body.touching.down;
        
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

        
        if (this.spaceKey.isDown && onGround) {
            this._player.body.velocity.y -= gamePrefs.PLAYER_JUMP;
        }

        if (this.shiftKey.isDown) //&& !this.dashing
        {
            //this.dashing = true;
            //this._player.setVelocityX((_player.flipX ? -1 : 1) * 500); //indicates if the player is facing left or right and multiplies the vel
            //_player.anims.play('dash',true);
            
            //to set the dash back to false
            //this.time.delayedCall(200, () => {
            //    this.dashing = false;
            //});
        }  
    }
}
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
        this.load.spritesheet('enemyWalk', 'enemies.png', {frameWidth: 51, frameHeight: 61});
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
        this.enemyWalk = this.add.sprite(300,155, 'enemyWalk').setOrigin(0);

        //;//////KEY INPUT
        this.cursores = this.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.shiftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        this.dashing = false;

        //////ANIMATION
        //this.loadAnimations();


        //CAMERA
        this.cameras.main.startFollow(this._player);
        this.cameras.main.setBounds(0,0, gamePrefs.STAGE_BG_WIDTH, 0);
        
    }

    // loadAnimations()
    //     {
    //         this.anims.create(
    //         {
    //             key: 'idle',
    //             frames:this.anims.generateFrameNumbers('player', {start:0, end: 1}),
    //             frameRate: 10,
    //             repeat: -1
    //         });
                
    //         this.anims.create(
    //         {
    //             key: 'run_left',
    //             frames:this.anims.generateFrameNumbers('player', {start:2, end: 3}),
    //             frameRate: 10,
    //             repeat: -1
    //         });
        
    //         this.anims.create(
    //         {
    //             key: 'run_right',
    //             frames:this.anims.generateFrameNumbers('player', {start:4, end: 5}),
    //             frameRate: 10,
    //             repeat: -1
    //         });

    //         this.anims.create(
    //         {
    //             key: 'jump',
    //             frames:this.anims.generateFrameNumbers('player', {start:4, end: 5}),
    //             frameRate: 10,
    //             repeat: -1
    //         });

    //         this.anims.create(
    //         {
    //             key: 'dash',
    //             frames:this.anims.generateFrameNumbers('player', {start:4, end: 5}),
    //             frameRate: 10,
    //             repeat: -1
    //         });    
    //     };   

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
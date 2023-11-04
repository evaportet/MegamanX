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
        this.load.spritesheet('player','naveAnim.png',
        {frameWidth:16,frameHeight:24})
    }

    create()
    { 
        //////PLAYER
        _player = new player(this,posX,posY,'player');
        _player = this.physics.add.sprite(config.width/2,config.height*.95,'player');
        _player.body.collideWorldBounds = true;


        ////////KEY INPUT
        this.cursores = this.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.shiftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        this.dashing = false;

        //////ANIMATION
        this.loadAnimations();
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

        
    }

    

    update()
    { 
        //////PLAYER MOVEMENT
        if(this.cursores.left.isDown)
        {
            _player.body.velocity.x -= gamePrefs.PLAYER_SPEED;
            _player.anims.play('left',true);
        }else
        if(this.cursores.right.isDown)
        {
            _player.body.velocity.x += gamePrefs.PLAYER_SPEED;
            _player.anims.play('right',true);
        }else
        {
            _player.anims.play('idle',true);
        } 

        if(this.spaceKey.isDown)
        {
            _player.setVelocityY(-300);
            _player.anims.play('jump',true);
        }

        if (this.shiftKey.isDown) //&& !this.dashing
        {
            //this.dashing = true;
            _player.setVelocityX((_player.flipX ? -1 : 1) * 500); //indicates if the player is facing left or right and multiplies the vel
            _player.anims.play('dash',true);
            
            //to set the dash back to false
            //this.time.delayedCall(200, () => {
            //    this.dashing = false;
            //});
        }  
    }
}
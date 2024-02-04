class nivel1 extends Phaser.Scene
{
    constructor()
    {
        super({key:'nivel1'});
    }
    
    preload()
    { 
        ////// ASSETS
        this.load.setPath('assets/img');

        this.load.spritesheet('playerIdle', 'idleAnim.png', {frameWidth: 34, frameHeight: 41});
        this.load.spritesheet('playerRun', 'run.png', {frameWidth: 28, frameHeight: 38});
        this.load.spritesheet('playerJump', 'jump.png', {frameWidth: 29, frameHeight: 46});
        
        this.load.spritesheet('walker', 'enemies.png', {frameWidth: 49, frameHeight: 61});

        this.load.spritesheet('flyer', 'flyer.png', {frameWidth: 48, frameHeight: 47});

        this.load.image('bullet', 'bullet.png'); 
        this.load.image('bomb', 'bomb.png');    
        this.load.image('heart', 'heart.png'); 

        this.load.image('firstBoss', 'firstBoss.png');
        
        //UI
        this.load.image('playerHP', 'player_health.png'); 
            //font
        this.load.setPath('assets/fonts/');
        this.load.bitmapFont('font','titleFont.png','titleFont.xml');

        //// MAP
        //img
        this.load.setPath('assets/img');
        this.load.image('backG', 'background_loop.png');
        this.load.image('estesi', 'background_stage.png');

        //map
        this.load.setPath('assets/map');
        this.load.tilemapTiledJSON('tileset', 'ddefinitivo.json');

        //AUDIO
        this.load.setPath('assets/sounds');
        this.load.audio('music','inGame.mp3');
        this.load.audio('bomb','bomb.wav');
        this.load.audio('die','die.wav');
        this.load.audio('enemyDie','enemyDie.wav');
        this.load.audio('hurt','hurt.wav');
        this.load.audio('jump','jump.wav');
        this.load.audio('shoot','shoot.wav');

        
    }

    create()
    { 
        //////BACKGROUND
            this.bg_back = this.add.tileSprite(0,0,gamePrefs.STAGE_BG_WIDTH, gamePrefs.STAGE_BG_HEIGHT, 'backG').setOrigin(0);
            this.bg = this.add.tileSprite(0,0,gamePrefs.STAGE_BG_WIDTH, gamePrefs.STAGE_BG_HEIGHT, 'estesi').setOrigin(0);
            
            
            //////MAP
            this.map = this.add.tilemap('tileset');
            this.tilset = this.map.addTilesetImage('estesi');
            
            // Layers
            this.collision = this.map.createLayer('collision', 'estesi');
        
            //LOAD POOLS
            this.loadPools(); 
 
            //////PLAYER
            this._player = new player(this,110,gamePrefs.gameHeight/2 -20,'playerIdle');   
            // Set collisions
            this.map.setCollisionByExclusion(-1, true, true, 'collision');
            
            ////// ENEMY WALK
            this.enemyWalk = new walkerPrefab(this, 550, 70, 400, 700);
            this.enemyWalk1 = new walkerPrefab(this, 950, 70, 900, 1200);       

            ////// ENEMY FLY
            this.flyerWalk = new flyerPrefab(this, 1250, 20, 850, 1300); 
            this.bombTimer = this.flyerWalk.enemyTimer;
            this.enemyTimer = this.time.addEvent
            (
                {
                    delay: 2000, //ms
                    callback: this.flyerWalk.createBomb,
                    callbackScope:this.flyerWalk,
                    loop:true //repeat: -1
                }
            );


        //////// BOSSS
        this.firstBoss = new firstBoss(this, 2220, gamePrefs.gameHeight/3,1500, 2292, 'firstBoss');

        this.bossDashTimer = this.time.addEvent
        (
            {
                delay: 2000, //ms
                callback: this.firstBoss.dash,
                callbackScope:this.firstBoss,
                loop:true //repeat: -1
            }
        ); 

        this.bossJumpTimer = this.time.addEvent
        (
            {
                delay: 5000, //ms
                callback: this.firstBoss.jump,
                callbackScope:this.firstBoss,
                loop:true //repeat: -1
            }
        );

        //////ANIMATION
            this.loadAnimationsWalker();
            this.loadAnimationsFlyer();
            this.loadAnimations();

        //CAMERA
            this.cameras.main.startFollow(this._player);
            this.cameras.main.setBounds(0,0, gamePrefs.STAGE_BG_WIDTH,  gamePrefs.STAGE_BG_HEIGHT);
        
        //UI
        this.add.sprite(30,25,'playerHP').setScrollFactor(0);
        this.player_health = this._player.health ;
        this.player_health_counter = this.add.bitmapText(65, 28, 'font', this.player_health ,20).setOrigin(0.5).setScrollFactor(0);
    
        this.sound.play('music');
    
    }

    loadPools()
    {
        this.bulletPool = this.physics.add.group();
        this.bombPool = this.physics.add.group();
    }


    update(){
        if(this._player.health == 0 || this._player.y > 500){
            this.sound.play('die');
            this.sound.get('music').stop();
            this.scene.start('gameOver');
        }
        if(this.flyerWalk.health == 0){
            this.time.removeEvent(this.enemyTimer);
        }
        if(this.firstBoss.health == 0){
            gamePrefs.WIN = true;
            this.sound.get('music').stop();
            this.scene.start('gameOver');
        }

        console.log(this._player.y);
    }

    loadAnimations()
    {
        this.anims.create(
            {
                key: 'idleAnim',
                frames:this.anims.generateFrameNumbers('playerIdle', {start:0, end: 2}),
                frameRate: 10,
                repeat: -1
            });
    
            this.anims.create(
            {
                key: 'run',
                frames:this.anims.generateFrameNumbers('playerRun', {start:0, end: 10}),
                frameRate: 10,
                repeat: -1
            });
    
            this.anims.create(
                {
                    key: 'jump',
                    frames:this.anims.generateFrameNumbers('playerJump', {start:0, end: 8}),
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
            }
        );
    }

    loadAnimationsFlyer()
    {
        this.anims.create(
            {
                key: 'walkFlyer',
                frames:this.anims.generateFrameNumbers('flyer', {start:0, end: 2}),
                frameRate: 10,
                repeat: -1
            }
        );

        this.anims.create(
            {
                key: 'attackFlyer',
                frames:this.anims.generateFrameNumbers('flyer', {start:3, end: 7}),
                frameRate: 10,
                repeat: -1
            }
        );
    }
}
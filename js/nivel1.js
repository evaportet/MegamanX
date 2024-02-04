class nivel1 extends Phaser.Scene
{
    constructor()
    {
        super({key:'nivel1'});
    }
    
    preload()
    { 
        ////// PLAYER ASSETS
        this.load.setPath('assets/img');
        this.load.image('player','playerIdle.png');
        this.load.spritesheet('walker', 'enemies.png', {frameWidth: 49, frameHeight: 61});
        this.load.spritesheet('flyer', 'flyer.png', {frameWidth: 48, frameHeight: 47});
        this.load.image('bullet', 'bullet.png'); //cargado como img porque la distancia entre frames cambia
        this.load.image('bomb', 'bomb.png');     
        ////// MAP
        //img
        this.load.setPath('assets/img');
        this.load.image('backG', 'background_loop.png');
        this.load.image('estesi', 'background_stage.png');

        //map
        this.load.setPath('assets/map');
        this.load.tilemapTiledJSON('tileset', 'ddefinitivo.json');
        
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
            // this.back = this.map.createLayer('Back', 'tileset');
            this.collision = this.map.createLayer('collision', 'estesi');
            // this.movingPlatforms = this.map.createLayer('MovingPlatforms', 'tileset');
            // this.front = this.map.createLayer('Front', 'tileset');
            
            //this.map.createLayer('Back', 'tiles');
            //this.walls = this.map.createLayer('Collision', 'tiles');
            //this.map.createLayer('MovingPlatforms', 'tiles');
            //this.map.createLayer('Front', 'tiles');
            
            //LOAD POOLS
            this.loadPools(); 
            //////PLAYER
            this._player = new player(this,gamePrefs.gameWidth/2,gamePrefs.gameHeight/3,'player');   
            // Set collisions
            this.map.setCollisionByExclusion(-1, true, true, 'collision');

        ////// ENEMY WALK
            this.enemyWalk = new walkerPrefab(this, 450, 70, 100, 300);

        ////// ENEMY FLY
            this.flyerWalk = new flyerPrefab(this, 300, 70, 100, 300);     

            this.enemyTimer = this.time.addEvent
        (
            {
                delay: 2000, //ms
                callback: this.flyerWalk.createBomb,
                callbackScope:this.flyerWalk,
                loop:true //repeat: -1
            }
        );

        //////ANIMATION
            this.loadAnimationsWalker();
            this.loadAnimationsFlyer();

        ///// COLLISIONS
        this.setColliders();

        //CAMERA
            this.cameras.main.startFollow(this._player);
            this.cameras.main.setBounds(0,0, gamePrefs.STAGE_BG_WIDTH,  gamePrefs.STAGE_BG_HEIGHT);
        
    }

    loadPools()
    {
        this.bulletPool = this.physics.add.group();
        this.bombPool = this.physics.add.group();
    }

    setColliders(){

        this.physics.add.overlap
        (
            this.bulletPool,
            this.enemyWalk,
            this.killWalker,
            null,
            this
        );

        this.physics.add.overlap
        (
            this.bulletPool,
            this.flyerWalk,
            this.killFly,
            null,
            this
        );
    }

    killWalker(_bullet, _enemy){

        _bullet.deActivate();
        
        _enemy.health--;
        if(_enemy.health>0)
        {
            //invulnerabilidad durante X segundos
        }else if(_enemy.health==0)
        {
            _enemy.die();            
            this.score +=100;
            this.scoreText.text=this.score;
        }
    }

    killFly(){
        this.flyerWalk.die();
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
            }
        );

        this.anims.create(
            {
                key: 'attackFlyer',
                frames:this.anims.generateFrameNumbers('flyer', {start:3, end: 8}),
                frameRate: 10,
                repeat: -1
            }
        );
    }
}
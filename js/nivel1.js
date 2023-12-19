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
        this.load.image('backG', 'background_loop.png');
        this.load.image('player','playerIdle.png');
        this.load.spritesheet('walker', 'enemies.png', {frameWidth: 49, frameHeight: 61});
        this.load.spritesheet('flyer', 'flyer.png', {frameWidth: 48, frameHeight: 47});
        this.load.image('bullet', 'bullet.png'); //cargado como img porque la distancia entre frames cambia

        ////// MAP
        this.load.setPath('assets/map');
        this.load.tilemapTiledJSON('level1','level1.json');

    }

    create()
    { 
        //////BACKGROUND
        this.bg_back = this.add.tileSprite(0,0,gamePrefs.STAGE_BG_WIDTH, gamePrefs.STAGE_BG_HEIGHT, 'backG').setOrigin(0);
        
        //////MAP
        //Cargo el JSON
        this.map = this.add.tilemap('level1');
        //Cargo los tilesets
        //this.map.addTilesetImage('walls_tileset');
        //this.map.addTilesetImage('moss_tileset');
        //Pinto las CAPAS/LAYERS
        //this.walls = this.map.createLayer('layer_walls','walls_tileset');
        this.map.createLayer('layer_back','Back');
        this.map.createLayer('layer_collisions','Collision');
        this.map.createLayer('layer_moving_platforms','MovingPlatforms');
        this.map.createLayer('layer_front','Front');

        //Defino con qué se colisiona en la layer_walls
        this.map.setCollisionBetween(1,11,true,true,'layer_walls');
        //Ponemos -1, ya que phaser lo interpreta como un 0 en el json 
        this.map.setCollisionByExclusion(-1,true,true,'layer_walls'); 

        //////PLAYER
        this._player = new player(this,gamePrefs.gameWidth/2,gamePrefs.gameHeight*.95,'player');   

        ////// ENEMY WALK
        this.enemyWalk = new walkerPrefab(this, 300, 188, 100, 300);

        ////// ENEMY FLY
        this.flyerWalk = new flyerPrefab(this, 300, 100, 100, 300);     

        //LOAD POOLS
        this.loadPools();

        //////ANIMATION
        this.loadAnimationsWalker();
        this.loadAnimationsFlyer();

        //CAMERA
        this.cameras.main.startFollow(this._player);
        this.cameras.main.setBounds(0,0, gamePrefs.STAGE_BG_WIDTH, 0);
        
    }

    loadPools()
    {
        this.bulletPool = this.physics.add.group();

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
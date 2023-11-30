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
        this.load.image('bullet', 'bullet.png'); //cargado como img porque la distancia entre frames cambia
       // this.load.image('platform','platform.png');

        this.load.setPath('tilesets');
        this.load.image('walls_tileset','tileset_walls.png');
        this.load.image('moss_tileset','tileset_moss.png');
        this.load.tilemapTiledJSON('level1','level1.json');
        
    }

    create()
    { 
        //////BACKGROUND
        this.bg_back = this.add.tileSprite(0,0,gamePrefs.STAGE_BG_WIDTH, gamePrefs.STAGE_BG_HEIGHT, 'backG').setOrigin(0);
        //this.platform = this.physics.add.sprite(0,190, 'platform').setOrigin(0);
        //this.platform.body.setAllowGravity(false);
        //this.platform.body.setImmovable(true);
        //Cargo el JSON
        this.map = this.add.tilemap('level1');
        //Cargo los tilesets
        this.map.addTilesetImage('walls_tileset');
        this.map.addTilesetImage('moss_tileset');
        //Pinto las CAPAS/LAYERS
        this.walls = this.map.createLayer('layer_walls','walls_tileset');
        this.map.createLayer('layer_moss_up','moss_tileset');
        this.map.createLayer('layer_moss_left','moss_tileset');
        this.map.createLayer('layer_moss_right','moss_tileset');
        this.map.createLayer('layer_moss_down','moss_tileset');

        //Defino con qué se colisiona en la layer_walls
        //this.map.setCollisionBetween(1,11,true,true,'layer_walls');
        //Ponemos -1, ya que phaser lo interpreta como un 0 en el json 
        this.map.setCollisionByExclusion(-1,true,true,'layer_walls'); 

        //////PLAYER

        this._player = new player(this,gamePrefs.gameWidth/2,gamePrefs.gameHeight/2,'player');
        //_player = this.physics.add.sprite(config.width/2,config.height*.95,'player');
        //this._player.body.collideWorldBounds = true;
        this._player.body.setGravityY(300);

        ////// ENEMY WALK
        this.enemyWalk = new walkerPrefab(this, 300, 187, 100, 300);

        
        this.loadPools();

        //////ANIMATION
        this.loadAnimationsWalker();


        /////// DISPARO
        /*this.cursores.up.on
        (
            'down',
            function()
            {
                this.createBullet();
            },
            this
        );*/

        /////// ESPADA
       // this.cursores.shift.on
        //(
        //    'down',
         //   function()
         //   {
               //this._player.Sword(_player, enemyWalk);

               /* if(enemyWalk.body.touching && this._player.body.touching)
               {
                enemyWalk.destroy();
                   this._player.body.setVelocityY(-gamePrefs.PLAYER_JUMP);
               } *//* else
               {
                   this.hero.health--;
                   this.scene.updateHealth();
                   this.hero.body.reset(65,100);
                   this.scene.cameras.main.shake(500,0.05);
                   this.scene.cameras.main.flash(250,255,0,0);    
               } */
           // },
           // this
       // );

        //CAMERA
        this.cameras.main.startFollow(this._player);
        this.cameras.main.setBounds(0,0, gamePrefs.gameHeight, gamePrefs.gameWidth);
        
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

    update()
    { 
/*         if(this.enemyWalk.body.touching.up && this.hero.body.touching.down)
        {
            _enemy.health--;
            if(_enemy.health<=0)
            {
                _enemy.destroy();
            }
            this.hero.body.setVelocityY(-gamePrefs.HERO_JUMP);
        }else
        {
            this.hero.health--;
            this.scene.updateHealth();
            this.hero.body.reset(65,100);
            this.scene.cameras.main.shake(500,0.05);
            this.scene.cameras.main.flash(250,255,0,0);    
        } */
    } 
}
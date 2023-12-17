class firstBossScene extends Phaser.Scene
{

    constructor(){
        //Crear escena
        super({key: 'firstBossScene'});
        
    }

    preload(){
        //Cargar assets
        this.load.setPath('assets/img');
        this.load.image('back', 'background_stage.png');
        this.load.image('player','playerIdle.png');
        this.load.image('bullet', 'bullet.png');
        //this.load.spritesheet('firstBoss', 'firstBoss.gif', {frameWidth: 95, frameHeight: 56});
        this.load.image('firstBoss', 'firstBoss.png');

        this.bulletPool = this.physics.add.group();
    
    }

    create(){
        this.bg = this.add.tileSprite(-7000,0,gamePrefs.STAGE_BG_WIDTH, gamePrefs.STAGE_BG_HEIGHT,'back').setOrigin(0);
        
        this._player = new player(this,gamePrefs.gameWidth/2,gamePrefs.gameHeight*.95,'player');   
        
        this.firstBoss = new firstBoss(this, gamePrefs.gameWidth/1.2, gamePrefs.gameHeight*.823, 'firstBoss');
       
 
    }

}
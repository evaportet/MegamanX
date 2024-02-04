var gamePrefs=
{
    PLAYER_SPEED: 150,
    PLAYER_JUMP: 400,
    gameWidth:424,
    gameHeight:212,
    STAGE_BG_WIDTH: 7689,
    STAGE_BG_HEIGHT:212,
    BULLET_SPEED:170,
    BOMB_SPEED:50,
    ENEMY_SPEED: 60,
    ENEMY_JUMP: 50,
    WALKER_SPEED: 60,
    FLYER_SPEED: 60
}

var config = 
{
    type: Phaser.AUTO,
    width: gamePrefs.gameWidth,
    height: gamePrefs.gameHeight,
    scene:[ splashScreen, nivel1, firstBossScene,], //array con las escenas
    render:
    {
        pixelArt:true
    },
    scale:
    {
        mode:Phaser.Scale.FIT,
        autoCenter:Phaser.Scale.CENTER_BOTH
    },
    physics:
    {
        default:'arcade',
        arcade:
        {
            gravity:{y:900}, //we will need to change this
            debug: true 
        }
    }
};

var juego = new Phaser.Game(config);
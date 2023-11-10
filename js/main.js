var gamePrefs=
{
    PLAYER_SPEED: 100,
    PLAYER_JUMP: 170,
    gameWidth:424,
    gameHeight:212,
    STAGE_BG_WIDTH: 7689,
    STAGE_BG_HEIGHT:212
}

var config = 
{
    type: Phaser.AUTO,
    width: gamePrefs.gameWidth,
    height: gamePrefs.gameHeight,
    scene:[nivel1], //array con las escenas
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
            gravity:{y:100} //we will need to change this
        }
    }
};

var juego = new Phaser.Game(config);
var gamePrefs=
{
    PLAYER_SPEED: 100,
    PLAYER_JUMP: 170,
}

var config = 
{
    type: Phaser.AUTO,
    width: 800,
    height: 600,
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
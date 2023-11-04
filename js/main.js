var gamePrefs=
{
    PLAYER_SPEED:2,
}

var config = 
{
    type: Phaser.AUTO,
    witdh: 800,
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
            gravity:{y:0} //we will need to change this
        }
    }
};

var juego = new Phaser.Game(config);
class gameOver extends Phaser.Scene{

    constructor()
    { //Crear escena
       super({key:'gameOver'});
      
    }

    preload(){

        this.load.setPath('assets/img');
        this.load.image('splashScreen','splashScreen.png');

        //font
        this.load.setPath('assets/fonts/');
        this.load.bitmapFont('font','titleFont.png','titleFont.xml');

        this.cursors = this.input.keyboard.createCursorKeys();

    }

    create(){
        this.splashScreen = this.add.image(220,70,'splashScreen').setScale(0.5);
        this.splashText = this.add.bitmapText(210, 155, 'font', 'GAME OVER' ,20).setOrigin(0.5).setScrollFactor(0);
        this.tryAgain = this.add.bitmapText(210, 185, 'font', 'Press space to try again' ,13).setOrigin(0.5).setScrollFactor(0);

        if(gamePrefs.WIN){
            this.splashText.text = 'YOU KILLED THE BOSS!'
        }

        this.add.tween
        ({
            targets:this.tryAgain,
            duration:700,
            alpha:0,
            yoyo:false,
            repeat:-1
        });
    }

    update()
    {//actualizar assets
        this.cursors.space.on
        (
            'up',
            function()
            {
                this.scene.start('nivel1');
            },
            this
        );
    }
}
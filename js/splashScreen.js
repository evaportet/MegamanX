class splashScreen extends Phaser.Scene{

    constructor()
    { //Crear escena
       super({key:'splashScreen'});
      
    }

    preload(){

        this.load.setPath('assets/img');
        this.load.image('splashScreen','splashScreen.png');

        //font
        this.load.setPath('assets/fonts/');
        this.load.bitmapFont('font','titleFont.png','titleFont.xml');
        //AUDIO
        this.load.setPath('assets/sounds');
        this.load.audio('splash','splashScreen.mp3');

        this.time.addEvent(
        {
            delay: 2000,
            callback: this.showText,
            callbackScope: this,
            repeat: 0,
        }
        );
            
        this.cursors = this.input.keyboard.createCursorKeys();
    }
    

    create(){
        this.splashScreen = this.add.image(220,70,'splashScreen').setScale(0.5);
        this.sound.play('splash');
    }

    showText(){

        console.log("entro");
        this.splashText = this.add.bitmapText(210, 180, 'font', 'PRESS SPACE' ,20).setOrigin(0.5).setScrollFactor(0);
        this.add.tween
        ({
            targets:this.splashText,
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
                this.sound.get('splash').stop();
                this.scene.start('nivel1');
            },
            this
        );
    }
}
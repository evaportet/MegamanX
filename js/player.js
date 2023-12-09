class player extends Phaser.GameObjects.Sprite
{
    //constructor(_scene,_posX,_posY,_spriteTag='enemy')
    constructor(_scene,_posX,_posY,_spriteTag)
    {
        super(_scene,_posX,_posY,_spriteTag);
        _scene.add.existing(this);
        //this.setOrigin(.5,0);
        //this.anims.play('player_idle');
        //this.health = 2;
    }

    hitPlayer(_player,_enemy)
    {
        if(_enemy.body.touching.up && this._player.body.touching.down)
        {
            _enemy.destroy();
            this._player.body.setVelocityY(-gamePrefs.PLAYER_JUMP);
        }else
        {
            //this._player.health--;
            //this.scene.updateHealth();
            //this._player.body.reset(65,100);
             this.scene.cameras.main.shake(500,0.05);
            this.scene.cameras.main.flash(250,255,0,0);     
        }
    }

    hitSword(){

    }

    preUpdate(time,delta)
    {
        if(this.y>=config.height)
        {
            this.active = false;
        }

        super.preUpdate(time,delta);
    }
}
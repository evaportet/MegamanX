class enemies extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_posX,_posY,_spriteTag = 'enemyWalk')
    {
        super(_scene,_posX,_posY,_spriteTag);
        _scene.add.existing(this);
        
        this.scene = _scene;
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
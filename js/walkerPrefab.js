class walkerPrefab extends enemiesPrefab
{
    constructor(_scene,_posX,_posY,_leftPatrol, _rightPatrol, _spriteTag = 'walker')
    { //instanciar el objeto
        super(_scene,_posX,_posY,_spriteTag);
        this.leftPatrol = _leftPatrol;
        this.rightPatrol = _rightPatrol;
        console.log('wwwwwww')
    }

    preUpdate(time,delta)
    {        
        this.anims.play('walk', true);
        
        if(this.body.position.x < this.leftPatrol || this.body.position.x > this.rightPatrol)
        {
            this.direccion *= -1;
            this.body.setVelocityX(gamePrefs.ENEMY_SPEED * this.direccion);
            this.flipX = !this.flipX;
        }

        super.preUpdate(time, delta);
    }
}
class walkerPrefab extends enemiesPrefab
{
    constructor(_scene,_posX,_posY,_leftPatrol, _rightPatrol, _spriteTag = 'walker')
    { //instanciar el objeto
        super(_scene,_posX,_posY,_spriteTag);
        this.leftPatrol = _leftPatrol;
        this.rightPatrol = _rightPatrol;
        console.log('wwwwwww')
    }

    hitwalker(){
       // this.scene.cameras.main.shake(500,0.05);
        this.scene.cameras.main.flash(250,255,0,0);     
    }

    preUpdate(time,delta)
    {        
        this.anims.play('walk', true);
        
        if(this.body.position.x <= this.leftPatrol || this.body.position.x >= this.rightPatrol)
        {
            this.direccion *= -1;
            this.body.setVelocityX(gamePrefs.WALKER_SPEED * this.direccion);
            this.flipX = !this.flipX;
            //console.log('fueraaaaaa')
        }
        else if(this.body.position.x > this.leftPatrol && this.body.position.x < this.rightPatrol){
            this.body.setVelocityX(gamePrefs.WALKER_SPEED * this.direccion);
            //console.log('dentroooo')
        }

        super.preUpdate(time, delta);
    }
}
class flyerPrefab extends enemiesPrefab
{
    constructor(_scene,_posX,_posY,_leftPatrol, _rightPatrol, _spriteTag = 'flyer')
    { //instanciar el objeto
        super(_scene,_posX,_posY,_spriteTag);
        this.leftPatrol = _leftPatrol;
        this.rightPatrol = _rightPatrol;
        console.log('zzzzzz')
        //this.body.setAllowGravity(false);
        this.isAttacking = false;
    }

    preUpdate(time,delta)
    {        
        this.anims.play('walkFlyer', true);

        
        this.body.allowGravity = false;
        
        if(this.body.position.x <= this.leftPatrol || this.body.position.x >= this.rightPatrol)
        {
            this.direccion *= -1;
            this.body.setVelocityX(gamePrefs.FLYER_SPEED * this.direccion);
            this.flipX = !this.flipX;
        }
        else if(this.body.position.x > this.leftPatrol && this.body.position.x < this.rightPatrol){
            this.body.setVelocityX(gamePrefs.FLYER_SPEED * this.direccion);
           // console.log('dentroooo')
        }
        super.preUpdate(time, delta);

    }

    attack()
    {
        if(this.isAttacking)
        {
            this.anims.play('attackFlyer', true);
        }

        else
            this.anims.play('walkFlyer', true);
    }
}
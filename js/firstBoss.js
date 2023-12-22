class firstBoss extends enemiesPrefab{

    constructor(_scene,_posX,_posY,_leftPatrol, _rightPatrol, _spriteTag = 'firstBoss')
    { //instanciar el objeto
        super(_scene,_posX,_posY,_spriteTag);
        this.leftPatrol = _leftPatrol;
        this.rightPatrol = _rightPatrol;
        this.isAttacking = false;
        this.health = 7;
        //this._scene = scene;
       // console.log(this.leftPatrol)
        this.body.setVelocityX(0);
        
    }
    


    bulletDamage(){

        if(this.health == 0){
            this.body.reset( gamePrefs.gameWidth/1.2, gamePrefs.gameHeight*.823);
            this.health =7;}
        else
        {
            this.health--;
            console.log(this.health);   
        }
    }

    preUpdate(time, delta){

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
        //console.log(this.body.x)

        super.preUpdate(time, delta);
    }
}
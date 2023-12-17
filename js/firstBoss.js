class firstBoss extends enemiesPrefab{

    constructor(_scene,_posX,_posY,_leftPatrol, _rightPatrol, _spriteTag = 'firstBoss')
    { //instanciar el objeto
        super(_scene,_posX,_posY,_spriteTag);
        this.leftPatrol = _leftPatrol;
        this.rightPatrol = _rightPatrol;
        this.isAttacking = false;
        this.health = 7;
        //this._scene = scene;

        this.body.setVelocityX(0);
        
    }


    bulletDamage(boss, bullet){

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
        super.preUpdate(time, delta);
    }
}
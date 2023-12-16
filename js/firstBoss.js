class firstBoss extends enemiesPrefab{

    constructor(_scene,_posX,_posY,_leftPatrol, _rightPatrol, _spriteTag = 'firstBoss')
    { //instanciar el objeto
        super(_scene,_posX,_posY,_spriteTag);
        this.leftPatrol = _leftPatrol;
        this.rightPatrol = _rightPatrol;
        this.isAttacking = false;

        this.body.setVelocityX(0);
    }

    preUpdate(time, delta){



        super.preUpdate(time, delta);
    }
}
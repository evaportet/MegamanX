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
        this.flipX = true;

        this.onDash = false;
        
    }
    
    create(){

        this.dashTimer = this.time.addEvent
        (
            {
                delay: 2000, //ms
                callback: this.dash,
                callbackScope:this,
                loop:true //repeat: -1
            }
        );
    }

    preUpdate(time, delta){


        if(this.body.position.x <= this.leftPatrol || this.body.position.x >= this.rightPatrol)
        {
            this.direccion *= -1;
            this.body.setVelocityX(gamePrefs.ENEMY_SPEED * this.direccion);
            this.flipX = !this.flipX;
           // this.dash();
        }
        else if(this.body.position.x > this.leftPatrol && this.body.position.x < this.rightPatrol){
            //this.body.setVelocityX(gamePrefs.ENEMY_SPEED * this.direccion);
            //console.log('dentroooo')
        }
        //console.log(this.body.x)

        super.preUpdate(time, delta);
    }


    /*this.boss_shootingTimer = this.time.addEvent({delay: 3000, callback: createBulletBrust(), callbackScope: this, repeat: -1});*/
        
    dash(){

        if(this.flipX == true){
            console.log("daaaash");
            this.body.setVelocityX(100 * this.direccion);
        }
        else{
            this.body.setVelocityX(gamePrefs.ENEMY_SPEED * this.direccion);

        }
    }
}
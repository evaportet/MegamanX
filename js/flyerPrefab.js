class flyerPrefab extends enemiesPrefab
{
    constructor(_scene,_posX,_posY,_leftPatrol, _rightPatrol, _spriteTag = 'flyer')
    { //instanciar el objeto
        super(_scene,_posX,_posY,_spriteTag);
        this.leftPatrol = _leftPatrol;
        this.rightPatrol = _rightPatrol;
        console.log('zzzzzz')
        this.health = 2;
        this.isAttacking = false;
        
    }



    createBomb()
    {
        //Mirar si hay alguna bala reciclable en la pool
        var _bomb= this.scene.bombPool.getFirst(false);
        console.log('creeo bombaa');
        if(!_bomb)
        {//Que no? La creo
            console.log('creando bala');
            _bomb = new enemyBombPrefab(this.scene,this.x,this.y,'bomb');
            _bomb.setSize(3,3);
            this.scene.bombPool.add(_bomb);
        }else
        {//Que si? La reciclo
            console.log('reciclando bala');
            _bomb.body.reset(this.x,this.y);
            _bomb.active = true;
        }
        //Hago cosas con la bala
        //Dar velocidad segun la direccion
        if(this.flipX == true){
            _bomb.body.setVelocityX(-gamePrefs.BOMB_SPEED);
            _bomb.setFlipX(true);
        }
        else{
            _bomb.body.setVelocityX(gamePrefs.BOMB_SPEED);
            _bomb.setFlipX(false);
        }
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
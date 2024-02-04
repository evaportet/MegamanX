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
       this.body.collideWorldBounds = true; 
       this.body.setGravityY(50);
        this.flipX = true;

        this.onDash = false;
        this.onJump = false;
        
    }
    
    create(){


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

        //Patrol
        if(this.body.position.x <= this.leftPatrol || this.body.position.x >= this.rightPatrol)
        {
            this.direccion *= -1;
            this.flipX = !this.flipX;
        }

        //Movement
        if(this.onDash){
            console.log("daaaash");
            this.body.setVelocityX(100 * this.direccion);
        }
        else{
            this.body.setVelocityX(gamePrefs.ENEMY_SPEED * this.direccion);
        }

        if(this.onJump && this.body.onFloor()){

            this.body.setVelocityY(-gamePrefs.ENEMY_JUMP);
            this.onJump = false;
        }
        else{

        }

        super.preUpdate(time, delta);
    }
        
    dash(){

        this.onDash = !this.onDash;
    }
    
    jump(){
        this.onJump = !this.onJump;
        console.log("entrando en timer");
    }
}
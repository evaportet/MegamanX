class enemiesPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_posX,_posY,_spriteTag)
    {
        super(_scene,_posX,_posY,_spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        //this.anims.play(_spriteTag,true);
        this.scene = _scene;
        this.direccion = -1;
        this.body.setVelocityX(gamePrefs.ENEMY_SPEED * this.direccion);
        //this.setColliders();
    }

//    setColliders()
//    {
//        this.scene.physics.add.overlap
//        (
//            this.scene.hero,
//            this,
//            this.scene.hero.hitHero,
//            null,
//            this.scene.hero
//        );
//
//        this.scene.physics.add.collider
//        (
//            this,
//            this.scene.walls
//        );
//    }
}
var ThugOfWar = ThugOfWar || {};

ThugOfWar.AIUnit = function(state,x,y, data){
    Phaser.Sprite.call(this, state.game ,x, y, data.asset);

    this.state = state;
    this.game = state.game;
    this.anchor.setTo(0.5);
    this.scale.x *= -1;
    //init physics body
    this.game.physics.arcade.enable(this);

    this.reset(x,y,data);
};

ThugOfWar.AIUnit.prototype = Object.create(Phaser.Sprite.prototype);
ThugOfWar.AIUnit.prototype.constructor = ThugOfWar.AIUnit;

ThugOfWar.AIUnit.prototype.reset = function(x,y,data){
    Phaser.Sprite.prototype.reset.call(this,x,y,data);

    //change to different unit type
    this.loadTexture(data.asset);

    //save properties
    this.health = data.health;
    this.attack = data.attack;
    this.defaultVelocity = data.speed;
    this.body.velocity.x = data.speed;


};

ThugOfWar.AIUnit.prototype.damage = function(amount){
    Phaser.Sprite.prototype.damage.call(this,amount);

    //particle blood effect
    // var bloodEmitter = this.game.add.emitter(this.x, this.y, 50);
    // bloodEmitter.makeParticles('bloodParticle');
    // bloodEmitter.minParticleSpeed.setTo(-100,-100);
    // bloodEmitter.maxParticleSpeed.setTo(100,100);
    // bloodEmitter.gravity = 300;
    // bloodEmitter.start(true,200,null,100);

    //dead unit(corpse)
    // if(this.health <= 0){
    //     var fallenAI = this.game.add.sprite(this.x, this.bottom,deadAI);
    //     fallenAI.anchor.setTo(0.5,1);
    // }

    // if(this.health<=0){
    //
    //     console.log(this.state.aiUnits.length);
    //     console.log('unit died');
    // }
};

// ThugOfWar.AIUnit.prototype.kill = function(){
//     Phaser.Sprite.prototype.kill.call(this);
//     this.state.freeSpace = true;
//     this.state.currAIUnitCount--;
// };
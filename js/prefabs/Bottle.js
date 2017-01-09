var ThugOfWar = ThugOfWar || {};

ThugOfWar.Bottle = function(state,x,y){
    Phaser.Sprite.call(this, state.game ,x, y, 'bottle');

    this.state = state;
    this.game = state.game;

    this.game.physics.arcade.enable(this);
    this.body.velocity.x = 100;
};

ThugOfWar.Bottle.prototype = Object.create(Phaser.Sprite.prototype);
ThugOfWar.Bottle.prototype.constructor = ThugOfWar.Bottle;

ThugOfWar.Bottle.prototype.update= function(){
    //when balls leave the screen kill them
    if(this.x >= this.game.width){
        this.kill();
    }
};
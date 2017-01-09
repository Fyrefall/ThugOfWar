var ThugOfWar = ThugOfWar || {};

ThugOfWar.Beer = function(state,x,y){
    Phaser.Sprite.call(this, state.game ,x, y, 'beer');

    this.state = state;
    this.game = state.game;

    //init physics body
    this.game.physics.arcade.enable(this);

    //this.animations.add('bounce', [0,1], 10, true);
    //this.play('bounce');

    //default values
    this.anchor.setTo(0.5);
    this.scale.setTo(2);
    //collect beers on tap
    this.inputEnabled = true;
    this.input.pixelPerfectClick = true;
    this.events.onInputDown.add(function(){
        this.state.increaseBeer(25);

        console.log('beer added');

        this.kill();
    }, this);

    this.beerExpiryTimer = this.game.time.create(false);

    this.reset(x, y);
};

ThugOfWar.Beer.prototype = Object.create(Phaser.Sprite.prototype);
ThugOfWar.Beer.prototype.constructor = ThugOfWar.Beer;

ThugOfWar.Beer.prototype.scheduleExpiration = function(){
    this.beerExpiryTimer.start();

    //rnd between 4 and 8 seconds
    var expTime = 4+Math.random() * 4;

    this.beerExpiryTimer.add(Phaser.Timer.SECOND * expTime, function(){
        this.kill();
    }, this)
};

ThugOfWar.Beer.prototype.kill = function(){
    this.beerExpiryTimer.stop();

    Phaser.Sprite.prototype.kill.call(this);
};

ThugOfWar.Beer.prototype.reset = function(x, y){
    Phaser.Sprite.prototype.reset.call(this, x, y);

    this.scheduleExpiration();
};
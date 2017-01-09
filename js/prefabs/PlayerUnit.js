var ThugOfWar = ThugOfWar || {};

ThugOfWar.PlayerUnit = function(state,x,y,data, place){
    Phaser.Sprite.call(this, state.game ,x, y, data.unitAsset);

    this.state = state;
    this.game = state.game;
    this.bottles = state.bottles;
    this.beers = state.beers;
    this.pubLeft = state.pubLeft;
    this.anchor.setTo(0.5);

    //init physics body
    this.game.physics.arcade.enable(this);
    this.body.immovable = true;

    //create timers
    this.missileTimer = this.game.time.create(false);//timer for producing bottles(balls for now)
    this.beerProducingTimer = this.game.time.create(false);//timer for producing beer!!

    this.reset(x,y,data, place);
};

ThugOfWar.PlayerUnit.prototype = Object.create(Phaser.Sprite.prototype);
ThugOfWar.PlayerUnit.prototype.constructor = ThugOfWar.PlayerUnit;

ThugOfWar.PlayerUnit.prototype.reset = function(x,y,data, place){
    Phaser.Sprite.prototype.reset.call(this,x,y,data.health);

    //change to different unit type
    this.loadTexture(data.unitAsset);

    //save properties
    //is the unit a missile unit or not?
    this.isMissile = data.isMissile;
    this.isProducingBeer = data.isProducingBeer;
    this.place = place;

    //if unit has missile capabilities then setup missile timer
    if(this.isMissile){
        this.missileTimer.start();
        this.scheduleMissile();
    }

    //if unit has beer producing capabilities then setup beer producing timer
    if(this.isProducingBeer){
        this.beerProducingTimer.start();
        this.scheduleBeerProduction();
    }
};

ThugOfWar.PlayerUnit.prototype.kill = function(){
    Phaser.Sprite.prototype.kill.call(this);

    //stop the timers
    this.missileTimer.stop();
    this.beerProducingTimer.stop();

    //empty place on grid
    this.place.isTaken = false;
};

ThugOfWar.PlayerUnit.prototype.scheduleMissile = function(){
    this.fireMissile();
    //currently units fire once per second
    //later i will add a parameter that might allow different shooting speeds depending on unit
    this.missileTimer.add(Phaser.Timer.SECOND, this.scheduleMissile, this);
};
ThugOfWar.PlayerUnit.prototype.fireMissile = function(){
    //missile height in relation to unit
    var missileY = this.y - 10;//hardcoded

    //look for a dead player unit
    var newElement = this.bottles.getFirstDead();

    //if none, create new player unit
    if(!newElement){
        newElement = new ThugOfWar.Bottle(this, this.x, missileY);
        this.bottles.add(newElement);
    }
    else{
        newElement.reset(this.x,missileY);
    }

    newElement.body.velocity.x  =100;
};
ThugOfWar.PlayerUnit.prototype.scheduleBeerProduction = function(){
    //random beer drop around the unit
    this.produceBeer();

    //beer drops appear every 5 seconds around the unit...atm
    this.beerProducingTimer.add(Phaser.Timer.SECOND*5, this.scheduleBeerProduction, this);
};

ThugOfWar.PlayerUnit.prototype.produceBeer = function(){

    //place beer "near" the keg
    var xRnd = -40 + Math.random() *80;
    var yRnd = -40 + Math.random() *80;
    this.state.createBeer(this.x + xRnd, this.y+ yRnd);
    // console.log('produced 1 beer');

};
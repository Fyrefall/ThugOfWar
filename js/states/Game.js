var ThugOfWar = ThugOfWar || {};

ThugOfWar.Game = {
    init: function(difficulty, currentLevel, funds, modifier, mod_count,health){
        //default: user_input,      1,        300,      1,      0,      1000

        //difficulty
        this.difficultyModifier = difficulty;
        console.log("difficulty:" + this.difficultyModifier);
        //purely for aesthetics the code below
        if(this.difficultyModifier == 1){
            this.difficultyText = "easy";
        }
        else if(this.difficultyModifier == 2){
            this.difficultyText = "medium";
        }
        else{
            this.difficultyText = "hard";
        }

        //level
        this.currentLevel = currentLevel ? currentLevel: 1;
        console.log("level:" + this.currentLevel);

        //fund of beer
        this.numBeers= funds ? this.numBeers: 300;//initial fund of beer or what is passed in

        //modifier or mod_count???????
        this.mod_count = mod_count ? mod_count : 0;
        this.modifier = modifier ? modifier : 1;
        if(mod_count == 3){
            this.modifier++; //modifies health, attack and speed of ai at every 3 level increase
            this.mod_count =0;
            console.log("m:" + this.modifier + "mc:" + this.mod_count);

        }

        //default or carried over pub health
        this.pubHealth = health ? health : 1000;

        //define the gravity
        this.game.physics.arcade.gravity.y = 0;

        //constants
        this.BEER_DROP_DELAY = 5;
        this.BEER_DROP_VELOCITY = 100;
        this.AI_Y_POSITIONS = [240,300,360,420,480];
        this.UNIT_COUNT_BASE = 5;
        this.SPAWN_BASE_TIME_RANGE = [1100,1200,1300,1400,1500,1600,1700,1800,1900,2000];

        this.unitTypes = ['hooligan','bruiser'];//?

    },
    create: function(){
        this.background = this.add.sprite(0, 0, 'background');
        this.pubLeft = this.add.sprite(0, 70, 'pubLeft');

        this.lvl = this.currentLevel;

        //create grid
        this.createPlacementGrid();

        //group all objects...plural
        this.aiUnits = this.add.group();
        this.playerUnits = this.add.group();
        this.bottles = this.add.group();
        this.beers = this.add.group();
        //this.constantObjects = this.add.group();
        //player stats

        //current ai units ---> ai group
        //spawned ai units ---> curraiunits
        //max ai units allowed on the field
        //total ai in wave

        // var pubData = {
        //     asset: 'pubLeft',
        //     health: this.pubHealth,
        //     attack: 35
        // };
        // this.playerPub = new ThugOfWar.PlayerUnit(this, 80, 70, pubData);
        // this.playerUnits.add(this.playerPub);

        //create GUI
        this.createGui();


        //hardcoded pub stats as pubs cannot be spawned and only the health will change.


        //create new beer drop with variable life length
        this.beerGenerationTimer = this.game.time.create(false);
        this.beerGenerationTimer.start();
        this.scheduleBeerGeneration();

        this.aiUnitSpawnOrder = [];

        // this.aiSpawnTimer = this.game.time.create(false);
        // this.aiSpawnTimer.start();

        // this.loadLevel();
        console.log('mod:' + this.modifier + 'modSum:' + this.mod_count);
        this.generateLevel();
        //wound sound
        // this.woundSound = this.add.audio('wound');
    },
    update: function(){
        this.game.physics.arcade.collide(this.playerUnits, this.aiUnits, this.attackPlayer,null,this);//ai hits player
        this.game.physics.arcade.collide(this.bottles, this.aiUnits, this.hitAI,null,this);//player hits ai
        this.game.physics.arcade.collide(this.playerUnits, this.aiUnits, this.hitPub, null, this);
        this.aiUnits.forEachAlive(function(aiUnit){
            //ai needs to keep speed
            aiUnit.body.velocity.x = aiUnit.defaultVelocity;

            //if one of the ai reaches the house the game restarts
            // if(aiUnit.x <= 70){
            //     //ideally i want the game to end when the pub is
            //     // destroyed rather than hitting a point on the map
            //     this.gameOver();
            // }

            if(aiUnit.x <= 70){
                //use this for pub and ai interactions
                this.damagePub(aiUnit);
            }
            if(this.pubHealth<=0){
                this.gameOver();
            }

        }, this);
    },
    damagePub: function (aiUnit) {
        console.log('The pub has been damaged!');
        var damage = aiUnit.attack;
        this.pubHealth -= damage;
        aiUnit.damage(1000);
        if(!aiUnit.alive){
            //this.currAIUnitCount--;
            this.aiKilled++;
        }
        console.log(this.aiKilled);
        var remaining = this.unitCount - this.aiKilled;
        console.log('Killed:' + this.aiKilled  + '||Spawned:' + this.aiUnits.length + '||Remaining:' + remaining);
        this.updateLabels();
        if(this.aiKilled == this.unitCount){
            this.levelComplete();
        }
    },
    gameOver: function(){
        console.log('game over!');
        this.game.state.paused = true;
        this.game.state.start('Game');
    },
    levelComplete: function(){
        console.log('Level Complete');
        this.currentLevel++;
        this.numBeers +=  300 + (30 * this.modifier);
        console.log("Beers: " + this.numBeers);
        this.mod_count++;//this could be removed and just check that modifier is divisible by 3 with no remainder
        this.game.state.start('Game',true, false, this.difficultyModifier, this.currentLevel, this.numBeers, this.modifier, this.mod_count, this.pubHealth);
        //difficulty, currentLevel, funds, modifier, mod_count,health
    },
    attackPlayer: function(player, ai){
        player.damage(ai.attack);
        console.log('ai attacks!!');
    },
    // hitPub: function (pub, ai) {
    //     pub.damage(ai.attack);
    //     console.log("ai hit the pub");
    //     ai.damage(1000);
    // },
    hitAI: function (bottle, aiUnit) {
        bottle.kill();
        //this.woundSound.play();
        aiUnit.damage(20);
        console.log("HP" + aiUnit.health);
        var remaining = this.unitCount - this.aiKilled;
        console.log('Killed:' + this.aiKilled  + '||Spawned:' + this.aiUnits.length + '||Remaining:' + remaining);

        //unit is dead
        if(!aiUnit.alive){
            //this.currAIUnitCount--;
            this.aiKilled++;
        }

        if(this.aiKilled == this.unitCount){
            this.levelComplete();
        }
    },
    // createPub:function () {
    //     newPub = new ThugOfWar.PlayerUnit(this,x,y,data);
    //     this.constantObjects.add(newPub);
    // },
    createPlayerUnit: function(x, y, data, place){
        //look for a dead player unit
        var newElement = this.playerUnits.getFirstDead();

        //if none, create new player unit
        if(!newElement){
            newElement = new ThugOfWar.PlayerUnit(this, x, y, data, place);
            this.playerUnits.add(newElement);
        }
        else{
            newElement.reset(x,y,data, place);
        }

        return newElement;
    },

    createGui: function(){
        var beer = this.add.sprite(10,this.game.height - 20, 'beer');
        beer.anchor.setTo(0.5);
        // beer.scale.setTo(1);//change this if the image is too small or large
        var style = {font:'14px Arial', fill:'#fff'};
        this.beerLabel = this.add.text(22, this.game.height-28,'',style);
        this.levelLabel = this.add.text(this.game.width/2,28,'',style);
        this.difficultyLabel = this.add.text(this.game.width -100, 28, '', style);
        this.levelLabel.anchor.setTo(0.5);


        this.pubHealthLabel = this.add.text(this.game.width/4 - 25, 28, '',style);
        this.updateLabels();

        //get AI Unit Data
        //this.aiStatData = JSON.parse(this.game.cache.getText('aiStatData'));



        //show the buttons
        //get button data
        this.buttonData = JSON.parse(this.game.cache.getText('buttonData'));

        //buttons
        this.buttons = this.add.group();

        var button;
        this.buttonData.forEach(function(element,index){
            button= new Phaser.Button(this.game, 90+ index * 100, this.game.height- 75, element.btnAsset, this.clickButton, this);
            this.buttons.add(button);

            //pass json data to button
            button.playerUnitData = element;
        }, this);

        this.buttonLabel = this.add.text(500,this.game.height - 50, '', style);
    },
    updateLabels: function(){
        this.beerLabel.text = this.numBeers;
        this.levelLabel.text = "Level" + this.currentLevel;
        this.difficultyLabel.text = "Difficulty: " + this.difficultyText;

        this.pubHealthLabel.text = "Pub Health: " + this.pubHealth;
    },
    increaseBeer: function(amount){
        this.numBeers += amount;
        this.updateLabels();
    },
    scheduleBeerGeneration: function(){
        this.beerGenerationTimer.add(Phaser.Timer.SECOND * this.BEER_DROP_DELAY, function(){
            this.generateRandomBeerDrop();
            this.scheduleBeerGeneration();
        }, this);
    },
    generateRandomBeerDrop: function () {
        //position
        var y = -20;
        var x = 80 + 620 * Math.random();

        //beer object
        var beer = this.createBeer(x, y);

        //beer drop velocity
        beer.body.velocity.y = this.BEER_DROP_VELOCITY;
    },
    createBeer: function(x, y){
        //look for a dead element
        var newElement = this.beers.getFirstDead();

        //if none, create new beer
        if(!newElement){
            newElement = new ThugOfWar.Beer(this, x, y);
            this.beers.add(newElement);
        }
        else{
            newElement.reset(x, y);
        }

        return newElement;
    },
    clickButton: function(button){
        console.log(button.playerUnitData.btnCost);
        if(!button.selected){//first time clicking the button
            this.clearButtonSelection();
            this.buttonLabel.text = "Cost: " + button.playerUnitData.btnCost;


            //check price against bank
            if(this.numBeers >= button.playerUnitData.btnCost){
                button.selected = true;
                button.alpha = 0.5;

                //keep track of the button selected
                this.currentSelection = button.playerUnitData;
            }
            else{
                this.buttonLabel.text += " - Need more beer!";
            }
        }
        else{//been clicked before
            this.clearButtonSelection();
        }
    },
    //clears all other buttons
    clearButtonSelection: function(){
        this.buttonLabel.text = "";
        this.currentSelection = null;

        this.buttons.forEach(function(button){
            button.alpha = 1;
            button.selected = false;
        },this);
    },
    createPlacementGrid: function () {
        this.places = this.add.group();

        //rectangle for one place
        var area = this.add.bitmapData(50,60);
        area.ctx.fillStyle = '#000000';
        area.ctx.fillRect(0,0,50,60);

        var j, place, alpha;
        var dark = false;

        //can it just be i; and j;
        for(var i = 0; i< 5; i++){//changed from 10 to 5
            for(j = 0; j<5; j++){
                //create place
                place = new Phaser.Sprite(this.game,100 + i * 50,210 + j * 60, area);
                this.places.add(place);

                //alternate transparency so that it looks like a chess board
                alpha = dark ? 0.2 : 0.1;
                dark = !dark;

                place.alpha = alpha;

                //if place is available and button selected, create unit in place
                place.inputEnabled = true;
                place.events.onInputDown.add(this.placeUnit, this);
            }
        }
    },
    placeUnit: function(place){
        //console.log('check if place available and create unit')
        if(!place.isTaken && this.currentSelection){
            place.isTaken = true;

            var unit = this.createPlayerUnit(place.x + place.width/2, place.y + place.height/2, this.currentSelection, place);

            //subtract cost of button for unit from total beers
            //pos + neg = neg
            this.increaseBeer(-this.currentSelection.btnCost);

            this.clearButtonSelection();
        }
    },
    // loadLevel: function (){
    //     this.levelData = JSON.parse(this.game.cache.getText(this.lvl));
    //     console.log("moo");
    //     //keep track of ai unit index
    //     this.currentAIIndex = 0;
    //
    //     //number of aikilled
    //     this.aiKilled = 0;
    //     this.levelData.units.length;
    //
    //     this.scheduleNextAI();
    // },
    generateLevel: function () {
        var mod = this.difficultyModifier * this.modifier;
        this.unitCount = (this.UNIT_COUNT_BASE * mod);//multiples of 3
        //this will go in schedule ai this.SPAWN_BASE_TIME_RANGE = [0.5,1,1.5,2,2.5,3,3.5,4,4.5,5];
        this.currentAIIndex = 0;
        //when the units spawn, select a random time from the spawn base and multiply my random and (modifier /1 ) so should be 0 or just higher
        //use the base speed of the unit when selected
        for(var i = 0; i < this.unitCount; i++){
            var unitType = this.unitTypes[Math.floor(Math.random()* this.unitTypes.length)];//get a random unit type available to the ai
            this.aiUnitSpawnOrder.push(unitType);
        }

        //initialise ai killed variable
        this.aiKilled = 0;
        //maybe check to see if there is another thing in array before sending to it
        this.scheduleNextAI();
    },
    scheduleNextAI: function () {
        console.log(this.aiUnitSpawnOrder);
        var nextAI = this.aiUnitSpawnOrder[this.currentAIIndex];//gets next unit in list
        console.log("SNAI " + nextAI);

        this.aiStatData = JSON.parse(this.game.cache.getText("aiStatData"));

        if(nextAI){
            if(nextAI == "hooligan"){
                var unitTypeData = this.aiStatData.hooligan[0];
            }
            else{
                unitTypeData = this.aiStatData.bruiser[0];
            }
            console.log(unitTypeData);
            var spawnModifier = this.SPAWN_BASE_TIME_RANGE[Math.floor(Math.random()* this.SPAWN_BASE_TIME_RANGE.length)];
            console.log("SM:" + spawnModifier);
            this.aiSpawnTimer = this.game.time.events.add(spawnModifier,function(){

                var rndY = this.AI_Y_POSITIONS[Math.floor(Math.random() * this.AI_Y_POSITIONS.length)];
                console.log("YPos: " + rndY/120);

                //createUnit
                this.createAIUnit(this.game.width-20, rndY, unitTypeData);

                this.currentAIIndex++;
                console.log('Check asset: ' + nextAI);
                this.scheduleNextAI();


            },this);
        }
        else{
            console.log("=========END========");
        }
    },
    createAIUnit: function(x, y, data){
        console.log("Unit: x, y, data" + x + ", " + y + ", " + data);


        //look for a dead ai unit
        var newUnit = this.aiUnits.getFirstDead();

        //if none, create new ai unit
        if(!newUnit){
            newUnit = new ThugOfWar.AIUnit(this, x, y, data);

            this.aiUnits.add(newUnit);
            //this.currAIUnitCount++;
        }
        else{
            newUnit.reset(x, y, data);
        }

        return newUnit;
    }
};
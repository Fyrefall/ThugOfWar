ThugOfWar.Game = function(game){
    this.totalAIUnits = 15;
    this.totalPlayerUnits = 15;
    this.PlayerGroup;
    this.AIGroup;
};

//var currAICount = 0;
var currPlayerCount = 0;

ThugOfWar.Game.prototype = {
    create: function(){

        this.PlayerGroup = this.add.group();
        this.PlayerGroup.enableBody = true;



        this.buildWorld();


    },

    buildWorld: function(){
        this.add.image(0,0,'gameBG');
        this.add.image(0,70,'pubLeft');
        this.add.image(650,70,'pubRight');

        this.add.button(25,380,'laneButton3');//just one add button now
        //need to add two arrows: up and down on the right hand side



        // this.add.button(200,400,'laneButton1');
        this.spawnAI();
    },

    buildMenu: function(){
        game.paused = true;
    },

    spawnAI: function(){
        this.AIGroup = this.add.group();
        this.AIGroup.enableBody = true;
        var lanesX = [600,640,680];
        var lanesY = [270,370,480];
        var units = ['thug','bruiser','builder','psycho','sneak'];
        //var buildTime = 1000;
        //var unitSpeed?
        if(this.totalAIUnits > currAICount ){
            var lane = this.rnd.integerInRange(0,2);
            // var unit = this.rnd.integerInRange(0,2);
            // var u = this.AIGroup.create(lanesX[lane],lanesY[lane],'thug');
            var u = new Thug()
            var u = this.AIGroup.create(lanesX[lane],lanesY[lane],Thug.prototype = Object.create(Unit.prototype));
            //.create(lanesX[lane],lanesY[lane],units[unit])//this shouldn't be uncommented

            u.body.collideWorldBounds = true;//hit the side of the world
            u.anchor.setTo(0.5,0.5);//anchor middle
            u.scale.x *= -1;//flips sprite to face the correct way
            this.add.existing(u);
            // this.assignAIMovement(u);
            //currAICount ++;
            // console.log('Created: '+units[unit] + ' UnitCount:' + currAICount);
            console.log('X:' + lanesX[lane] + 'Y:' + lanesY[lane]);
        }
    },

    spawnPlayerUnit: function (unit,lane) {
        var lanesX = [600,620,640,660,680];
        var lanesY = [270,315,370,425,480];
        var units = ['thug','bruiser','builder','psycho','sneak'];
        var buildTime = 1000;

        if(this.totalPlayerUnits > currPlayerCount){
            var u = this.PlayerGroup.create(lanesX[lane],lanesY[lane],units[unit]);
            u.body.collideWorldBounds = true;
            u.anchor.setTo(0.5,0.5);

            currPlayerCount++;
            console.log('Created: '+units[unit] + ' UnitCount:' + currAICount);
            console.log('X:' + lanesX[lane] + 'Y:' + lanesY[lane]);
        }
    },

    update: function(){
        //this.spawnAI();
        //this.AIGroup.forEachAlive(function(u){u.body.x -= 0.5;});
        //check if max ai count is full or not
    }
}


var ThugOfWar = ThugOfWar || {};
var e = 1, m = 2, h = 3;
ThugOfWar.Difficulty = {
    preload: function () {


    },

    create: function () {

        this.background = this.add.sprite(0, 0, 'background');


        this.easyButton = this.add.button(this.game.world.centerX - 200, 400, 'easyButton', this.easyGame,this,2,1,0);
        this.mediumButton = this.add.button(this.game.world.centerX - 50, 400, 'mediumButton', this.mediumGame,this,2,1,0);
        this.hardButton = this.add.button(this.game.world.centerX  + 100, 400, 'hardButton', this.hardGame,this,2,1,0);
    },
    easyGame: function () {
        this.state.start('Game',true, false,1);
    },
    mediumGame: function () {
        this.state.start('Game',true, false,2);
        console.log(m);
    },
    hardGame: function () {
        this.state.start('Game',true, false, 3);
    }
}

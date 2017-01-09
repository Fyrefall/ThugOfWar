var ThugOfWar = ThugOfWar || {};

ThugOfWar.Menu = {
    preload: function () {

    },
    create: function () {
        this.background = this.add.sprite(0, 0, 'background');
        //music?
        this.difficultyButton = this.add.button(this.game.world.centerX - 95, 400, 'difficultyButton', this.chooseDifficulty,this,2,1,0)
        // this.settingsButton = this.add.button(this.game.world.centerX - 95, 400, 'difficultyButton', this.settings,this,2,1,0)
    },
    chooseDifficulty: function () {
        this.state.start('Difficulty');
    }
    // settings: function () {
    //     this.state.start('Settings');
    // }
}
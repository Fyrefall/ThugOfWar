var ThugOfWar = ThugOfWar || {};

ThugOfWar.Preloader = {
    preload: function(){
        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
        this.preloadBar.anchor.setTo(0.5);
        this.preloadBar.scale.setTo(3);

        this.load.setPreloadSprite(this.preloadBar);

        var IMG_DIR = "assets/images/";
        var BTN_DIR = IMG_DIR + "buttons/";
        var SPR_DIR = IMG_DIR + "sprites/";
        var DAT_DIR = "assets/data/";

        //load game assets
        this.load.image('background',IMG_DIR + 'decoBackground1.png');
        this.load.image('pubLeft',IMG_DIR + 'PubLeft.png');

        //buttons
        this.load.image('thugButton',BTN_DIR        + 'thugButton.png');
        this.load.image('easyButton',BTN_DIR        + 'easyButton.png');
        this.load.image('mediumButton',BTN_DIR      + 'mediumButton.png');
        this.load.image('hardButton',BTN_DIR        + 'hardButton.png');
        this.load.image('difficultyButton',BTN_DIR  + 'difficultyButton.png');
        this.load.image('settingsButton',BTN_DIR    + 'settingsButton.png');

        //units
        this.load.image('bruiser',SPR_DIR   + 'bruiser.png');
        this.load.image('thug',SPR_DIR      + 'thug.png');
        this.load.image('hooligan',SPR_DIR  + 'hooligan.png');
        this.load.image('bottle',SPR_DIR    + 'bottle.png');
        this.load.image('beer',SPR_DIR      + 'Beer.png');
        this.load.image('keg',SPR_DIR       + 'Keg.png');
        this.load.image('repair',SPR_DIR    + 'Repair.png')


        //audio files (mp3 and 0gg files)

        //load game data
        this.load.text('buttonData',DAT_DIR + 'buttons.json');
        this.load.text('aiStatData',DAT_DIR + 'aiUnitStats.json');
        this.load.text('level1',DAT_DIR + 'level1.json');
        this.load.text('level2',DAT_DIR + 'level2.json');
        this.load.text('level3',DAT_DIR + 'level3.json');
    },
    create: function(){
        this.state.start('Menu');
        // this.state.start('Game');
    }
};
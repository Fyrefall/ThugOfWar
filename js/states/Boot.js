var ThugOfWar = ThugOfWar || {};

ThugOfWar.Boot = {
    init: function(){
        //loading screen will have white background
        this.game.stage.backgroundColor = '#fff';

        //scaling options
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        //center the game horizontally
        this.scale.pageAlignHorizontally=true;
        this.scale.pageAlignVertically = true;

        //physics system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        //pause game when out of window
        this.stage.disableVisibilityChange = false;

        //minimum width and height
        this.scale.minWidth = 270;
        this.scale.minHeight= 480;

        //force the game to horizontal
        this.stage.forceLandscape = true;
    },

    preload: function(){
        //assets used in the loading screen
        this.load.image('preloadbar','assets/images/preloader-bar.png');
    },

    create: function(){
        this.state.start('Preloader');
    }
};

// ThugOfWar.Boot.prototype = {
//     preload: function(){
//         this.load.image('tempLoading', 'assets/images/crappyLoading.png');
//
//         this.load.image('gameBG','assets/images/crappyTitleScreen.png');//as said this will eventually be the title screen not the BG
//     },
//
//     create: function(){
//         this.input.maxPointers = 1;
//         this.stage.disableVisibilityChange = false; //pause game when out of window
//         //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
//         this.scale.minWidth= 270;
//         this.scale.minHeight = 480;
//         this.scale.pageAlignHorizontally = true;
//         this.scale.pageAlignVertically = true;
//         this.stage.forceLandscape = true;
//         //this.scale.setScreenSize(true);
//
//         this.input.addPointer();
//         this.stage.backgroundColor = '#FFFFFF';
//
//         this.state.start('Preloader');
//     }
// }

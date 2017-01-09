var ThugOfWar = ThugOfWar || {};

ThugOfWar.game= new Phaser.Game(800,600,Phaser.AUTO);

ThugOfWar.game.state.add('Boot', ThugOfWar.Boot);
ThugOfWar.game.state.add('Preloader', ThugOfWar.Preloader);
ThugOfWar.game.state.add('Menu', ThugOfWar.Menu);
ThugOfWar.game.state.add('Difficulty', ThugOfWar.Difficulty);
ThugOfWar.game.state.add('Game', ThugOfWar.Game);

ThugOfWar.game.state.start('Boot');
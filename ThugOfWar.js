var game;
//initialise variables
var layerBackground;
var sprite1, sprite2, sprite3, sprite4, sprite5, leftPub, rightPub;
var leftKey;
var rightKey;
var button1, button2, button3, button4, button5;
var spriteTests, spriteTest;
var playerSprites = [];

function main() {
    game = new Phaser.Game(800, 600, Phaser.Canvas, 'Thug of War', {
        preload: onPreload,
        create: onCreate,
        //render: onRender, 
        update: onUpdate
    });
}

function onPreload(){
    //load assets
    game.load.image('background','assets/sprites/decoBackground1.png');
    game.load.image('leftPub','assets/sprites/PubLeft.png');
    game.load.image('rightPub','assets/sprites/PubRight.png');
    game.load.image('sprite1','assets/sprites/FullSprite.png');
    game.load.image('input_addUnit','assets/buttons/plusButton.png');
    game.load.image('spriteTest','assets/sprites/FullSprite.png');
}

function onCreate() {
    var thug = new Thug('t1',100,20,15,1);
    // thug.spawn();
    //load background
    layerBackground = game.add.tileSprite(0,0,800,600,'background');
    layerBackground.fixedToCamera = true;

    //generate pubs
    leftPub = game.add.sprite(0,70,'leftPub');
    rightPub = game.add.sprite(650,70,'rightPub');

    //generate sprites
    // sprite1 = game.add.sprite(100,200,'sprite1');
    // sprite2 = game.add.sprite(80,250,'sprite1');
    // sprite3 = game.add.sprite(60,300,'sprite1');
    // sprite4 = game.add.sprite(40,350,'sprite1');
    // sprite5 = game.add.sprite(20,400,'sprite1');

    //buttons
    button1 = game.add.button(game.world.centerX -380,220,'input_addUnit', createUnit, this, 2,1,0);
    button2 = game.add.button(game.world.centerX -380,220,'input_addUnit', createUnit, this, 2,1,0);
    button3 = game.add.button(game.world.centerX -380,220,'input_addUnit', createUnit, this, 2,1,0);
    button4 = game.add.button(game.world.centerX -380,220,'input_addUnit', createUnit, this, 2,1,0);
    button5 = game.add.button(game.world.centerX -380,220,'input_addUnit', createUnit, this, 2,1,0);


    button1.onInputOver.add(over,this);
    button1.onInputOut.add(out,this);
    button1.onInputUp.add(up,this);

    //initialise controls
    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);




    //###################TEST######################
    //sprite group
    spriteTests = game.add.group();
    spriteTests.enableBody = true;
    spriteTests.physicsBodyType = Phaser.Physics.ARCADE;

    //create sprite
    //spriteTest = spriteTests.create(100,200,'sprite1');

    //spriteTest.body.collideWorldBounds=true; //limits sprite to world borders
    //###################END#######################
}

function onRender(){
    // game.debug.geom(floor,'#0fffff');
}

function onUpdate(){
    //This was to test moving a single sprite
    // if(leftKey.isDown){
    //     sprite1.x--;
    // }
    // if(rightKey.isDown){
    //     sprite1.x+=5;
    // }
    //spriteTest.x += 1;

    //defining sprite x speeds
    //sprite1.x +=1;
    // sprite2.x +=1;
    // sprite3.x +=1;
    // sprite4.x +=1;
    // sprite5.x +=1;
}


//button functions - needs to go in separate file?
function up(){
    console.log('button up',arguments);
}

function over(){
    console.log('button over');
}

function out(){
    console.log('button out');
}

function actionOnClick(){
    spriteTest = spriteTests.create(100,200,'spriteTest');
    // spriteTest.x += 1;
}

function createUnit(){

    playerSprites.push[ Thug.spawn];
    var x = playerSprites.length;
    spriteTest = spriteTests.create(100,200,'sprite'+x);
    //spriteTest = spriteTests.create(100,200,'spriteTest');
}






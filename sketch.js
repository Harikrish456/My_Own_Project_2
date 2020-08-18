var bgImg;
var planeImg;
var player;
var bg;
var obstacleGroup;
var obstacleGroup2;
var gameState = 0;
var buildingImg;
var upsideBuildingImg;
var reset;
var score = 0;
var attempts = 0;

function preload(){
    bgImg = loadImage("images/background.jpg");
    planeImg = loadImage("images/plane.png");  
    buildingImg = loadImage("images/building.png");
    upsideBuildingImg = loadImage("images/upsideBuilding.png");
}

function setup(){
    createCanvas(400,400);

    bg = createSprite(200,200,400,400);
    bg.addImage(bgImg);
    bg.x = bg.width/2;
    bg.velocityX = -3;

    obstacleGroup = createGroup();
    obstacleGroup2 = createGroup();

    player = createSprite(100,200,40,40);
    player.addImage(planeImg);
    player.velocityY = 2;
    player.scale = 0.19;
    player.setCollider("circle", player.x, player.y,50);

    reset = createSprite(350,50,30,10);
    reset.visible = false;
}

function draw(){
    background("white");


    if(gameState === 0){
    if(bg.x < 0){
    bg.x = bg.width/2;
    }

    if(keyDown("space")){
    player.velocityY = -9;
    }

    player.velocityY = player.velocityY + 1;

    addObstacles();
    addObstacles2();

    if(player.isTouching(obstacleGroup)||player.isTouching(obstacleGroup2)){
        gameState = 1;
    }

    if(frameCount % 60 === 0){
        score = score + 1;
    }

    if(player.y > 410 ||player.y < 0){
        gameState = 1;
    }

    } 

    drawSprites();
    stroke("blue");
    noFill();
    text("SCORE: " + score,50,50);
    stroke("green");
    noFill();
    text("ATTEMPTS: " + attempts, 314, 362);

    if(gameState === 1){
        reset.visible = true;

        if(mousePressedOver(reset)){
            gameState = 0;
            reset.visible = false;   
            score = 0;   
            attempts = attempts + 1;
        }
    

        player.destroy();
        obstacleGroup.destroyEach();
        obstacleGroup2.destroyEach();
        bg.velocityX = 0;

        textSize(30);
        stroke("red");
        fill("red");
        text("Game Over",130,200);
 
        textSize(13);
        stroke("black");
        fill("yelloe");
        text("Reset",336,63);
    }

}

function addObstacles(){
    if(World.frameCount % 60 === 0 && gameState === 0){
    var obstacle = createSprite(300,random(350,380),70,180);
    obstacle.velocityX = -3;
    obstacle.addImage(buildingImg);
    obstacle.scale = 0.35;
    obstacleGroup.add(obstacle);
    }
  }
  
  function addObstacles2(){
    if(World.frameCount % 60 === 0 && gameState === 0){
    var obstacle2 = createSprite(300,random(0,40),70,180);
    obstacle2.velocityX = -3;
    obstacle2.addImage(upsideBuildingImg);
    obstacle2.scale = 0.35;
    obstacleGroup2.add(obstacle2);
    }
  }
  


    

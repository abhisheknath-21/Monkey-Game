var PLAY=1;
var END=0;
var gameState = PLAY;
var monkey , monkey_running
var ground;
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var survivalTime = 0;


function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(600,300);
  
  monkey=createSprite(50, 250, 10, 10);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  ground=createSprite(300, 290, 1200, 20);
  ground.velocityX = -5;
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
}

function draw() {
  background("white");
  
  monkey.collide(ground);
 
  if(gameState === PLAY){
    
    food();
    obstacle();
    
    if(ground.x < 0){
    ground.x = ground.width/2;
    }
    
    if(keyDown("space")){
    monkey.velocityY= -15;
    }
    
    monkey.velocityY = monkey.velocityY + 0.8;
    
    stroke("black");
    textSize(20);
    fill("Red")
    text("Survival Time: " + survivalTime, 250, 20 );
    survivalTime=survivalTime+Math.round(getFrameRate()/60);
  }
  
    if(gameState === END){
    
    bananaGroup.setLifetimeEach = (-1);
    obstacleGroup.setLifetimeEach = (-1);
    
    bananaGroup.setVelocityXEach = (0);
    obstacleGroup.setVelocityXEach = (0);
    }
  
   drawSprites();
}

function food(){
  
  if(frameCount % 80 === 0){
    banana = createSprite(700, 200, 10, 10);
    banana.y = Math.round(random(120, 200));
    banana.addImage("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -5;
    banana.lifetime=140;
    bananaGroup.add(banana);
  }
}

function obstacle(){
  
  if(frameCount % 300 === 0){
    var obstacle = createSprite(700, 260, 10, 10);
    obstacle.addImage("obstacle", obstacleImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -5;
    obstacle.lifetime=140;
    obstacleGroup.add(obstacle);
  }
}

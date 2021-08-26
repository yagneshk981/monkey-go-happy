
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var backgroundImage;
var score;
var survivalTime=0;


function preload(){
  
  backgroundImage = loadImage("jungle.jpg");
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

 
}



function setup() {
  createCanvas (700,450)
  
  background = createSprite(0,0,700,450);
  background.addImage(backgroundImage);
  background.scale = 1.5;
  
  monkey = createSprite (100,400, 20, 20)
  monkey.addAnimation("monkey_running", monkey_running);
  monkey.scale = 0.2;
  
  //obstacle = createSprite(300,500,20,20)
 
  
  ground = createSprite(100,420,700,20);
  ground.x = ground.width /2;
  ground.visible = false;
  
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
  
  score = 0;
  
  
}


function draw() {

   background.velocityX = -3; 

    if (background.x < 0){
      background.x = background.width/2;
    }
  
    if (obstacleGroup.isTouching(monkey)) {
      monkey.scale = 0.2;
    }
  
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
    spawnObstacles();
    spawnBanana();
  
   if(keyDown("space") && monkey.y >= 250) {
        monkey.velocityY = -11;
    }
  
  
      if (bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
      score=score+2;
    }
  
    switch(score) {
      case 10: monkey.scale = 0.22;
                break;
     case 20: monkey.scale = 0.24;
                break;
    case 30: monkey.scale = 0.26;
                break;
    case 40: monkey.scale = 0.28;
                break;
    }
  
  monkey.velocityY = monkey.velocityY + 0.8

  
  
   monkey.collide(ground); 
  
  drawSprites();
  
  fill("white")
 text("Score: "+ score, 500,50);
  
  fill("black")
  textSize(20)
}



function spawnObstacles(){
 if (frameCount % 150 === 0){
   var obstacle = createSprite(500,370,20,20);
   obstacle.addImage(obstacleImage);
   obstacle.velocityX = -6;
   
    //generate random obstacles
    var rand = Math.round(random(1));
    switch(rand) {
      case 1: obstacle.addImage(obstacleImage);
              break;
      default: break;
    }
   
     obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.25;
    obstacle.lifetime = 500;
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
 }
  
  
  
}

function spawnBanana() {
  //write code here to spawn the clouds
  if (frameCount % 160 === 0) {
    banana = createSprite(600,100,40,10);
    banana.y = Math.round(random(100,200));
    banana.addImage(bananaImage);
    banana.scale = 0.2;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 500;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //adding cloud to the group
   bananaGroup.add(banana);
    }
}


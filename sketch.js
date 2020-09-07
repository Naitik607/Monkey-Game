
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivalTime
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400)
 
       
  
  monkey=createSprite(100,315,20,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1

ground=createSprite(400,350,800,10)
  ground.velocityX = -4;
  ground.x = ground.width/2
  
   
  
}


function draw() {
background("white")
  
   var survivalTime = 0
  stroke("black")
  textSize(20)
  fill("black")
  survivalTime=Math.ceil(frameCount/frameRate())
  text("survivalTime:  " + survivalTime,100,50)
  
 if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  
    foodGroup = createGroup()
    obstacleGroup = createGroup()

    function obstacle(){
if(frameCount % 300===0){
 obstacle=createSprite(200,317,25,25) ;
  obstacle.addImage(obstacleImage)
  obstacle.velocityX = -4;
  obstacle.lifeTime = 100;
  obstacle.scale = 0.15;
  
  obstacleGroup.add(obstacle)
}
  }
  
  if(keyDown("space")&& monkey.y>=161){
    monkey.velocityY = -10
    
   }
  monkey.velocityY = monkey.velocityY+8
  
  monkey.collide(ground)
  
  if(foodGroup.isTouching(monkey)){
    foodGroup.destroyEach()
  }
  
  if(obstacleGroup.isTouching(monkey)){
  monkey.destroy()
    foodGroup.destroyEach()
    obstacleGroup.destroyEach()
    survivalTime = 0;
  }

 
 obstacle()
 food() 
  drawSprites()
  
}

function food(){
  if(frameCount % 80===0){
    banana=createSprite(200,150,25,25)
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.velocityX = -3;
    banana.lifetime=200;
    banana.scale = 0.1;
    
    food.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    foodGroup.add(banana)
  }
}



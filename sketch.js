var monkey, monkey_running;
var food, bananaImage, obstacle, obstacleImage;
var FoodGroup, ObstacleGroup;
var score = 0;
var background_img, background;
var ground
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var counter = 0;

function preload() {

  monkey_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  background_img = loadImage("jungle.jpg");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");

}

function setup() {
  createCanvas(1200, 400);
  //createCanvas(displayWidth - 20, displayHeight-30);

  ground = createSprite(80, 360, 10000, 20)

  background = createSprite(0, 0, 1200, 600)
  //background = createSprite(0,0,displayWidth*2,displayHeight);
  background.addImage(background_img);
  background.scale = 1.2
  background.velocityX = 0
  background1 = createSprite(1200, 0, 1200, 600)
  //background = createSprite(0,0,displayWidth*2,displayHeight);
  background1.addImage(background_img);
  background1.scale = 1.2
  background1.velocityX = 0
  background2 = createSprite(2400, 0, 1200, 600)
  //background = createSprite(0,0,displayWidth*2,displayHeight);
  background2.addImage(background_img);
  background2.scale = 1.2
  background2.velocityX = 0
  background3 = createSprite(3600, 0, 1200, 600)
  //background = createSprite(0,0,displayWidth*2,displayHeight);
  background3.addImage(background_img);
  background3.scale = 1.2
  background3.velocityX = 0

  monkey = createSprite(0, 350, 0,0);
  monkey.addAnimation("conusdmxo", monkey_running);
  monkey.scale = 0.1;


  FoodGroup = createGroup();
  ObstacleGroup = createGroup();
}



function draw() {

  
    
  if (gameState === PLAY) {
     //background.velocityX = 3;
   monkey.velocityX = 3;

    if (keyDown("space") && (monkey.y > 200)) {
      monkey.velocityY = -12;
    }

    monkey.velocityY = monkey.velocityY + 0.8;

    //monkey.collide(ground);

    switch (score) {
      case 10:
        monkey.scale = 0.12;
        break;
      case 20:
        monkey.scale = 0.14;
        break;
      case 30:
        monkey.scale = 0.16;
        break;
      case 40:
        monkey.scale = 0.18;
        break;
      default:
        break;
    }

   
   camera.position.x = monkey.x;

   
    Obstacles();
    Food();

    if (FoodGroup.isTouching(monkey)) {
      score += 2;
      FoodGroup.destroyEach();
    }

    //drawSprites();
     
    if (ObstacleGroup.isTouching(monkey)) {
      counter += 1
      ObstacleGroup.destroyEach();
      monkey.scale = 0.1;            
    }

  if(counter === 4){
      gameState = END;
    }
  } 
  
  if (gameState === END) {
   // background.velocityX = 0
    monkey.scale = 0.1;
    ObstacleGroup.destroyEach();
    FoodGroup.destroyEach();
    //FoodGroup.setVelocityXEach(0)
    //ObstacleGroup.setVelocityXEach(0)
    text("GAME OVER", 300, 200);
  }
  monkey.collide(ground);
  
  console.log(counter)
  
  drawSprites();
  stroke("black")
  fill("black")
  textSize(20) 
  text("SCORE = "+score, 250, 30);

}

function Obstacles() {
  if (frameCount % 50 === 0) {
    var obstacle = createSprite(3600, 320);
    obstacle.addImage(obstacleImage)
    obstacle.velocityX = -4

    obstacle.scale = 0.15;
    obstacle.lifetime = 1000;

    ObstacleGroup.add(obstacle);
  }
}

function Food() {
  if (frameCount % 75 === 0) {
    food = createSprite(3600, 120, 40, 10);
    food.y = Math.round(random(120, 200));
    food.addImage(bananaImage);
    food.velocityX = -4;
    food.scale = 0.04;

    //assign lifetime to the variable
    food.lifetime = 1000;

    FoodGroup.add(food);
  }
}
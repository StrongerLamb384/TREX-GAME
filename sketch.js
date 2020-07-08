var trex,trex_run,trex_collided;
var ground,ground_anime;
var invis;
var cloudGroup,cloud_1,cloud_anime;
var ob1,ob1_anime,ob2_anime,ob3_anime,ob4_anime,ob5_anime,
    ob6_anime;
var obstacleGroup;
var score;
var PLAY;
var END;
var gameState;
var restart,restart_anime;
var gameOver,gameOver_anime;
var die,jump,checkpoint;

function preload() {
  trex_run = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  ground_anime = loadAnimation("ground2.png");
  cloud_anime = loadImage("cloud.png");
  ob1_anime = loadImage("obstacle1.png");
  ob2_anime = loadImage("obstacle2.png");
  ob3_anime = loadImage("obstacle3.png"); 
  ob4_anime = loadImage("obstacle4.png");
  ob5_anime = loadImage("obstacle5.png");
  ob6_anime = loadImage("obstacle6.png");
  restart_anime = loadImage("restart.png");
  gameOver_anime = loadImage("gameOver.png");
  die = loadSound("die.mp3");
    jump = loadSound("jump.mp3");
   checkpoint = loadSound("checkPoint.mp3");
}

function setup() {
  createCanvas(600,200);
  trex = createSprite(50,170,10,10);
trex.addAnimation("trexx",trex_run);
  trex.scale = 0.5;
  
  trex.addAnimation("ttrreexx",trex_collided);
  
  ground = createSprite(100,180,400,420);
  ground.addAnimation("gg",ground_anime);
  
   invis  = createSprite(50,185,400,5)
  invis.visible = false;
   score = 0;
  
  PLAY = 1;
  END = 0;
  gameState = PLAY; 
  
  restart = createSprite(300,120,10,10);
  restart.addImage(restart_anime);
  
  gameOver = createSprite(300,60,10,10);
  gameOver.addImage(gameOver_anime);
  
   cloudGroup = new Group();
  obstacleGroup = new Group();
}

function draw() {
  background("white");
  
  text("Score : " + score,450,10);

  if (gameState === PLAY){
    ground.velocityX = -8; 
  if (ground.x < 0 ){
    ground.x = ground.width/2;
      }
  if (keyDown("space") && trex.y > 120){
  trex.velocityY = -12
    jump.play();
  }
  
  trex.velocityY = trex.velocityY + 0.8;
  
  score = score + Math.round(getFrameRate()/30);
    if (score> 0 && score% 100 === 0){
    checkpoint.play();
    }
    
    
    if (obstacleGroup.isTouching(trex)){
      gameState = END;
      die.play();
        }
    
    restart.visible = false;
    gameOver.visible = false;
    
   cloud();
  obstacle();
  } 

  else if (gameState === END){
   trex.changeAnimation("ttrreexx",trex_collided);
    ground.velocityX = 0;
    obstacleGroup.setVelocityXEach (0);
    cloudGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
    restart.visible = true;
    gameOver.visible = true;
  }
  
  if (mousePressedOver(restart)&& gameState === END){
      reset();
      }
  
  
  trex.collide(invis);
  drawSprites();
}

function cloud (){
  if (frameCount % 60 === 0){
  var cloud1 = createSprite(600,100,10,10);
  cloud1.y = random(80,120);
    cloud1.addImage("cc",cloud_anime);
    cloud1.velocityX = -7;
    cloud1.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloud1.lifetime = 150;
    cloudGroup.add(cloud1);
  }
}

function obstacle(){
if (frameCount % 80 === 0){
  var obs = createSprite(600,160,10,10);
  var rand =Math.round(random(1,6));
  switch(rand){
    case 1:
      obs.addImage(ob1_anime)
      break
       case 2:
      obs.addImage(ob2_anime)
      break
       case 3:
      obs.addImage(ob3_anime)
      break
      case 4:
      obs.addImage(ob4_anime)
      break
      case 5:
      obs.addImage(ob5_anime)
      break
      case 6:
      obs.addImage(ob6_anime)
      break
      default:
      break
  }
     obs.velocityX = -7;
      obs.scale = 0.5;
      obs.lifetime = 160;
      obstacleGroup.add(obs);
}
}

function reset(){
trex.changeAnimation("trexx",trex_run);
 obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  gameState = PLAY
  score = 0;
}

  
  
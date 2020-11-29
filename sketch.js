var man, man_running,manc;
var ground, invisibleGround,groundi,gg,ggi;
var PLAY = 1;
var END = 0;
var gameState ;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var score;
function preload(){
  man_running = loadAnimation("images/run2.png","images/run3.png","images/run4.png");
  manc=loadImage("images/gameover.jpg")
  obstacle1 = loadImage("images/obstacle1.png");
  obstacle2 = loadImage("images/obstacle2.png");
  obstacle3 = loadImage("images/obstacle3.png");
  obstacle4 = loadImage("images/obstacle4.png");
  obstacle5 = loadImage("images/obstacle5.png");
  groundi = loadImage("images/ground.png");
}

function setup() {
  createCanvas(600, 200);
 gameState = PLAY ;
 man = createSprite(50,100,20,50);
 man.addAnimation("running", man_running);
 man.scale = 0.49;
 man.depth= 1
ground = createSprite(200,195,400,10);
ground.x = ground.width /2;
ground.velocityX = -4;
ground.addImage(groundi)
invisibleGround = createSprite(200,195,400,10);
invisibleGround.visible = false;
obstaclesGroup = new Group();  
score = 0;
gg = createSprite(350,195,200,10);
gg.addImage(groundi)
ggi = createSprite(525,195,400,10);
ggi.addImage(groundi)
}

function draw() {
  background("white");
  if (gameState === PLAY ) {
  score = score + Math.round(getFrameRate()/60);
  man.velocityY = man.velocityY + 1
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  spawnObstacles();
if (obstaclesGroup.isTouching(man)) {
   gameState = END ; } }
else if(gameState === END) {
ground.velocityX = 0;
man.velocityY = 0;
obstaclesGroup.setVelocityXEach(0);
obstaclesGroup.setLifetimeEach(-1);
background(manc)
man.lifetime(0)
  }
  if(keyDown(UP_ARROW)&&man.y>=70) {
    man.velocityY = -16;
  }
  man.collide(invisibleGround);
  text("Score: "+ score, 500,50);
  text("PRESS UP ARROW TO JUMP!!",200,50)
  drawSprites();
}


function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,30);
    obstacle.velocityX = -4;
    
    //generate random obstacles
    var rand = Math.round(random(1,5));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      default: break;
    }
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }}

 


var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cactosGroup
var cloud, cloudsGroup, cloudImage;
var PLAY = 1
var END = 0
var gameState = PLAY
var score = 0

var newImage;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  gameOver = loadImage("gameOver.png")
  groundImage = loadImage("ground2.png");
  restart = loadImage("restart.png")
  cloudImage = loadImage("cloud.png");
 cacto1 = loadImage("obstacle1.png");
 cacto2 = loadImage("obstacle2.png");
 cacto3 = loadImage("obstacle3.png");
 cacto4 = loadImage("obstacle4.png");
 cacto5 = loadImage("obstacle5.png");
 cacto6 = loadImage("obstacle6.png");
 die = loadSound("die.mp3");
 jump = loadSound("jump.mp3");
 checkpoint = loadSound("checkpoint.mp3");
}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  // trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  cloudsGroup = createGroup()
  cactosGroup = createGroup()
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  gameend = createSprite(300,100)
  reestart = createSprite(300,130)
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  gameend.addImage(gameOver)
  reestart.addImage(restart)
  gameend.scale = 0.6
  reestart.scale = 0.5
  score = 0
  trex.setCollider("circle",0,0,35)
  trex.debug = false
  
}

function draw() {
  background("white");
  text("score: "+score,500,50)
  if(gameState === PLAY){
    spawnClouds();
    spawnCactos();
    gameend.visible = false
    reestart.visible = false
    ground.velocityX = -(6+score/250);
    score = score+Math.round(getFrameRate()/60)
    if(keyDown("space") && trex.y>=150 ) {
      trex.velocityY = -10;
      jump.play()
    }
    
    trex.velocityY = trex.velocityY + 0.8
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    if(cactosGroup.isTouching(trex)){
      gameState = END
      die.play()
    }
    if(score>0 && score%100==0){
      checkpoint.play()
    }
  }
  else if(gameState === END){
    ground.velocityX = 0;
    trex.velocityY = 0;
    cactosGroup.setVelocityXEach(0)
    cloudsGroup.setVelocityXEach(0)
    cactosGroup.setLifetimeEach(-1)
    cloudsGroup.setLifetimeEach(-1)
    gameend.visible = true
    reestart.visible = true
    if(mousePressedOver(reestart)){
      reset()
    }

  }
  
  
  
  trex.collide(invisibleGround);
  
  //gerar nuvens
  
  drawSprites();
}

function spawnClouds() {
  //escreva o código aqui para gerar as nuvens
  if (frameCount % 60 === 0) {
    cloud = createSprite(650,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.7;
    cloud.velocityX = -3;
    
    //ajustar a profundidade
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    cloudsGroup.add(cloud)
    cloud.lifetime = 240
    }
}

function spawnCactos(){
  if(frameCount % 100 === 0){
    cactog = createSprite(650,160,10,100)
    cactog.velocityX = -(6+score/250)
    var r = Math.round(random(1,6))
    switch(r){
      case 1 : cactog.addImage(cacto1)
      cactog.y = 165
      //cactog.setCollider("rectangle",0,0,90,90)
      break

      case 2 : cactog.addImage(cacto2)
      cactog.y = 165
      break

      case 3 : cactog.addImage(cacto3)
      cactog.y = 165
      break

      case 4 : cactog.addImage(cacto4)
      //cactog.setCollider("rectangle",0,0,40,120)
      break

      case 5 : cactog.addImage(cacto5)
      break

      case 6 : cactog.addImage(cacto6)
      break
  
    }
    cactog.scale = 0.4
    cactog.lifetime = 140
    cactosGroup.add(cactog)
    //cactog.setCollider("rectangle",0,0,90,80)
    cactog.debug = false
  }

}
function reset(){
  gameState = PLAY
  cactosGroup.destroyEach()
  cloudsGroup.destroyEach()
  score = 0
}
var START=0
var PLAY = 1;
var END = 2;
var gameState = START;

var bg,bgImg;
var bird,birdImg;
var pipeUpGroup,pipeUpImg1,pipeUpImg2,pipeUpImg3;
var pipeDoenGroup,pipeDownImg1,pipeDownImg2,pipeDownImg3;
var ran;

var score=0;

var gameOver, restart,restartImg,gameOverImg,startImg,start;

localStorage["HighestScore"] = 0;

function preload(){
  bgImg=loadImage("Img/skye.png");
  birdImg=loadImage("Img/bird.png");
  pipeUpImg1=loadImage("Img/pipeUp1.png");
  pipeUpImg2=loadImage("Img/pipeUp2.png");
  pipeUpImg3=loadImage("Img/pipeUp3.png");
  pipeDownImg1=loadImage("Img/pipeDown1.png");
  pipeDownImg2=loadImage("Img/pipeDown2.png");
  pipeDownImg3=loadImage("Img/pipeDown3.png");

  gameOverImg = loadImage("Img/GameOver.png");
  restartImg = loadImage("Img/restartButton.png");
  startImg=loadImage("Img/Name.png");

}
function setup() {
  createCanvas(displayWidth,displayHeight);
  bg=createSprite(displayWidth/2,displayHeight/2,displayWidth*5,height);
  bg.addImage("bg",bgImg);
bg.scale=1.25;


bird=createSprite(displayWidth-1800,displayHeight/2,50,50);
bird.addImage(birdImg);
bird.visible=false;

pipeUpGroup=new Group();
pipeUpGroup.setVisibleEach(false);
pipeDownGroup=new Group();
pipeDownGroup.setVisibleEach(false);

start=createSprite(displayWidth/2,displayHeight/2);
start.addImage("start",startImg);
start.visible=false;

gameOver=createSprite(displayWidth/2,displayHeight/2);
gameOver.addImage("gameOver",gameOverImg);
gameOver.visible=false;

restart=createSprite(displayWidth/2,displayHeight/2+250);
restart.addImage("restart",restartImg);
restart.visible=false;

fill(113,197,207);
stroke(113,197,207);
strokeWeight(0);
}

function draw() {
if(gameState===0){
background(113,197,207);
start.visible=true;
restart.visible=true;
fill(113,197,207);
stroke(113,197,207);
strokeWeight(0);
if(mousePressedOver(restart)){
  gameState=1;
}
}

if(gameState===1){

  score = score + Math.round(getFrameRate()/60);


start.visible=false;
restart.visible=false;

  bird.visible=true;
  pipeUpGroup.setVisibleEach(true);
  pipeDownGroup.setVisibleEach(true);

  background(0);
  fill(255,255,255);
  textSize(72);
  textFont("Courier New");
  stroke(0);
  strokeWeight(10);



  if(touches.length > 0 || keyDown("space") ) {
    bird.velocityY = -5;
    touches=[];
  }

  bird.velocityY = bird.velocityY + 0.2  ;
 spawnPipesUp();
 spawnPipesDown();


 if(pipeUpGroup.isTouching(bird)|| pipeDownGroup.isTouching(bird)){
  gameState = 2;
}
}

if(gameState===2){
  background(78,192,202);

  bg.visible=false;
bird.visible=false;
pipeUpGroup.setVisibleEach(false);
pipeDownGroup.setVisibleEach(false);
restart.visible=true;
gameOver.visible=true;

fill(255,255,255);
  textSize(72);
  textFont("Courier New");
  stroke(0);
  strokeWeight(10);
text("OPEN THE CONSOLE TO KNOW THE HIGHEST SCORE", displayWidth/2-900,displayHeight/2-200)
 text("AFTER THE                    SCEOND ATTEMPT", displayWidth/2-900,displayHeight/2-100)

  if(touches.length>0 || mousePressedOver(restart)) {
    reset();
    touches=[];
  }
}


  drawSprites();


  text("SCORE: "+ score,displayWidth-700,80);
}

function spawnPipesUp() {
  //write code here to spawn the pipeUps
  if ((frameCount % 150 === 0) || (frameCount%75===0)){
    var pipeUp = createSprite(camera.x+width/2,20,40,10);
   ran=Math.round(random(1,3));
   switch(ran) {
    case 1: pipeUp.addImage(pipeUpImg1);
            break;
    case 2: pipeUp.addImage(pipeUpImg2);
            break;
    case 3: pipeUp.addImage(pipeUpImg3);
            break;

    default: break;
  }

    pipeUp.scale = 2.5;


    pipeUp.velocityX = -(20 + 3*score/100);

     //assign lifetime to the variable
    pipeUp.lifetime = 200;



    //add each pipeUp to the group
    pipeUpGroup.add(pipeUp);
  }
}

function spawnPipesDown() {
  //write code here to spawn the pipeUps
  if ((frameCount % 150 === 0) || (frameCount%75===0)){
    var pipeDown = createSprite(camera.x+width/2,displayHeight,40,10);
   ran=Math.round(random(1,3));
   switch(ran) {
    case 1: pipeDown.addImage(pipeDownImg1);
            break;
    case 2: pipeDown.addImage(pipeDownImg2);
            break;
    case 3: pipeDown.addImage(pipeDownImg3);
            break;

    default: break;
  }

    pipeDown.scale = 2.5;

    pipeDown.velocityX = -(20 + 3*score/100);

     //assign lifetime to the variable
    pipeDown.lifetime = 200;



    //add each pipeDown to the group
    pipeDownGroup.add(pipeDown);
  }
}

function reset(){
  gameState = 0;
  gameOver.visible = false;
  gameOver.visible=false;
  bg.visible=true;
  restart.visible = true;


  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);

  score = 0;

}

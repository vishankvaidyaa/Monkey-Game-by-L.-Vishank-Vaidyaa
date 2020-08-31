var
monkey,monkeyImage,monkey2,monkey2Image,banana,bananaImageSingle,bananaImageDouble,stone,stoneImage,backImage;

var PLAY = 1;
var END = 0;

var gameState = PLAY;
var score=0;

function preload (){
  
  backImage = loadImage("jungle2.jpg");
  
monkeyImage=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  monkey2Image=loadImage("Monkey_01.png");
  
  bananaImageSingle = loadImage("Banana.png");
  bananaImageDouble = loadImage("Bananas.png");
  
 stoneImage = loadImage("stone.png");
}

function setup() {
  createCanvas(600, 600);
  monkey=createSprite(100,530);
 monkey.addAnimation("running",monkeyImage);
  monkey.scale=0.1;
  //monkey.debug=true;
 
  invisibleGround=createSprite(400,560,600,5);
  invisibleGround.visible=false;
 
  
   backGround=createSprite(100,370,600,1400);
 backGround.addImage(backImage);
   backGround.x=backGround.width/2; 
  
   monkey.depth=backGround.depth+1

   foodGroup=new Group();
  obstaclesGroup=new Group();
  
    }

function draw (){
  
  background("white");
  
 monkey.collide(invisibleGround); 
  
  if(monkey.scale>0.1 && obstaclesGroup.isTouching(monkey)){
       monkey.scale=0.1;
      obstaclesGroup.destroyEach();
    score=score-score;
       }
  
  if(foodGroup.isTouching(monkey)){
       score=score+2;
      foodGroup.destroyEach();
       }
  
  
  
  if(gameState===PLAY){
    
     switch(score){
      case 10:monkey.scale=0.12
      break ; 
      
      case 20:monkey.scale=0.14
      break ; 
      
      case 30:monkey.scale=0.16
      break ; 
      
      case 40:monkey.scale=0.18 
      break ; 
      
      default: break;
     }
    
   if(keyDown("space")&&monkey.y>=520){
     monkey.velocityY=-20;
     } 
    
     if(keyDown(UP_ARROW)&&monkey.y>=520){
     monkey.velocityY=-20;
     } 
    
    monkey.velocityY=monkey.velocityY+1
    
    backGround.velocityX=-6
     if(backGround.x<100){
     backGround.x=backGround.width/2;
     }
    
    spawnFood();
  spawnObstacles();
    
    if(monkey.scale===0.1 && obstaclesGroup.isTouching(monkey)){
      gameState=END;
       }
    
    }
  else  {
    
  backGround.velocityX=0;
    
  monkey2=createSprite(100,530);
 monkey2.addImage(monkey2Image);
    monkey2.x=monkey.x;
    monkey2.y=monkey.y;
    monkey2.scale=0.1;
    monkey.destroy();
    
    obstaclesGroup.setVelocityXEach(0);
        foodGroup.setVelocityXEach(0);
    
    foodGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
    
    monkey.velocityY=0;
    
     stroke("white");
  textSize(20);
  fill("white");
  text("Game Over",300,300);
  }

  drawSprites(); 
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score,100,100);
  
}

function spawnFood() {
  //write code here to spawn the clouds
  
  if (frameCount % 250 === 0) {
    var banana = createSprite(800,180,40,10);
    banana.y = random(300,400);
     banana.addImage(bananaImageSingle);
    
   banana.scale = 0.1;
    banana.velocityX = -3;
    
    
     //assign lifetime to the variable
    banana.lifetime = 300;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    foodGroup.add(banana);
  }
}

function spawnObstacles() {
  
  if(frameCount % 150 === 0) {
    
     
  var stone = createSprite(600,510,10,40);
  stone.addImage(stoneImage);
  stone.scale = 0.25;
    
      stone.velocityX = -8.5;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    //console.log(rand); 
    
    //assign scale and lifetime to the obstacle           
    
    stone.lifetime = 160;
    //add each obstacle to the group
    obstaclesGroup.add(stone);
    
    }
}
var PLAY = 1;
var END = 0;
var START = 2;
var gameState = START;

var backImage,backgr;
var ground , startImg , start;
var pikachu,pikachu_running;
var pokemon,eeve,char,bulba,pokemonGroup;
var pokeball,pokeballGroup,pokeImg;
var pikachuSound, picaa;
var score,survivalTime;
var gameOver,gameOverImage,restart,restartImg;


function preload(){
  //loading sound and animation
pikachu_running = loadAnimation("images/pikachu.gif");
pokeImg =  loadImage("images/pokeBall.png");
eeve = loadImage("images/eeve.jpg");
char = loadImage("images/charmander.png");
bulba = loadImage("images/bulbasaur.png");
backImage = loadImage("images/bg.jpg");
gameOverImage = loadImage("images/Game-over-2.png")
restartImg = loadImage("images/restart.jpg");
pikachuSound = loadSound("pikachu.mp3");
startImg = loadImage("images/poke.png");
backgr = loadImage("images/sbg.jpg");
picaa = loadSound("Pikaaaa.mp3");

}

function setup() {
createCanvas(1000,600);
//creating and modifiying sprites
  
gameOver = createSprite(500,250);
gameOver.addImage(gameOverImage);
gameOver.scale =0.6;
gameOver.visible = false;

pikachu = createSprite(100,540,20,50);
pikachu.addAnimation("Running",pikachu_running);
pikachu.scale = 0.2;
// pikachu.visible = false;
  
//creating ground
ground = createSprite(300,550,800,10);
ground.velocityX = -4;
ground.x = ground.width/2;
ground.visible = false;

restart = createSprite(500,350);
restart.addImage(restartImg);
restart.scale = 0.1;
restart.visible = false;
  
pokemonGroup = new Group();
pokeballGroup = new Group();
  
score = 0 ;
survivalTime = 0;  

console.log(gameState);
}

function draw() {

  if(gameState === START){
    start = createSprite(500,100);
    start.addImage(startImg);
    start.scale = 0.7;
    start.depth = background.depth+10;
    background(backgr);
    if(mousePressedOver(start)){
      gameState = PLAY;
    }
  }
  

  if(gameState === PLAY) {
  start.visible = false;
  background(backImage);
  pikachu.visible = true;
  fill(0);
  stroke("black");  
  textSize(22);
  text("Survival Time : "+ survivalTime, 80, 50);
  text("Score : "+ score, 80, 90);
  restart.visible = false;
  gameOver.visible = false;
 
if(ground.x < 100){
  ground.x = ground.width/2;
}
survivalTime = survivalTime + Math.round(getFrameRate()/60);
  
//adding gravity to pikachu
pikachu.velocityY = pikachu.velocityY + 0.8;
  
spawnPokemon();
spawnPokeball();
pikachu.collide(ground)  
  
  
if(keyDown("space")&& pikachu.y>= 120 ) {
  pikachu.velocityY = -12;
}
  
if(pokeballGroup.isTouching(pikachu)) {
  pokeballGroup.destroyEach();
  score = score + 2;
  pikachuSound.play()
}  

 if(pokemonGroup.isTouching(pikachu)) {
   pokemonGroup.destroyEach();
   pikachu.visible = false;
   gameState = END ;
   picaa.play();
   
 }  
}  

if(gameState === END) {
  pikachu.visible = false;
  start.visible = false;
  gameOver.visible = true;
  restart.visible = true;
  
  ground.velocityX=0;
  background.velcoityX= 0;
  
pokemonGroup.setLifetimeEach(-1);
pokeballGroup.setLifetimeEach(-1);
  
pokemonGroup.setVelocityXEach(0);
pokeballGroup.setVelocityXEach(0);

if(mousePressedOver(restart)) {
  reset();
}
}
   
drawSprites(); 
}

function spawnPokemon() {
 if(frameCount % 250 === 0) {
  var pokemon = createSprite(800,330,20,50);
  pokemon.velocityX = -(6 + score/100);
  pokemon.y = random(200,350);
  pokemon.depth = background.depth+10;
  
  //generate random pokemon
   var rand = Math.round(random(1,3));
   switch(rand) {
     case 1: pokemon.addImage("1",bulba);
             pokemon.scale = 0.1;
             break;
     case 2: pokemon.addImage("2",eeve);
             pokemon.scale = 0.3;
             break;
     case 3: pokemon.addImage("3",char);
             pokemon.scale = 0.2;
             break;
}
  pokemonGroup.add(pokemon);
}
}

function spawnPokeball() {
  if(frameCount % 180===0) {
  var pokeball = createSprite(600,random(150,350),40,10);
  pokeball.velocityX= -5;    
  pokeball.lifetime = 300;
  pikachu.depth = pokeball.depth + 1;
    
  pokeball.addImage(pokeImg);
  pokeball.scale=0.08;
  pokeballGroup.add(pokeball);

}
}

function reset(){
  gameState = START;
  score = 0;
  survivalTime = 0;
  restart.visible = false;
  gameOver.visible = false;
  pikachu.visible = true;
  pokeballGroup.destroyEach();
  pokemonGroup.destroyEach();
}
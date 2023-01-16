const Body = Matter.Body;
const World = Matter.World;
const Engine = Matter.Engine;
const Render = Matter.Render;
const Bodies = Matter.Bodies;
const Composite = Matter.Composite;
const Composites = Matter.Composites;
const Constraint = Matter.Constraint;


let AJengine;
let AJworld;

var ground, bgIMG;
var bunny, bunnyIMG;
var fruit, fruitIMG;
var rope1, rope2, rope3;
var fruit_con1, fruit_con2, fruit_con3;
var muteButton, muteIMG, airBlowButton, airBlowIMG;
var cutButton1, cutButton2, cutButton3, cutButton4, cutButton5;
var canW, canH

var bk_sound, sad_sound, cut_sound, eating_sound, air_sound;
var blinkAnimation, eatAnimation, sadAnimation;

function preload() {

  bgIMG = loadImage('background.png');


  fruitIMG = loadImage("melon.png");
  bunnyIMG = loadImage("Rabbit-01.png");
  blinkAnimation = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png");
  sadAnimation = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png");
  eatAnimation = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png");

  muteImg = loadImage("mute.png")
  airBlowIMG = loadImage("blower.png")


  bk_sound = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air_sound = loadSound('air.wav');

}


function setup() {
  //createCanvas(500, 700);

  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (isMobile) {
    canW = displayWidth;
    canH = displayHeight;
    createCanvas(canW + 80, canH);
  }
  else{
    canW=windowWidth;
    canH=windowHeight;
    createCanvas(canW,canH);
  }
  frameRate(80);

  // bk_sound.play();
  // bk_sound.setVolume(0.5);

  AJengine = Engine.create();
  AJworld = AJengine.world;

  //btn 1
  cutButton1 = createImg('cut_btn.png');
  cutButton1.position(175, 10);
  cutButton1.size(50, 50)
  cutButton1.mouseClicked(drop1);
  //btn 2
  cutButton2 = createImg('cut_btn.png');
  cutButton2.position(375, 55);
  cutButton2.size(50, 50);
  cutButton2.mouseClicked(drop2);
  //btn 3
  cutButton3 = createImg('cut_btn.png');
  cutButton3.position(25, 80);
  cutButton3.size(50, 50);
  cutButton3.mouseClicked(drop3);


  ground = new Ground(200, 680, 600, 20);

  rope1 = new Rope(7, { x: 200, y: 30 });
  rope2 = new Rope(7, { x: 400, y: 75 });
  rope3 = new Rope(7, { x: 50, y: 100 });

  fruit = Bodies.circle(300, 300, 5);
  World.add(AJworld, fruit);

  fruit_con1 = new Link(rope1, fruit);
  fruit_con2 = new Link(rope2, fruit);
  fruit_con3 = new Link(rope3, fruit);

  bunny = createSprite(270, 600, 75, 100);
  //bunny.addImage("bunnyIMG", bunnyIMG);
  bunny.addAnimation("blinking", blinkAnimation);
  bunny.addAnimation("eating", eatAnimation);
  bunny.addAnimation("crying", sadAnimation);
  bunny.changeAnimation("blinking");
  bunny.scale = 0.2
}

function draw() {
  background(51);
  image(bgIMG, 0, 0, width + 80, height);


  Engine.update(AJengine);

  ground.show();

  rope1.show();
  rope2.show();
  rope3.show();

  if (fruit != null) {
    imageMode(CENTER);
    image(fruitIMG, fruit.position.x, fruit.position.y, 50, 50);
  }

  // checking the collision between the bunny and other bodies
  if (checkCollison(fruit, bunny)) {
    bunny.changeAnimation("eating");
    eating_sound.play();
  }
  if (checkCollison(fruit, ground.body)) {
    bunny.changeAnimation("crying");
    sad_sound.play();
  }

  drawSprites();

}

function drop1() {
  cut_sound.play();
  rope1.break();
  fruit_con1.detach();
  fruit_con1 = null;
}

function drop2() {
  cut_sound.play();
  rope2.break();
  fruit_con2.detach();
  fruit_con2 = null;
}

function drop3() {
  cut_sound.play();
  rope3.break();
  fruit_con3.detach();
  fruit_con3 = null;
}

// function definition to find the collision between fruit and other game objects
function checkCollison(body1, body2) {
  if (body1 != null) {
    var calculatedDistance = dist(body1.position.x, body1.position.y, body2.position.x, body2.position.y)
    if (calculatedDistance <= 80) {
      World.remove(AJworld, fruit);
      fruit = null;
      return true;
    }
    else {
      return false;
    }
  }
}
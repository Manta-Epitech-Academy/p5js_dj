let sound1 = null;
let sound2 = null;
let bg = "grey";

function preload()
{
  sound1 = loadSound("assets/sound1.mp3");
  sound1.setLoop(true);
  sound2 = loadSound("assets/sound2.mp3");
  sound2.setLoop(true);
  bg = loadImage("assets/bg.png");
}

function onClickPlay1()
{
  if (!sound1.isPlaying()) {
    sound1.play();
  }
}

function onClickPlay2()
{
  if (!sound2.isPlaying()) {
    sound2.play();
  }
}

function onClickPause1()
{
  if (sound1.isPlaying()) {
    sound1.pause();
  }
}

function onClickPause2()
{
  if (sound2.isPlaying()) {
    sound2.pause();
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  play1 = createButton("play1");
  play2 = createButton("play2");
  play1.style("width: 100px; height: 100px; color: red; background-color: lime")
  play2.style("width: 100px; height: 100px; color: blue; background-color: pink")
  play1.position((windowWidth/3) - 100, (windowHeight/2) - 100);
  play2.position((windowWidth/3 * 2), (windowHeight/2) - 100);
  pause1 = createButton("pause1");
  pause2 = createButton("pause2");
  pause1.style("width: 100px; height: 100px; color: red; background-color: green")
  pause2.style("width: 100px; height: 100px; color: blue; background-color: purple")
  pause1.position((windowWidth/3) - 100, (windowHeight/2) - 200);
  pause2.position((windowWidth/3 * 2), (windowHeight/2) - 200);
  play1.mousePressed(onClickPlay1);
  play2.mousePressed(onClickPlay2);
  pause1.mousePressed(onClickPause1);
  pause2.mousePressed(onClickPause2);
  
}

function draw() {
  background(bg);
}
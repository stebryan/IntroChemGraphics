let myCylinderPic;
let waterPic;
let Chewy;
let ComicNeue;
let mL;
let oz;
let flozBtn;
let tspBtn;
let slider;
let gui;
//set initial waterHeight to 600;
let waterHeight = 600;
let units = [];

function preload() {
  Chewy = loadFont('assets/Chewy-Regular.ttf');
  ComicNeue = loadFont('assets/ComicNeue-Regular.ttf');
  myCylinderPic = loadImage('assets/cylinder.png');
  waterPic = loadImage('assets/water.png');

}

function setup() {
  fill(255);
  createCanvas(500, 900);
  gui = createGui();
  units.push(new unitSystem(100, 10, 'mL', 1)); // scale is pixels per major tic unit (10mL here)
  units.push(new unitSystem(296, 1, 'fl oz', 0.03381));
  units.push(new unitSystem(49.3, 1, 'tsp', 0.203));
  flozBtn = createButton("convert to oz", 50, 500);
  tspBtn = createButton("convert to tsp", 50, 550);
  slider = createSliderV("slider", 350, 300, 30, 300, 0, 350);
}

function draw() {
  background(255);

  image(waterPic, 117, waterHeight, 318, 415);
  image(myCylinderPic, 50, 50, 400, 750);

  push();
  textSize(20);
  textFont(ComicNeue);
  textWrap(WORD);
  fill(0);
  text("Use the slider on the right to change the amount of water in the graduated cylinder. Then hold down the buttons below to see this measurement in different units.", 50, 50, 450, 200);
  pop();

  // Add a background bar at the bottom
  push();
  fill(255);
  noStroke();
  rect(0, 780, 500, 120);
  pop();

  drawGui();

  waterHeight = 642 - slider.val;

  let waterAmount = 10 + (642 - waterHeight) * 0.1; // Calculating water amount (10mL per 100px)
  let i;

  if (flozBtn.isHeld) {
    i = 1;
  } else if (tspBtn.isHeld) {
    i = 2;
  } else {
    i = 0;
  }

  push();
  units[i].showTics();
  pop();

  push();
  units[i].showAns(waterAmount);
  pop();

}

function touchMoved() {
  // Optional: Add specific touch interaction logic here if needed
  return false; // This line is key to stopping default scrolling
}


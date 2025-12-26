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
//set initial waterHeight to 400;
let waterHeight = 400;
let units = [];

function preload() {
  Chewy = loadFont('assets/Chewy-Regular.ttf');
  ComicNeue = loadFont('assets/ComicNeue-Regular.ttf');
  myCylinderPic = loadImage('assets/cylinder.png');
  waterPic = loadImage('assets/water.png');

}

function setup() {
  describe('A 2-D drawing of a graduated cylinder containing water with a meniscus.');

  fill(255); //white background
  if (windowWidth < 500) {
    createCanvas(windowWidth, (1.8) * windowWidth);
  } else {
    createCanvas(500, 900);
  } //changes canvase size based on device if the device is small

  gui = createGui();

  units.push(new unitSystem(100, 10, 'mL', 1)); // scale is pixels per major tic unit (10mL here)
  units.push(new unitSystem(296, 1, 'fl oz', 0.03381));
  units.push(new unitSystem(49.3, 1, 'tsp', 0.203));
  describeElement('convert to oz', 'A button that changes the tick marks amd measurement untils to fluid ounces when held down');
  flozBtn = createButton("convert to oz", width / 10, width, 128 * width / 500, 32 * width / 500);
  flozBtn.setStyle({
    textSize: 16 * width / 500
  });
  describeElement('convert to tsp', 'A button that changes the tick marks amd measurement untils to teaspoons when held down');
  tspBtn = createButton("convert to tsp", width / 10, 1.1 * width, 128 * width / 500, 32 * width / 500);
  tspBtn.setStyle({
    textSize: 16 * width / 500
  });
  describeElement('Slider', 'The slider controls the water level in the graduated cylinder and changes the amount displayed.')
  slider = createSliderV("slider", 0.7 * width, 0.6 * width, 0.06 * width, width / 2, 0, 350 * width / 500);


}

function draw() {
  background(255);

  image(waterPic, 0.234 * width, waterHeight, 318 * width / 500, 415 * width / 500);
  image(myCylinderPic, width / 10, width / 10, 0.8 * width, 1.5 * width);

  push();
  textSize(floor(0.04 * width));
  textFont(ComicNeue);
  textWrap(WORD);
  fill(0);
  text("Use the slider on the right to change the amount of water in the graduated cylinder. Then hold down the buttons below to see this measurement in different units.", width / 10, width / 10, 0.9 * width, 0.4 * width);
  pop();

  // Add a background bar at the bottom
  push();
  fill(255);
  noStroke();
  rect(0, 1.56 * width, width, 0.24 * width);
  pop();

  drawGui();
  let waterMin = 642 * height / 900;
  waterHeight = waterMin - slider.val;

  let waterAmount = 10 + (slider.val * 500 / width) * 0.1; // Calculating water amount (10mL per 100px)
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

function windowResized() {
  if (windowWidth < 500) {
    resizeCanvas(windowWidth, (1.8) * windowWidth);
  } else {
    resizeCanvas(500, 900);
  }
}
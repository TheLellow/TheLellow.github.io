var cols, rows;
var scl = 20;
var w;// = 1400;
var h;// = 1000;
var winWidth;
var winHeight;
//var newColor = 100;

var flying = 0;

var terrain = [];

var shape;
var count = 0;

function setup() {
  if (count === 0)
  {
	
    rzSlider = createSlider(3,9,5);
    rzSlider.position(20, 80);
	rzSlider.style('width', '100px');
	rzSlider.parent('display');
    rxSlider = createSlider(3,9,3);
    rxSlider.position(20, 110);
	rxSlider.style('width', '100px');
	rxSlider.parent('slider');
    
    minSlider = createSlider(-100,100,0);
    minSlider.position(20, 140);
	minSlider.style('width', '100px');
	minSlider.parent('slider');
    //maxSlider = createSlider(-100,100,100);
    //maxSlider.position(20, 110);
    
    //colorSlider = createSlider(0,255,100);
    //colorSlider.position(20, 140);
    
    speedSlider = createSlider(1,5,2);
    speedSlider.position(20, 170);
	speedSlider.style('width', '100px');
	speedSlider.parent('slider');
    
  }
  //colorMode(HSB);
  clear();
  var canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.parent('display');
  winWidth = windowWidth;
  winHeight = windowHeight * 2;
  w = winWidth;
  h = winHeight;
  cols = w / scl;
  rows = h/ scl;
  
  //sel.changed(selectEvent);

  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
    for (var y = 0; y < rows; y++) {
      terrain[x][y] = 0; //specify a default value for now
    }
  }
  count = 1;
}

function draw() {
  if (winWidth !== windowWidth)
  {
    setup();
  }
  var rz = rzSlider.value();
  var rx = rxSlider.value();
  var mi = minSlider.value();
  //var ma = maxSlider.value();
  //var c = colorSlider.value();
  var s = speedSlider.value();

  
  flying -= s / 20;
  var yoff = flying;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, mi, 100);
      xoff += 0.2;
    }
    yoff += 0.2;
  }

  background(0);
  translate(0, 50);
  rotateX(-PI/rx);
  rotateZ(-PI/rz);
  translate(-w/2, -h/2);
  for (var y = 0; y < rows-1; y++) {
    beginShape();
    fill(0,50,235, 60);
    stroke(255,255,255, 45);
    for (var x = 0; x < cols; x++) {
      vertex(x*scl, y*scl, terrain[x][y]);
      vertex(x*scl, (y+1)*scl, terrain[x][y+1]);
    }
    endShape();
  }
}

function drawButton() {
  sel = createSelect();
  sel.position(20, 80);
  sel.option('DEFAULT', null);
  sel.option('POINTS', 1);
  sel.option('LINES');
  sel.option('TRIANGLES');
  sel.option('TRIANGLE_STRIP');
  sel.option('TRIANGLE_FAN');
}

var font;
var vehicles = [];
var newColor = 0;
var colorUp = true;
var colorDown = false;
var winWidth;
var winHeight
var dotSize;

function preload() {
  font = loadFont('../p5/NotoSans-Regular.ttf')
}
function setup() {	
  clear();
  var pt = [];
  vehicles = [];
  winHeight = windowWidth/10;
  canvas = createCanvas(windowWidth, winHeight);
  winWidth = windowWidth;
  canvas.parent('sketch-holder');
  colorMode(HSB);
  //background(150, 150, 150, 20);
  background('rgba(255,255,255, 0.0)');
  //textFont(font);
  var tSize = windowWidth*0.1;
  textSize(tSize);
  dotSize = tSize/15;
  //fill(0);
  //noStroke();
  //text('DanielMunusami.ca', windowWidth/2 - (tSize * 4.54), ((600/2)));
  //console.log(tSize);
  var points = font.textToPoints('DanielMunusami.ca', windowWidth/2 - (tSize * 4.54), ((winHeight/1.2)));
  
  for (var i = 0; i < points.length; i++)
  {
    pt = points[i];
    var vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
    //stroke(255);
    //strokeWeight(8);
    //point(pt.x, pt.y);
  }
}

function draw() {
  //background(150, 150, 150, 20);
  
  if (winWidth !== windowWidth)
  {
	  setup();
  }
  
  background('rgba(200, 214, 229, 0.01)');
  for (var i = 0; i < vehicles.length; i++)
  {
    var v = vehicles[i];
    stroke(newColor,255,255);
    if (colorUp){newColor += 0.001;}
    if (colorDown){newColor -= 0.001;}
    if (newColor < 0){
      colorUp = true;
      colorDown = false;
    }
    if (newColor > 255) {
      colorDown = true;
      colorUp = false;
    }
	
    v.behaviors();
    v.update();
    v.show();
  }
  
  
}

function Vehicle(x,y) {
  this.pos = createVector(random(width), random(height));
  this.target = createVector(x,y);
  this.vel = p5.Vector.random2D();
  this.acc = createVector();
  this.r = 8;
  this.maxspeed = 10;
  this.maxforce = 1;
}

Vehicle.prototype.behaviors = function() {
  var arrive = this.arrive(this.target);
  var mouse = createVector(mouseX, mouseY);
  var flee = this.flee(mouse);
  
  arrive.mult(1);
  flee.mult(5);
  
  this.applyForce(arrive);
  this.applyForce(flee);
}

Vehicle.prototype.applyForce = function(f) {
  this.acc.add(f);
}

Vehicle.prototype.update = function() {
  this.pos.add(this.vel);
  this.vel.add(this.acc);
  this.acc.mult(0);
}

Vehicle.prototype.show = function() {
  //stroke(255);
  strokeWeight(dotSize);
  point(this.pos.x, this.pos.y);
}

Vehicle.prototype.arrive = function(target) {
  var desired = p5.Vector.sub(target, this.pos);
  var d = desired.mag();
  var speed = this.maxspeed;
  if (d < 100)
  {
    speed = map(d, 0, 100, 0, this.maxspeed);
  }
  desired.setMag(speed);
  var steer = p5.Vector.sub(desired, this.vel);
  steer.limit(this.maxforce);
  return steer;
}

Vehicle.prototype.flee = function(target) {
  var desired = p5.Vector.sub(target, this.pos);
  var d = desired.mag();
  if (d < 50) {
    desired.setMag(this.maxspeed);
    desired.mult(-1);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    return steer;
  }
  else
  {
    return createVector(0,0);
  }
}

Vehicle.prototype.seek = function(target) {
  var desired = p5.Vector.sub(target, this.pos);
  desired.setMag(this.maxspeed);
  var steer = p5.Vector.sub(desired, this.vel);
  steer.limit(this.maxforce);
  return steer;
}
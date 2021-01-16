var s;
var scl = 20;
var acceration = 0.1;
var score = 0;
var rate = 10;

var up = false;
var down = false;
var left = false;
var right = true;

function setup() {
  canvas = createCanvas(600, 600);
  canvas.parent('sketch-holder');
  s = new Snake();
  food = createVector(random(width), random(height));
  frameRate(rate);
  pickLocation();
}

function pickLocation() {
  var cols = floor(width/scl);
  var rows = floor(height/scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}

function draw() {
  background(51);
  frameRate(rate);
  textSize(26);
  fill(0, 102, 153);
  text('Score: ', 10, 30);
  text(score, 90, 30);
  
  
  if (s.eat(food)) {
    pickLocation();
  }
  
  s.death();
  s.update();
  s.show();
  
  fill(255, 0, 255);
  rect(food.x, food.y, scl, scl);
}

function keyPressed() {
  if (keyCode == 87 && down === false) {
    s.dir(0, -1);
    up = true;
    down = false;
    left = false;
    right = false;
  }
  
  else if (keyCode == 83 && up === false) {
    s.dir(0,1);
    up = false;
    down = true;
    left = false;
    right = false;
  }
  
  else if (keyCode == 68 && left === false) {
    s.dir(1,0);
    up = false;
    down = false;
    left = false;
    right = true;
  }
  
  else if (keyCode == 65 && right === false) {
    s.dir(-1,0);
    up = false;
    down = false;
    left = true;
    right = false;
  }
}

function Snake() {
  this.x = 0;
  this.y = 0;
  this. xspeed = 1;
  this .yspeed = 0;
  this.total = 0;
  this.tail = [];
  
  this.eat = function(pos) {
    var d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 20) {
      this.total++;
      acceration += 0.1;
      score++;
	  rate += 2;
      return true;
    }
    else {
      return false;
    }
  }
  
  this.dir = function(x, y) {
    this.xspeed = x;
    this.yspeed = y;
  }
  
  this.death = function() {
    for(var i = 0; i < this.tail.length; i++) {
      var pos = this.tail[i];
      var d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
		up = false;
		down = false;
		left = false;
		right = true;
        this.total = 0;
        this.tail = [];
        this.x = 0;
        this.y = 0;
        s.dir(1,0);
        acceration = 0.1;
        score = 0;
		rate = 10;
        pickLocation();
      }
    }
  }
  
  this.update = function() {
    for (var i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }
    if (this.total >= 1) {
      this.tail[this.total - 1] = createVector(this.x, this.y);
    }
    
    this.tail[this.total-1] = createVector(this.x, this.y);
    
    this.x = this.x + this.xspeed * scl;// * acceration;
    this.y = this.y + this.yspeed * scl;// * acceration;
    
    this.x = constrain(this.x, 0, width-scl);
    this.y = constrain(this.y, 0, height-scl);
    
  }
  this.show = function() {
    fill(255,255,0);
    for (var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
    rect(this.x, this.y, scl, scl);
    
  }
}
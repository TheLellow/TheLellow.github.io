var score = 0;
var counter = 0;
var totalTime = 30;

var gameOver = true;
var setupCounter = 0;

var buttonText = 'PLAY';
var initialInput;
var submitButton;
var submitCount = 0;

var database;

function setup() {
  canvas = createCanvas(200,200);
  canvas.parent('game');
  
  button = createButton('CLICK ME');
  //button.position(500, 175);
  button.mousePressed(greet);
  button.parent('click');
  
  playButton = createButton(buttonText);
  //playButton.position(75, 150);
  playButton.mousePressed(play);
  playButton.parent('play');
  
  initialInput = createInput('');
  initialInput.parent('player');
  submitButton = createButton('Submit');
  submitButton.parent('player');
  submitButton.mousePressed(submitScore);
  
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB2DDpFNYuR7IB8A7C3xmT4do6GSAo6g-8",
    authDomain: "clicker-2b95d.firebaseapp.com",
    databaseURL: "https://clicker-2b95d.firebaseio.com",
    projectId: "clicker-2b95d",
    storageBucket: "clicker-2b95d.appspot.com",
    messagingSenderId: "11243155420"
  };
  firebase.initializeApp(config);
  database = firebase.database();
  
  var ref = database.ref('scores');
  ref.on('value', gotData, errData);
}

function gotData(data) {
  var scores = data.val();
  var keys = Object.keys(scores);
  //var names = scores[keys[1]].score;
  
  for (var a = 0; a < keys.length; a++){
    for (var b = 0; b < keys.length - 1; b++){
      if (scores[keys[b]].score < scores[keys[b+1]].score){
        
        var swap = scores[keys[b]].score;
        scores[keys[b]].score = scores[keys[b+1]].score;
        scores[keys[b+1]].score = swap;
        
        var swapName = scores[keys[b]].name;
        scores[keys[b]].name = scores[keys[b+1]].name;
        scores[keys[b+1]].name = swapName;
        
      }
    }
  }
  
  var scorelistings = selectAll('.scorelisting');
  for (var i = 0; i < scorelistings.length; i++)
  {
    scorelistings[i].remove();
  }
  
  //if (keys.length > 10)
  //{
  //  for (var a = 10; a < keys.length; a++){
  //   scores[keys[a]].score = null;
  //   console.log(scores[keys[a]].score);
  //  }
  //}
  
  
  
  for (var i = 0; i < 10; i++) {
    var k = keys[i];
    var name = scores[k].name;
    var score = scores[k].score;
	var tr = createElement('tr', "");
    var td = createElement('td',name);
	var td2 = createElement('td',score);
	tr.class('scorelisting');
    tr.parent('scorelist');
    td.class('scorelisting');
    td.parent('scorelist');
	td2.class('scorelisting');
    td2.parent('scorelist');
  }
}

function errData(err) {
  console.log('Error');
  console.log(err);
}

function draw() {
  background(0);
  
  var timeRemaining = totalTime-counter
  submitButton.attribute('disabled', '');
  
  if(timeRemaining <= 0)
  {
    timeRemaining = 0;
    button.attribute('disabled', '');
    buttonText = 'restart';
    gameOver = true;
    if(submitCount < 1)
      submitButton.removeAttribute('disabled');
  }
  
  textSize(32);
  fill(255, 255, 0);
  text("Score: " + score, 25, 150);
  text("Timer: " + timeRemaining, 25, 50);
}

function start() {
  if(gameOver == false && setupCounter == 1)
  {
    setInterval(timer, 1000);
  }
}

function greet() {
  score++;
}

function timer() {
  counter++;
}

function play() {
  buttonText = 'RESTART';
  gameOver = false;
  setupCounter++;
  start();
  totalTime = 30;
  counter = 0;
  score = 0;
  submitCount = 0;
  button.removeAttribute('disabled');
}

function submitScore() {
  submitCount++;
  submitButton.attribute('disabled', '');
  var data = {
    name: initialInput.value(),
    score: score
  }
  var ref = database.ref('scores');
  ref.push(data);
}
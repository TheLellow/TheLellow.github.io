//require express
var express = require('express');
var path = require('path');

//create our router object
var router = express.Router();

//export our router
module.exports = router;

// route for our homepage


// route for our about
router.get('/about', function(req, res) {
  res.render('pages/about');
});

router.get('/games', function(req, res) {
  res.render('pages/games');
});

router.get('/projects', function(req, res) {
  res.render('pages/projects');
});

router.get('/snake', function(req, res) {
  res.render('pages/myProjects/snake');
});

router.get('/perlinNoise', function(req, res) {
  res.render('pages/myProjects/perlinNoise');
});

router.get('/clicker', function(req, res) {
  res.render('pages/myProjects/clicker');
});

router.get('/contact', function(req, res) {
  res.render('pages/contact');
});
router.post('/contact', function(req, res) {

});

router.get('/', function(req, res) {
  res.render('pages/index');
});

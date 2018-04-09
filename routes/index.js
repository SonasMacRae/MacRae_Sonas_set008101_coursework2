var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var sharedTitle;
var sharedPost;


mongoose.connect('mongodb://localhost/test');

var mySchema = mongoose.Schema({
  userInput: String,
  userInputTitle: String
});

var choiceModel = mongoose.model('choices', mySchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('post', { title: 'Yourspace' });
});

var database = [];


router.get('/fetch', function(req, res) {
  res.render('page');
});

router.get('/about', function(req, res) {
  res.render('about');
});

router.post('/fetch', function(req, res) {
  var userInput = JSON.stringify(req.body.userInput);
  var userInputTitle = JSON.stringify(req.body.userInputTitle);

  console.log(userInput);
  console.log(userInputTitle);

  var newChoice = new choiceModel();

  newChoice.userInput = userInput;
  newChoice.userInputTitle = userInputTitle;

  sharedPost = userInput;
  sharedTitle = userInputTitle;

  newChoice.save(function(err, savedObject) {
    if (err) {
      console.log(err);
      res.status(500).send();
    } else {
      res.render('post.jade', {post: userInput, title: userInputTitle});
    }
  })
});

router.post('ilike/:name/:address', function(req, res) {
  if (req.body.formfactor) {
    console.log(req.body.formfactor)
  } else {
    console.log('no formfactor!');
  }

  var name = req.params.name;
  var address = req.params.address;
  var newChoice = new choiceModel();

  newChoice.name = name;
  newChoice.address = address;

  newChoice.save(function(err, savedObject) {
    if (err) {
      console.log(err);
      res.status(500).send();
    } else {
      res.send(savedObject);
    }
  })
});

router.get('/check', function(req, res) {
  var response = 'ok';
  res.send(response);
});

module.exports = router;

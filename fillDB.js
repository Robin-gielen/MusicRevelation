var express = require('express'),
  fs = require('fs'),

  exphbs = require('express-handlebars'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  session = require('express-session'),
  passport = require('passport'),
  LocalStrategy = require('passport-local'),


  //==========MONGOOSE==========
  mongoose = require('mongoose'),
  MongoClient = require('mongodb'),
  // grab the user model
  utilisateur = require('./models/users'),
  video = require('./models/videos'),
  url = 'mongodb://localhost:27017/db',
  app = express();

var fs = require('fs');
var handleBar = require('express-handlebars'); //handleBar

  mongoose.connect('mongodb://localhost/db');
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log('CONNECTED');
  });
  // Configure
  app.use(logger('combined'));
  app.use(express.static('static'));
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(bodyParser());
  app.use(methodOverride('X-HTTP-Method-Override'));
  app.use(session({secret: 'supernova', saveUninitialized: true, resave: true}));
  app.use(passport.initialize());
  app.use(passport.session());

  //Create a new user
  var newUser = utilisateur({
    name: 'robin',
    username: 'robin.gielen',
    password: 'robin',
    firstName: 'Robin',
    lastName: 'Gielen',
    artistName: 'Gielen',
    description: 'Single singer from belgium',
  });

  //Save the user to the db
  newUser.save(function(err) {
    if (err) throw err;
  });

  //Create a new user
  var newUser1 = utilisateur({
    name: 'Joathan',
    username: 'Joathan.Malengreau',
    password: 'JoathanMalengreau',
    firstName: 'Joathan',
    lastName: 'Malengreau',
    artistName: 'Malengreau',
    description: 'Single singer from LLN',
  });

  //Save the user to the db
  newUser1.save(function(err) {
    if (err) throw err;
  });

  //Create a new user
  var newUser2 = utilisateur({
    name: 'Emilio',
    username: 'Emilio.Gamba',
    password: 'EmilioGamba',
    firstName: 'Emilio',
    lastName: 'Gamba',
    artistName: 'Gamba',
    description: 'Single singer from Bruxelles',
  });

  //Save the user to the db
  newUser2.save(function(err) {
    if (err) throw err;
  });

  //Create a new user
  var newUser3 = utilisateur({
    name: 'Louis',
    username: 'Louis.Dassy',
    password: 'LouisDassy',
    firstName: 'Louis',
    lastName: 'Dassy',
    artistName: 'Dassy',
    description: 'Single singer from Namur',
  });

  //Save the user to the db
  newUser3.save(function(err) {
    if (err) throw err;
  });

  //Create a new video
  var newVid = video({
    url: 'https://youtu.be/i7RDhqeQwbo',
    genre: 'Rock',
    artistName: 'Dassy',
    votePos: 5,
    voteNeg: 4,
  });

  //Save the video to the db
  newVid.save(function(err) {
    if (err) throw err;
  });

  //Create a new video
  var newVid2 = video({
    url: 'https://youtu.be/NVqVwk0rJ64',
    genre: 'HardRock',
    artistName: 'Gamba',
    votePos: 12,
    voteNeg: 3,
  });

  //Save the video to the db
  newVid2.save(function(err) {
    if (err) throw err;
  });

  //Create a new video
  var newVid3 = video({
    url: 'https://youtu.be/1yUYvyAY954',
    genre: 'Metal',
    artistName: 'Malengreau',
    votePos: 30,
    voteNeg: 0,
  });

  //Save the video to the db
  newVid3.save(function(err) {
    if (err) throw err;
  });

  //Create a new video
  var newVid4 = video({
    url: 'https://youtu.be/QAD0BtEv6-Q',
    genre: 'Dubstep',
    artistName: 'Gielen',
    votePos: 0,
    voteNeg: 60,
  });

  //Save the video to the db
  newVid4.save(function(err) {
    if (err) throw err;
  });


  db.on('close', console.error.bind(console, 'connection error:'));
  db.once('close', function() {
  });
  app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });
  process.exit();

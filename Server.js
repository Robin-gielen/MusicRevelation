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
  url = 'mongodb://localhost:27017/db',
  app = express();

  //var connection = mongoose.createConnection('mongodb://localhost:27017/db');

  mongoose.connect('mongodb://localhost/db');
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log('CONNECTED');
  });

  /*// create a new user
  var newUser = new utilisateur({
    name: 'Robin',
    username: 'robin5',
    password: 'gielen',
  });

  newUser.save(function(err) {
    if (err) throw err;
    console.log('User created!');
  });*/

  // get the user robin
  utilisateur.find({ username: 'robin3' }, function(err, user) {
    if (err) throw err;
    // object of the user
    console.log(user);
    console.log('user printed');
  });

  //===============PASSPORT===============

  passport.use('local-signin', new LocalStrategy(
    {passReqToCallback : true}, //allows us to pass back the request to the callback
    function(req, username, password, done) {
        if (password == 'gielen') {
          console.log('You are successfully logged in ' + username + '!');
          req.session.success = 'You are successfully logged in ' + username + '!';
          //req.session.username = username;
          done(null, username);
        }
        else {
          req.session.error = 'Could not log user in. Please try again.'; //inform user could not log them in
          console.log('Could not log user in. Please try again.');
          done(null, false, username);
        }
  }));

  //===============EXPRESS================
  // Configure Express
  app.use(logger('combined'));
  app.use(express.static('static'));
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(express.bodyParser());
  app.use(methodOverride('X-HTTP-Method-Override'));
  app.use(session({secret: 'supernova', saveUninitialized: true, resave: true}));
  app.use(passport.initialize());
  app.use(passport.session());
  // Initialize Passport!!! (This only wasted 2h of my time)

  // Session-persisted message middleware
  app.use(function(req, res, next){
    var err = req.session.error,
        msg = req.session.notice,
        success = req.session.success;

    delete req.session.error;
    delete req.session.success;
    delete req.session.notice;

    if (err) res.locals.error = err;
    if (msg) res.locals.notice = msg;
    if (success) res.locals.success = success;

    next();
  });

  app.get('/home.html', function (req, res,  next) {
  	res.sendFile('html/home.html', {root: __dirname })
  });

  app.get('/subscribe.html', function (req, res,  next) {
  	res.sendFile('html/subscribe.html', {root: __dirname })
  });

  app.post('/subscribe.html', function (req, res, next) {
    console.log(req.body.username);
    console.log(req.body.password);
    console.log(req.body.firstname);
    console.log(req.body.lastname);
    console.log(req.body.artistname);
    console.log(req.body.description);
    var newUser = utilisateur({
      name: req.body.username,
      username: req.body.username,
      password: req.body.password,
      firstName: req.body.firstname,
      lastName: req.body.lastname,
      artistName: req.body.artistname,
      description: req.body.description,
    });
    
      // save the user
    newUser.save(function(err) {
      if (err) throw err;
      console.log('User created!');
    });
    res.sendFile('html/home.html', {root: __dirname })
  });

  app.get('/login.html', function (req, res,  next) {
    console.log('inlogin');
  	res.sendFile('html/login.html', {root: __dirname })
  });

  //sends the request through our local signup strategy, and if successful takes user to homepage, otherwise returns then to signin page
  app.post('/login.html', function (req, res, next) {
    console.log('in post login');
    passport.authenticate('local-signin', {
      successRedirect: '/profile.html',
      failureRedirect: '/subscribe.html'
    }) (req, res, next); // appelle de la fonction retournée par passport.authenticate('local-signin' (req, res, next))
  });

  app.use(function loggedIn(req, res, next) {
      if (req.user) {
          next();
      } else {
          res.redirect('/login');
      }
  });

  app.get('/profile.html', function (req, res,  next) {
  	res.sendFile('html/profile.html', {root: __dirname })
  });

  app.get('/editVideo.html', function (req, res,  next) {
  	res.sendFile('html/editVideo.html', {root: __dirname })
  });

  app.get('/favouriteArtists.html', function (req, res,  next) {
  	res.sendFile('html/favouriteArtists.html', {root: __dirname })
  });

  app.get('/modifyProfile.html', function (req, res,  next) {
  	res.sendFile('html/modifyProfile.html', {root: __dirname })
  });

  app.get('/myVideo.html', function (req, res,  next) {
  	res.sendFile('html/myVideo.html', {root: __dirname })
  });

  app.get('/search.html', function (req, res,  next) {
  	res.sendFile('html/search.html', {root: __dirname })
  });

  app.get('/uploadVideos.html', function (req, res,  next) {
  	res.sendFile('html/uploadVideos.html', {root: __dirname })
  });

  app.get('/video.html', function (req, res,  next) {
  	res.sendFile('html/video.html', {root: __dirname })
  });

  app.get('/videoResearch.html', function (req, res,  next) {
  	res.sendFile('html/videoResearch.html', {root: __dirname })
  });

  app.get('/visitProfile.html', function (req, res,  next) {
  	res.sendFile('html/visitProfile.html', {root: __dirname })
  });

  app.get('/visitProfileVideos.html', function (req, res,  next) {
  	res.sendFile('html/visitProfileVideos.html', {root: __dirname })
  });

  app.get('/', function (req, res,  next) {
  	console.log('coucou4');
  });

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  /*function loggedIn(req, res, next) {
      if (req.user) {
          next();
      } else {
          res.redirect('/login');
      }
  }*/
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

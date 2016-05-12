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
  // var config = require('./config.js'), //config file contains all tokens and other private info
  //    funct = require('./functions.js'); //funct file contains our helper functions for our Passport and database work

  //==========MONGOOSE==========
  mongoose = require('mongoose'),

  app = express();

  //mongoose.connect('mongodb://user:pass@localhost:port/database', { config: { autoIndex: false } });

  //=======TEST MONGOOSE=========
var userLogs = require('db.js');
var peter = new userLogs();

  //===============PASSPORT===============

  passport.use('local-signin', new LocalStrategy(
    {passReqToCallback : true}, //allows us to pass back the request to the callback
    function(req, username, password, done) {
        console.log('in sing fonction');
        if (username == 'robin' && password == 'gielen') {
          console.log('credential ok');
          console.log(peter.nom);

          //req.session.success = 'You are successfully logged in ' + username + '!';
          //req.session.username = 'Robin';
          done(null, user);
        }
        else {
          //req.session.error = 'Could not log user in. Please try again.'; //inform user could not log them in
          console.log('credential not ok');
          done(null, username);
        }
    }));

  //===============EXPRESS================
  // Configure Express
  app.use(logger('combined'));
  app.use(express.static('static'));
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride('X-HTTP-Method-Override'));
  app.use(session({secret: 'supernova', saveUninitialized: true, resave: true}));
  app.use(passport.initialize());
  app.use(passport.session());

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

// sub app.post ...

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

/*app.use(function (req, res, next) {
  if (req.session.loggedIn) {
    console.log('logged');
    next(req, res);
  }
  else {
    res.redirect('/home.html')
    console.log('notLogged');
  }
});*/

app.get('/profile.html', function (req, res,  next) {
  //console.log(req.session.succes);
  //console.log(req.session.username);
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

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

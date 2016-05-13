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

//===============PASSPORT===============

passport.use('local-signin', new LocalStrategy(
  {passReqToCallback : true}, //allows us to pass back the request to the callback
  function(req, username, password, done) {
    utilisateur.find({ username: username }, function(err, user) {
      if (err) throw err;
      console.log('from db' + user);
      if (user[0] != undefined) {
        req.session.name = user[0].toObject().name;
        req.session.username = user[0].toObject().username;
        req.session.password = user[0].toObject().password;
        req.session.firstName = user[0].toObject().firstName;
        req.session.lastName = user[0].toObject().lastName;
        req.session.artistName = user[0].toObject().artistName;
        req.session.description = user[0].toObject().description;

        if (password == req.session.password) {
          console.log('You are successfully logged in ' + username + '!');
          req.session.success = 'You are successfully logged in ' + username + '!';
          done(null, username);
        }
        else {
          req.session.error = 'Could not log user in. Please try again.'; //inform user could not log them in
          console.log('Could not log user in. Please try again.');
          done(null, false, username);
        }
      }
      else {
        done(null, false, username);
      }
    });
}));

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

  app.get('/homeUnlogged.html', function (req, res,  next) {
    app.engine('.hbs', exphbs({defaultLayout: 'home', extname: '.hbs'})); //handlebar
    app.set('view engine', '.hbs');
    video.find({ }, function(err, videoList) {
      if (err) throw err;
      // object of the user
      if (temp != undefined) {
        var temp = [4];
        console.log(videoList);
        if (videoList.length < 4) {
          for(var i=0, j=videoList.length; i<j; i++) {
            temp[i] = videoList[i].url;
          }
        }
        else {
          for(var i=0, j=4; i<j; i++) {
            temp[i] = videoList[i].url;
          }
        }
        res.render('home', {
          url1: temp[0],
          url2: temp[1],
          url3: temp[2],
          url4: temp[3],
        });
      }
      else
      res.sendFile('html/home.html', {root: __dirname })
    });
  });

  app.get('/subscribe.html', function (req, res,  next) {
  	res.sendFile('html/subscribe.html', {root: __dirname })
  });

  app.post('/subscribe.html', function (req, res, next) {
    var newUser = utilisateur({
      name: req.body.username,
      username: req.body.username,
      password: req.body.password,
      firstName: req.body.firstname,
      lastName: req.body.lastname,
      artistName: req.body.artistname,
      description: req.body.description,
    });

    // save the user into the db
    newUser.save(function(err) {
      if (err) throw err;
      console.log('User created!');
    });

    res.sendFile('html/login.html', {root: __dirname })
  });

  app.get('/login.html', function (req, res,  next) {
    console.log('inlogin');
  	res.sendFile('html/login.html', {root: __dirname })
  });

  app.post('/login.html', function (req, res, next) {
    passport.authenticate('local-signin', {
      successRedirect: '/home.html',
      failureRedirect: '/subscribe.html'
    }) (req, res, next); // appelle de la fonction retournée par passport.authenticate('local-signin' (req, res, next))
  });

  app.use(function loggedIn(req, res, next) {
      if (req.user) {
        tempName = req.user;
          next();
      } else {
          console.log('Must be logged in to acces this part of the site !');
          res.redirect('/homeUnlogged.html');
      }
  });

  app.get('/logOut.html', function (req, res, next) {
    req.logout();
    res.redirect('/home.html');
  });

  app.get('/home.html', function (req, res,  next) {
    app.engine('.hbs', exphbs({defaultLayout: 'homeLogged', extname: '.hbs'})); //handlebar
    app.set('view engine', '.hbs');
    video.find({ }, function(err, videoList) {
      if (err) throw err;
      // object of the user
      var temp = [4];
      if (videoList.length < 4) {
        for(var i=0, j=videoList.length; i<j; i++) {
          temp[i] = videoList[i].url;
        }
      }
      else {
        for(var i=0, j=4; i<j; i++) {
          temp[i] = videoList[i].url;
        }
      }
      res.render('homeLogged', {
        url1: temp[0],
        url2: temp[1],
        url3: temp[2],
        url4: temp[3],
      });
    });
  });

  app.post('/home.html', function (req, res, next) {
    app.engine('.hbs', exphbs({defaultLayout: 'visitProfile', extname: '.hbs'})); //handlebar
    app.set('view engine', '.hbs');
    var tempUser;
    utilisateur.find( {username: req.body.search}, function(err, userSearched) {
            if (err) throw err;
            tempUser = new utilisateur({
              name: userSearched.name,
              username: userSearched.username,
              firstName: userSearched.firstName,
              lastName: userSearched.lastName,
              artistName: userSearched.artistName,
              description: userSearched.description,
            });
    })
    res.render('visitProfile', {
      name: tempUser.name,
      username: tempUser.username,
      firstName: tempUser.firstName,
      lastName: tempUser.lastName,
      artistName: tempUser.artistName,
      description: tempUser.description,
    });
  });

  app.get('/profile.html', function (req, res,  next) {
    app.engine('.hbs', exphbs({defaultLayout: 'profile', extname: '.hbs'})); //handlebar
    app.set('view engine', '.hbs');
    res.render('profile', {
      name: req.session.name,
      username: req.session.username,
      firstName: req.session.firstName,
      lastName: req.session.lastName,
      artistName: req.session.artistName,
      description: req.session.description,
    });
  });

  app.get('/myVideos.html', function (req, res,  next) {
    app.engine('.hbs', exphbs({defaultLayout: 'myVideos', extname: '.hbs'})); //handlebar
    app.set('view engine', '.hbs');
    video.find({ artistName: req.session.artistName }, function(err, videoList) {
      if (err) throw err;
      // object of the user
      var temp = [4];
      if (videoList.length < 4) {
        for(var i=0, j=videoList.length; i<j; i++) {
          temp[i] = videoList[i].url;
        }
      }
      else {
        for(var i=0, j=4; i<j; i++) {
          temp[i] = videoList[i].url;
        }
      }
      res.render('profile', {
        url1: temp[0],
        url2: temp[1],
        url3: temp[2],
        url4: temp[3],
      });
    });
  });

  app.get('/search.html', function (req, res,  next) {
    res.sendFile('html/search.html', {root: __dirname })
  });

  app.post('/search.html', function (req, res,  next) {
    app.engine('.hbs', exphbs({defaultLayout: 'myVideos', extname: '.hbs'})); //handlebar
    app.set('view engine', '.hbs');
    video.find( {genre: req.body.genre}, function(err, videosList) {
            if (err) throw err;
    })
    res.sendFile('html/videoResearch.html', {root: __dirname })
  });

  app.get('/uploadVideos.html', function (req, res,  next) {
    res.sendFile('html/uploadVideos.html', {root: __dirname })
  });

  app.post('/uploadVideos.html', function(req, res, next) {
    var newVideo = video({
      url: req.body.videoYoutubeLink,
      genre: req.body.genre,
      artistName: tempName,
    });

    // save the video into the db
    newVideo.save(function(err) {
      if (err) throw err;
      console.log('Video added');
    });
    res.redirect('myVideos.html');
  });

  app.get('/modifyProfile.html', function (req, res,  next) {
    app.engine('.hbs', exphbs({defaultLayout: 'modifyProfile', extname: '.hbs'})); //handlebar
    app.set('view engine', '.hbs');
    res.render('modifyProfile', {
      password: req.session.password,
      username: req.session.username,
      firstName: req.session.firstName,
      lastName: req.session.lastName,
      artistName: req.session.artistName,
      description: req.session.description,
    });
  });

  //========================TODO===========================
  app.post('/modifyProfile.html', function (req, res, next) {
    app.engine('.hbs', exphbs({defaultLayout: 'profile', extname: '.hbs'})); //handlebar
    app.set('view engine', '.hbs');

      res.render('profile', {
        name: req.session.name,
        username: req.session.username,
        firstName: req.session.firstName,
        lastName: req.session.lastName,
        artistName: req.session.artistName,
        description: req.session.description,
      });
  });

  app.get('/editVideo.html', function (req, res,  next) {
  	res.sendFile('html/editVideo.html', {root: __dirname })
  });

  app.get('/favouriteArtists.html', function (req, res,  next) {
  	res.sendFile('html/favouriteArtists.html', {root: __dirname })
  });

  app.get('/video.html', function (req, res,  next) {
  	res.sendFile('html/video.html', {root: __dirname })
  });

  app.get('/videoResearch.html', function (req, res,  next) {
  	res.sendFile('html/videoResearch.html', {root: __dirname })
  });

  app.get('/visitProfileVideos.html', function (req, res,  next) {
  	res.sendFile('html/visitProfileVideos.html', {root: __dirname })
  });
  //=======================FIN TODO========================

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  db.on('close', console.error.bind(console, 'connection error:'));
  db.once('close', function() {
    console.log('DECONNECTED');
  });

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

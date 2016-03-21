var express =       require('express'),
    bodyParser =    require('body-parser'),
    validator =     require('express-validator'),
    session =       require('express-session'),
    passport =      require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    RedisStore =    require('connect-redis')(session),
    CONFIG =        require('./config.json'),
    router =        require('./routes/router'),
    db =            require('./models'),
    User =          db.User;

var app = express();

app.set('view engine', 'jade');
app.set('views', 'views');

/**** middleware ****/
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(validator());

app.use(session({
  store: new RedisStore(
    {
      host: '127.0.0.1',
      port: '6379'
    }
  ),
  secret: CONFIG.SESSION.secret
}));

passport.use(new LocalStrategy(
  {
    passReqToCallback: true
  },
  function (req, username, password, done) {
    console.log('username: ', username);
    console.log('password: ', password);
    User.findOne({
      // where: {
        username: username,
        password: password
      // }
    }).
    then(function (user) {
      console.log('got user');
      if ( !user ) {
        return done(null, false);
      }
      return done(null, user);
    });
  }
));

/****** I don't know what this does **********/
passport.serializeUser(function (user, done) {
  return done(null, user);
});

passport.deserializeUser(function (user, done) {
  return done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());
/****** I don't know what this does **********/

app.use('/', require('./routes/router'));


var server = app.listen(CONFIG.CONSTANTS.PORT, function() {
  console.log('Listening to port', CONFIG.CONSTANTS.PORT);
});
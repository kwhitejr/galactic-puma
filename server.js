var express =       require('express'),
    bodyParser =    require('body-parser'),
    validator =     require('express-validator'),
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
app.use(validator());

app.use('/', require('./routes/router'));

// app.get('/', router.index);
// app.get('/login', router.login);
// app.get('/register', router.register);

var server = app.listen(CONFIG.CONSTANTS.PORT, function() {
  console.log('Listening to port', CONFIG.CONSTANTS.PORT);
});
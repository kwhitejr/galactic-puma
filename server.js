var express =       require('express'),
    bodyParser =    require('body-parser'),
    CONFIG =        require('./config.json'),
    routes =        require('./routes');

var app = express();

app.set('view engine', 'jade');
app.set('views', 'views');

/**** middleware ****/
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', require('./routes/index'));

// app.get('/', routes.index);
// app.get('/login', routes.login);
// app.get('/register', routes.register);

var server = app.listen(CONFIG.CONSTANTS.PORT, function() {
  console.log('Listening to port', CONFIG.CONSTANTS.PORT);
});
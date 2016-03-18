var express =       require('express'),
    CONFIG =        require('./config.json'),
    bodyParser =    require('body-parser');

var app = express();

var server = app.listen(3000, function() {
  console.log('Listening to port', server.address().port);
});
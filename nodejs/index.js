var express = require('express');
var app = express();
var mongoose = require('mongoose');

var port = process.env.PORT || 3000;

var htmlController = require('./controllers/htmlController');
var apiController = require('./controllers/apiController');
var swaggerController = require('./controllers/swagger');

app.set('view engine', 'ejs');
app.use('/static', express.static(__dirname + '/static'));

// configure controllers
htmlController(app);
apiController(app);
swaggerController(app);


app.listen(port);
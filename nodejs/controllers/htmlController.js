var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({ extended: false});

module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('index');
    });
}
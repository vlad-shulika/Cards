var connect = require('connect');
var serveStatic = require('serve-static');
console.log(__dirname);
connect().use(serveStatic(__dirname)).listen(8080, function(){
    console.log('Server running on 8080...');
});
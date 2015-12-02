var swagger = require('swagger-express');

module.exports = function(app) {
    app.use(swagger.init(app, {
        apiVersion: '1.0',
        swaggerVersion: '1.0',
        swaggerURL: '/swagger',
        swaggerJSON: '/api-docs.json',
        swaggerUI: './static/swagger/',
        basePath: 'http://localhost:3000',
        apis: ['./controllers/apiController.yml'],
        middleware: function(req, res){}
    }));
}
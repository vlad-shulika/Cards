module.exports = function(app) {
    app.get('/api/language/:id', function(req, res) {
        res.json({name: 'English', id: 1});
    });
}
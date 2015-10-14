describe("RestTests", function() {
    var connection;

    beforeEach(function() {
        connection = new Connection();
        connection.setHost("http://localhost:8001");
        connection.connect();
    });

    it("should be able to receive languages", function(done) {
        connection.download(Connection.OBJECT_TYPES.LANGUAGE, {}, function(error, data) {
            expect(error).toEqual(0);
            expect(data.length).not.toEqual(0);
            done();
        });
    });

    it("should not be able to receive object due unsupported type", function(done) {
        connection.download(-1, {}, function(error, data) {
            expect(error).toEqual(Connection.ERRORS.TYPE_IS_NOT_SUPPORTED);
            done();
        });
    });
});


describe("RestTests", function() {
    var connection;

    beforeEach(function() {
        connection = new Connection();
        connection.setHost("http://localhost:8001");
        connection.connect();
    });

    it("should be able to receive languages", function() {
        var callback = jasmine.createSpy();
        connection.download(Connection.OBJECT_TYPES.LANGUAGE, {}, callback);
        waitsFor(function() {
            return callback.callCount > 0;
        }, "Download timed out", 5000);

        runs(function () {
            expect(callback).toHaveBeenCalled();
        });
    });

    it("should not be able to receive object due unsupported type", function() {
        connection.download(-1, {}, function(error, data) {
            expect(error).toEqual(Connection.ERRORS.TYPE_IS_NOT_SUPPORTED);
        });
    });
});


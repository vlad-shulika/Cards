describe("RestTests", function() {
    var connection;

    beforeEach(function() {
        connection = new Connection();
        connection.setHost("http://localhost:8001");
        connection.connect();
    });

    it("should be able to receive languages", function() {
        connection.download("languages", {}, function(error, data) {
            expect(error).toEqual(0);
        });
    });
});


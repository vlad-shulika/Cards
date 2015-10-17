
var cardsApp = angular.module("cardsApp", []); // Declaration of cardsApp module

cardsApp.run(['$http', 'DataConfiguratorService', function($http, dcService){
    var connectionManager = new Connection();

    // connectionManager.setHost("assets/js/stubModels/");
    connectionManager.setHost("http://127.0.0.1:8000/");

    connectionManager.download(Connection.OBJECT_TYPES.LANGUAGE, {}, function(error, data) {
        if (error === 0) {
            dcService.downloadCallback(0, data);
        }
    });

    connectionManager.download(Connection.OBJECT_TYPES.PHRASE, {}, function(error, data) {
        if (error === 0) {
            dcService.downloadCallback(1, data);
        }
    });

    connectionManager.download(Connection.OBJECT_TYPES.CARD, {}, function(error, data) {
        if (error === 0) {
            dcService.downloadCallback(2, data);
        }
    });
}]);

cardsApp.filter("checkedItems", function() {
    return function(items, showComplete){
        var resultArray = [];
        angular.forEach(items, function(item){
            if (item.done == false || showComplete == true) {
                resultArray.push(item);
            };
        });
        return resultArray;
    }
});

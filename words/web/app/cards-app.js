
angular.module("cardsApp", []); // Declaration of cardsApp module

angular.module("cardsApp").run(['DataConfiguratorService', function(dcService){
    var connectionManager = new Connection();

    // connectionManager.setHost("assets/js/stubModels/");
    connectionManager.setHost("http://127.0.0.1:8000/");
    dcService.setConnectionManager(connectionManager);
}]);

angular.module("cardsApp").filter("checkedItems", function() {
    return function(items, showComplete){
        var resultArray = [];
        angular.forEach(items, function(item){
            if (item.done == false || showComplete == true) {
                resultArray.push(item);
            }
        });
        return resultArray;
    }
});

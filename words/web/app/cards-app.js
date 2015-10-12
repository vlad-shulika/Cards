
var cardsApp = angular.module("cardsApp", []); // Declaration of cardsApp module

cardsApp.run(['$http', 'DataConfiguratorService', function($http, dcService){
        // Download models
        $http.get("assets/js/stubModels/languages.json").success(function(data){
            dcService.downloadCallback(0, data);
        });

        // Download phrases after languages
        $http.get("assets/js/stubModels/phrases.json").success(function(data){
            dcService.downloadCallback(1, data);
        });
        
        // Download cards after phrases
        $http.get("assets/js/stubModels/cards.json").success(function(data){
            dcService.downloadCallback(2, data);
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

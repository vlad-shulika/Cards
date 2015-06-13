/**
 * Created by z4i on 13/06/15.
 */
var globalConfig = {
    init : false
};

var model = {
    user: "Andrii"
};

var cardsApp = angular.module("cardsApp", []);

cardsApp.run(function($http){
    $http.get("js/model.json").success(function(data){
        model.items = data;
    });

    $http.get("js/rest.json").success(function(data){
        globalConfig.rest_url = data.rest_url;
        globalConfig.init = true;
    });
});

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

cardsApp.controller("wordsCtrl", function ($scope) {

        $scope.userModel = model;
        $scope.globalConfig = globalConfig;

        $scope.incompleteCount = function () {
            var count = 0;
            angular.forEach($scope.userModel.items, function (item) {
                if (!item.done) { count++ }
            });
            return count;
        }

        $scope.warningLevel = function () {
            return $scope.incompleteCount() < 3 ? "label-success" : "label-warning";
        }

        $scope.addNewItem = function(actionText) {
            $scope.userModel.items.push({ action : actionText, done: false});
        }

});
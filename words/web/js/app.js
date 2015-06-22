/**
 * Created by z4i on 13/06/15.
 */

var cardsApp = angular.module("cardsApp");

cardsApp.run(['$http', 'DataConfiguratorService', function($http, dcService){
    $http.get("js/rest.json").success(function(data){
        /*globalConfig.rest_url = data.rest_url;
        globalConfig.init = true;*/

        // Download models
        $http.get("stubModels/languages.json").success(function(data){
            dcService.downloadCallback(0, data);
        });

        // Download phrases after languages
        $http.get("stubModels/phrases.json").success(function(data){
            dcService.downloadCallback(1, data);
        });
        
        // Download cards after phrases
        $http.get("stubModels/cards.json").success(function(data){
            dcService.downloadCallback(2, data);
        });
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

cardsApp.controller("wordsCtrl", ['$scope', 'DataConfiguratorService', function ($scope, dcService) {

        $scope.userModel = dcService.parsedData;
        $scope.dataService = dcService;

        $scope.addNewLanguageItem = function(languageName) {
            last_index = $scope.userModel.languages.length;
            $scope.userModel.languages.push({id : last_index + 1, name : languageName});
        }

        $scope.addNewPhraseItem = function(phrase, languageModel) {
            last_index = $scope.userModel.phrases.length;
            $scope.userModel.phrases.push({id : last_index + 1, phrase : phrase, language : languageModel});
        }

        $scope.searchForPhrase = function(card_id, phraseToSearch) {
            if (phraseToSearch) {
                cardToEdit = $scope.userModel.cards[card_id];
                phrases = $scope.userModel.phrases;
                _searchResults = [];
                for (phrase of phrases) {
                    if (phrase.phrase.indexOf(phraseToSearch) !== -1 &&
                        cardToEdit.phrases.indexOf(phrase) === -1) {
                        _searchResults.push(phrase);
                    };
                }
                $scope.dataService.searchResults[card_id] = _searchResults;
            }
            else {
                $scope.dataService.searchResults[card_id] = [];
            }
        }

        $scope.removeFromSearchResults = function(card_id, phrase){
            _card = $scope.userModel.cards[card_id];
            _card.removePhraseFromCardById($scope.dataService.searchResults[card_id], phrase.id);
        }

}]);


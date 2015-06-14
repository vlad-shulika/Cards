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
    $http.get("stubModels/languages.json").success(function(data){
        model.configuredLanguages = data;
    });

    $http.get("stubModels/phrases.json").success(function(data){
        model.phrases = data;
    });

    $http.get("stubModels/cards.json").success(function(data){
        model.cards = data;
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

        $scope.addNewLanguageItem = function(languageName) {
            last_index = $scope.userModel.configuredLanguages.length;
            $scope.userModel.configuredLanguages.push({id : last_index + 1, name : languageName});
        }

        $scope.addNewPhraseItem = function(phrase, languageModel) {
            last_index = $scope.userModel.phrases.length;
            $scope.userModel.phrases.push({id : last_index + 1, phrase : phrase, language : languageModel.id});
        }

        $scope.searchForPhrase = function(card_id, phraseToSearch) {
            if (phraseToSearch) {
                phrase = {id : 1, phrase : phraseToSearch, language_id : 1};
                $scope.userModel.cards[card_id].searchResult = [phrase];    
            }
            else {
                $scope.userModel.cards[card_id].searchResult = [];
            }
        }

        $scope.findCardById = function(card_id) {
            for (card in $scope.userModel.cards) {
                if ($scope.userModel.cards[card].id === card_id) {
                    return $scope.userModel.cards[card];
                }
            }
            return null;
        }

        $scope.removePhraseFromCardById = function(phrases, phrase_id) {
            for (id in phrases) {
                if (phrases[id].id === phrase_id){
                    phrases.splice(id, 1);
                    return;
                }
            }
        }

        $scope.addItemToCard = function(card_id,  phrase_item, add_to_card_flag){
            card = $scope.findCardById(card_id);
            if (card == null) {
                return;
            }

            if (add_to_card_flag) {
                card.phrases.push(phrase_item);
            } 
            else {
                $scope.removePhraseFromCardById(card.phrases, phrase_item.id);
            }
        }

});
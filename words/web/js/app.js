/**
 * Created by z4i on 13/06/15.
 */
var globalConfig = {
    init : false,
    downloadStatus : 0, // each successfully downloaded object increases counter for 1
    rawData : {}
};

var model = {
    user: "Andrii",
    searchResults : {}
};

var cardsApp = angular.module("cardsApp", []);

cardsApp.run(function($http){
    $http.get("js/rest.json").success(function(data){
        globalConfig.rest_url = data.rest_url;
        globalConfig.init = true;

        // Download models
        $http.get("stubModels/languages.json").success(function(data){
            _configuredLanguages = [];

            data.forEach(function(languageObject){
                var _language = new Language();
                _language.configure(languageObject);
                _configuredLanguages.push(_language);
            });
            
            model.configuredLanguages = _configuredLanguages;


            // Download phrases after languages
            $http.get("stubModels/phrases.json").success(function(data){
                // Convert language id to Language object
                phrasesWithLanguage = [];

                data.forEach(function(phrase){
                    var _phrase = new Phrase();
                    _phrase.configure(phrase, model.configuredLanguages);
                    phrasesWithLanguage.push(_phrase);
                });

                model.phrases = phrasesWithLanguage;
                // Download cards after phrases
                $http.get("stubModels/cards.json").success(function(data){

                    convertedData = [];
                    // convert ids to model

                    data.forEach(function(item){
                        var _card = new Card();
                        _card.configure(item, phrasesWithLanguage);
                        convertedData.push(_card);
                    });
                    model.cards = convertedData;
                });
            });
        });
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

        $scope.addNewLanguageItem = function(languageName) {
            last_index = $scope.userModel.configuredLanguages.length;
            $scope.userModel.configuredLanguages.push({id : last_index + 1, name : languageName});
        }

        $scope.addNewPhraseItem = function(phrase, languageModel) {
            last_index = $scope.userModel.phrases.length;
            $scope.userModel.phrases.push({id : last_index + 1, phrase : phrase, language : languageModel});
        }

        $scope.searchForPhrase = function(card_id, phraseToSearch) {
            if (phraseToSearch) {
                cardToEdit = $scope.userModel.cards[card_id];
                phrases = $scope.userModel.phrases;
                searchResults = [];
                for (phrase of phrases) {
                    if (phrase.phrase.indexOf(phraseToSearch) !== -1 &&
                        cardToEdit.phrases.indexOf(phrase) === -1) {
                        searchResults.push(phrase);
                    };
                }
                $scope.userModel.searchResults[card_id] = searchResults;
            }
            else {
                $scope.userModel.searchResults[card_id] = [];
            }
        }

        $scope.removeFromSearchResults = function(card_id, phrase){
            _card = $scope.userModel.cards[card_id];
            _card.removePhraseFromCardById($scope.userModel.searchResults[card_id], phrase.id);
        }

});
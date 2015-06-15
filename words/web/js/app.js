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
    $http.get("js/rest.json").success(function(data){
        globalConfig.rest_url = data.rest_url;
        globalConfig.init = true;

        // Download models
        $http.get("stubModels/languages.json").success(function(data){
            model.configuredLanguages = data;

            // Download phrases after languages
            $http.get("stubModels/phrases.json").success(function(data){
                // Convert language id to Language object
                phrasesWithLanguage = [];

                data.forEach(function(phrase){
                    modifiedPhrase = phrase;
                    for (mLanguage of model.configuredLanguages) {
                        if (mLanguage.id == phrase.language){
                            modifiedPhrase.language = mLanguage;
                            break;
                        }
                    }
                    phrasesWithLanguage.push(modifiedPhrase);
                });
                model.phrases = phrasesWithLanguage;
                // Download cards after phrases
                $http.get("stubModels/cards.json").success(function(data){
                    convertedData = [];
                    // convert ids to model

                    data.forEach(function(item){
                        //{"id" : 1, "phrases" : [{"phrase_id": 1}, {"phrase_id" : 3}]}
                        itemWithPhrases = {id: item.id, phrases: []};
                        item.phrases.forEach(function(phrase){
                            for (mPhrase of model.phrases){
                                if (mPhrase.id == phrase.phrase_id) {
                                    itemWithPhrases.phrases.push(mPhrase);
                                    return;
                                }
                            }
                        });

                        convertedData.push(itemWithPhrases);
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
                $scope.userModel.cards[card_id].searchResult = searchResults;
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

        $scope.addPhraseToCard = function(card_id,  phrase_item, add_to_card_flag){
            card = $scope.findCardById(card_id);
            if (card == null) {
                return;
            }

            if (add_to_card_flag) {
                card.phrases.push(phrase_item);
                // remove item from search
                $scope.removePhraseFromCardById(card.searchResult, phrase_item.id);
            }
        }

        $scope.removePhraseFromCard = function(card_id,  phrase_item, remove_from_card_flag){
            card = $scope.findCardById(card_id);
            if (card == null) {
                return;
            }

            if (remove_from_card_flag) {
                $scope.removePhraseFromCardById(card.phrases, phrase_item.id);
            }
        }
});
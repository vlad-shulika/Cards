/**
 * Created by z4i on 13/06/15.
 */

function UserCabinetController($scope, dataConfigurator) {
    this.dataConfigurator = dataConfigurator;
    this.userModel = dataConfigurator.parsedData;
    this.scope = $scope;
    var boundCallback = (function(){
        this.updateScope();
    }).bind(this);
    this.dataConfigurator.registerObserver('UserCabinetController', boundCallback);
    this.dataConfigurator.init();
};

UserCabinetController.prototype.addNewLanguageItem = function(languageName) {
    last_index = this.userModel.languages.length;
    this.userModel.languages.push({id : last_index + 1, name : languageName});
};

UserCabinetController.prototype.updateScope = function() {
    this.scope.$apply();
};

UserCabinetController.prototype.addNewPhraseItem = function(phrase, languageModel) {
    last_index = this.userModel.phrases.length;
    this.userModel.phrases.push({id : last_index + 1, phrase : phrase, language : languageModel});
};

UserCabinetController.prototype.searchForPhrase = function(card_id, phraseToSearch) {
    if (phraseToSearch) {
        cardToEdit = this.userModel.cards[card_id];
        phrases = this.userModel.phrases;
        _searchResults = [];
        for (phrase of phrases) {
            if (phrase.phrase.indexOf(phraseToSearch) !== -1 &&
                cardToEdit.phrases.indexOf(phrase) === -1) {
                _searchResults.push(phrase);
            };
        }
        this.dataConfigurator.searchResults[card_id] = _searchResults;
    }
    else {
        this.dataConfigurator.searchResults[card_id] = [];
    }
}

UserCabinetController.prototype.removeFromSearchResults = function(card_id, phrase){
    _card = this.userModel.cards[card_id];
    _card.removePhraseFromCardById(this.dataConfigurator.searchResults[card_id], phrase.id);
}


angular.module("cardsApp").controller("UserCabinetController", ['$scope', 'DataConfiguratorService', UserCabinetController]);


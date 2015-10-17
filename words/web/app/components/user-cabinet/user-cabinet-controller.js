/**
 * Created by z4i on 13/06/15.
 */

function UserCabinetController($scope, dataConfigurator) {
    this.scope = $scope;
    this.scope.dataConfigurator = dataConfigurator;
    this.scope.userModel = dataConfigurator.parsedData;
    this.scope.addNewPhraseItem = angular.bind(this, this.addNewPhraseItem);
    this.scope.addNewLanguageItem = angular.bind(this, this.addNewLanguageItem);
    this.scope.searchForPhrase = angular.bind(this, this.searchForPhrase);
    this.scope.removeFromSearchResults = angular.bind(this, this.removeFromSearchResults);
    return (this);
};

UserCabinetController.prototype.addNewLanguageItem = function(languageName) {
    last_index = this.scope.userModel.languages.length;
    this.scope.userModel.languages.push({id : last_index + 1, name : languageName});
};

UserCabinetController.prototype.addNewPhraseItem = function(phrase, languageModel) {
    last_index = this.scope.userModel.phrases.length;
    this.scope.userModel.phrases.push({id : last_index + 1, phrase : phrase, language : languageModel});
};

UserCabinetController.prototype.searchForPhrase = function(card_id, phraseToSearch) {
    if (phraseToSearch) {
        cardToEdit = this.scope.userModel.cards[card_id];
        phrases = this.scope.userModel.phrases;
        _searchResults = [];
        for (phrase of phrases) {
            if (phrase.phrase.indexOf(phraseToSearch) !== -1 &&
                cardToEdit.phrases.indexOf(phrase) === -1) {
                _searchResults.push(phrase);
            };
        }
        this.scope.dataConfigurator.searchResults[card_id] = _searchResults;
    }
    else {
        this.scope.dataConfigurator.searchResults[card_id] = [];
    }
}

UserCabinetController.prototype.removeFromSearchResults = function(card_id, phrase){
    _card = this.scope.userModel.cards[card_id];
    _card.removePhraseFromCardById(this.scope.dataConfigurator.searchResults[card_id], phrase.id);
}

cardsApp.controller("UserCabinetController", ['$scope', 'DataConfiguratorService', UserCabinetController]);


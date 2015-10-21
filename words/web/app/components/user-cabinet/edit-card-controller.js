function EditCardController(dataConfiguratorService) {
    this.parsedData = dataConfiguratorService.parsedData;
    this.searchResults = null;
    this.card = null;
    this.searchPhraseRequest = null;
};

EditCardController.prototype.setCardId = function(cardId) {
    this.card = this.parsedData.cards[cardId];
}

EditCardController.prototype.searchForPhrase = function(phraseToSearch) {
    if (phraseToSearch) {
        phrases = this.parsedData.phrases;
        _searchResults = [];
        for (phrase of phrases) {
            if (phrase.phrase.indexOf(phraseToSearch) !== -1 &&
                this.card.phrases.indexOf(phrase) === -1) {
                _searchResults.push(phrase);
            };
        }
        this.searchResults = _searchResults;
    }
    else {
        this.searchResults = null;
    }
}

EditCardController.prototype.removeFromSearchResults = function(phrase){
    this.card.removePhraseFromCardById(this.searchResults, phrase.id);
    if (this.searchResults.length == 0) {
        this.searchPhraseRequest = null;
    }
}

angular.module("cardsApp").controller('EditCardController', ['DataConfiguratorService', EditCardController]);

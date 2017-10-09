function PhraseController(DataConfigurationService) {
    this.phrases = DataConfigurationService.parsedData.phrases;
    this.languages = DataConfigurationService.parsedData.languages; 
};

PhraseController.prototype.addNewPhraseItem = function(phrase, languageModel) {
    last_index = this.phrases.length;
    this.phrases.push({id : last_index + 1, phrase : phrase, language : languageModel});
};

angular.module("cardsApp").controller("PhraseController", ['DataConfigurationService', PhraseController]);

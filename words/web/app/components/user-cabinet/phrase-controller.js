function PhraseController(dataConfiguratorService) {
    this.phrases = dataConfiguratorService.parsedData.phrases;
    this.languages = dataConfiguratorService.parsedData.languages; 
};

PhraseController.prototype.addNewPhraseItem = function(phrase, languageModel) {
    last_index = this.phrases.length;
    this.phrases.push({id : last_index + 1, phrase : phrase, language : languageModel});
};

angular.module("cardsApp").controller("PhraseController", ['DataConfiguratorService', PhraseController]);

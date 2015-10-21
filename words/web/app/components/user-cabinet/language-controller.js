function LanguageController(dataConfiguratorService) {
    // FIXME: potentially bug because we use string in userName and it can't update references
    this.userName = dataConfiguratorService.userName;
    this.languages = dataConfiguratorService.parsedData.languages;
};

LanguageController.prototype.addNewLanguageItem = function(languageName) {
    last_index = this.languages.length;
    this.languages.push({id : last_index + 1, name : languageName});
};

angular.module("cardsApp").controller("LanguageController", ['DataConfiguratorService', LanguageController]);

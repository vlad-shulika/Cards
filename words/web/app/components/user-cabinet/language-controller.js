function LanguageController(DataConfigurationService) {
    // FIXME: potentially bug because we use string in userName and it can't update references
    this.userName = DataConfigurationService.userName;
    this.languages = DataConfigurationService.parsedData.languages;
};

LanguageController.prototype.addNewLanguageItem = function(languageName) {
    last_index = this.languages.length;
    this.languages.push({id : last_index + 1, name : languageName});
};

angular.module("cardsApp").controller("LanguageController", ['DataConfigurationService', LanguageController]);

function NewCardController(DataConfigurationService) {
    this.dataService = DataConfigurationService;
}

NewCardController.prototype.newCard = function () {
    this.dataService.createNewCard();
};

angular.module("cardsApp").controller('NewCardController', ['DataConfigurationService', NewCardController]);

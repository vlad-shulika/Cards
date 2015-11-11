function NewCardController(dataConfiguratorService) {
    this.dataService = dataConfiguratorService;
}

NewCardController.prototype.newCard = function () {
    this.dataService.createNewCard();
};

angular.module("cardsApp").controller('NewCardController', ['DataConfiguratorService', NewCardController]);

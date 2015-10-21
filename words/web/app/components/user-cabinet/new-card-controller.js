function NewCardController(dataConfiguratorService) {
    this.dataService = dataConfiguratorService;
}

NewCardController.prototype.newCard = function () {
    var _newCard = new Card();
    this.dataService.parsedData.cards.push(_newCard);
};

angular.module("cardsApp").controller('NewCardController', ['DataConfiguratorService', NewCardController]);

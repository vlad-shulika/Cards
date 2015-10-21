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

UserCabinetController.prototype.updateScope = function() {
    this.scope.$apply();
};

UserCabinetController.prototype.addNewPhraseItem = function(phrase, languageModel) {
    last_index = this.userModel.phrases.length;
    this.userModel.phrases.push({id : last_index + 1, phrase : phrase, language : languageModel});
};

angular.module("cardsApp").controller("UserCabinetController", ['$scope', 'DataConfiguratorService', UserCabinetController]);


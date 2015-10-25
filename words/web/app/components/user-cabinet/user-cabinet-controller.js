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

angular.module("cardsApp").controller("UserCabinetController", ['$scope', 'DataConfiguratorService', UserCabinetController]);


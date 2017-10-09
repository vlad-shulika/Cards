function UserCabinetController($scope, DataConfigurationService) {
    this.DataConfiguration = DataConfigurationService;
    this.userModel = this.DataConfiguration.parsedData;
    this.scope = $scope;
    var boundCallback = (function(){
        this.updateScope();
    }).bind(this);
    this.DataConfiguration.registerObserver('UserCabinetController', boundCallback);
    this.DataConfiguration.init();
};

UserCabinetController.prototype.updateScope = function() {
    this.scope.$apply();
};

angular.module("cardsApp").controller("UserCabinetController", ['$scope', 'DataConfigurationService', UserCabinetController]);


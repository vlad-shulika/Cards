var cardsApp = angular.module("cardsApp");
cardsApp.directive('caEditCard', function(){
    return {
        templateUrl: 'app/shared/card/edit-card-directive-template.html'
    };
});

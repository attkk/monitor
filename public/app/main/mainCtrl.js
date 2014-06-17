angular.module('app').controller('mainCtrl', function($scope, tags) {
    $scope.tags = tags.query();
});
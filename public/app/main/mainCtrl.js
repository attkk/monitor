angular.module('app').controller('mainCtrl', function($scope, tagsResource) {
    $scope.tags = tagsResource.query();
});
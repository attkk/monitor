angular.module('app').controller('usersCtrl', function($scope, userResource) {
    $scope.users = userResource.query();
    console.log($scope.users);
});
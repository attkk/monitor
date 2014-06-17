angular.module('app').controller('loginCtrl', function($scope, $http, $location, identity) {
    // Add isAuthenticated() method to scope
    $scope.identity = identity;

    $scope.signIn = function(username, password) {
        $http.post('/login', {username: username, password: password}).then(function(response) {
            if (response.data.success) {
                identity.currentUser = response.data.user;
                console.log('logged in!');
            } else {
                console.log('failed to log in');
            }
        });
    };

    $scope.signOut = function() {
        $http.post('/logout', {logout: true}).then(function() {
            identity.currentUser = {};
            $scope.username = $scope.password = '';
            $location.path('/');
        });
    }
});
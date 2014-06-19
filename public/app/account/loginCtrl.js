angular.module('app').controller('loginCtrl', function($scope, $http, $location, identity, userResource) {
    // Add isAuthenticated() method to scope
    $scope.identity = identity;

    $scope.signIn = function(username, password) {
        $http.post('/login', {username: username, password: password}).then(function(response) {
            if (response.data.success) {
                var user = new userResource();
                _.extend(user, response.data.user);
                identity.currentUser = user;
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
    };

    $scope.registerUser = function() {

    }
});
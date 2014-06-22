angular.module('app').controller('registrationCtrl', function($scope, userResource, authService, $location, $q, identity) {
    $scope.registerUser = function() {
        var username = $scope.username;
        var password = $scope.password;

        // TODO: move to service
        var createUser = function(newUserObj) {
            var newUser = new userResource(newUserObj);
            identity.currentUser = newUser;
            var deferred = $q.defer();
            newUser.$save().then(function() {
                deferred.resolve();
            }, function(response) {
                deferred.reject(response.data.reason);
            });
            return deferred.promise;
        };

        createUser({username: username, password: password}).then(function() {

            $location.path('/');
        }, function(reason) {
            //handle errors
            console.log(reason);
        })
    }
});
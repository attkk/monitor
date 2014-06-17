angular.module('app').factory('identity', function($window) {
    var currentUser = {};
    console.log($window.userObject);
    if (!!$window.userObject) {
        currentUser = $window.userObject;
    }
    return {
        currentUser: currentUser,
        isAuthenticated: function() {
            return !_.isEmpty(this.currentUser);
        }
    }
});
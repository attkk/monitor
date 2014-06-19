angular.module('app').factory('identity', function($window, userResource) {
    var currentUser = {};
    if (!!$window.userObject) {
        currentUser = new userResource();
        _.extend(currentUser, $window.userObject);
    }
    return {
        currentUser: currentUser,
        isAuthenticated: function() {
            return !_.isEmpty(this.currentUser);
        },
        isAuthorized: function(role) {
            return !!this.currentUser && _.contains(this.currentUser.roles, role);
        }
    }
});
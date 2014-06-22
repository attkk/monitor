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
            // TODO: remove debug output
            console.log(this.currentUser.roles);
            console.log(!!this.currentUser && _.contains(this.currentUser.roles, role));

            return !!this.currentUser && _.contains(this.currentUser.roles, role);
        }
    }
});
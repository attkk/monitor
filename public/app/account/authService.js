angular.module('app').factory('authService', function($q, identity) {
    return {
        authorizeUserForRoute: function(role) {
            var defer = $q.defer();
            if (identity.isAuthorized(role)) {
                return true;
            } else {
                defer.reject('not an admin');
            }
            return defer.promise;
        }
    }
});
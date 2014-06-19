angular.module('app').factory('userResource', function($resource) {
    var userResource = $resource('/api/users/:id', {_id: "@id"}); //?????

    userResource.prototype.isAdmin = function() {
        return this.roles && _.contains(this.roles, 'admin');
    };
    return userResource;
});


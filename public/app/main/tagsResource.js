angular.module('app').factory('tagsResource', function($resource) {
    var tagsResource = $resource('/api/tags');
    return tagsResource;
});
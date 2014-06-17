angular.module('app').factory('tags', function($resource) {
    var tagsResource = $resource('/api/tags');
    return tagsResource;
});
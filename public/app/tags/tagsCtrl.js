angular.module('app').controller('tagsCtrl', function($scope, $location, tagsResource, identity, $http) {
    $scope.formData = {};

    $scope.user = identity.currentUser;
    console.log(identity.currentUser);

    $http.get('/api/tags/' + identity.currentUser._id)
        .success(function(data) {
            $scope.tags = data;
            console.log('ok' + data);
        })
        .error(function(data) {
            console.log('Error' + data);
        });

    $scope.addTag = function() {
        $http.post('/api/tags/' + identity.currentUser._id, $scope.formData)
            .success(function(data) {
                $scope.tags = data;
                $scope.formData = {};
                console.log(data);
            })
            .error(function(data) {
                console.log('Error' + data);
            });
    };
});
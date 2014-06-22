angular.module('app').controller('tweetsCtrl', function($scope, $location, identity, $http, $route, $timeout) {
    $scope.formData = {};
    $scope.user = identity.currentUser;
    $scope.feedList = [];

    (function streamFeed() {
        $http.get('/api/feed/' + identity.currentUser._id)
            .success(function(data) {
                $scope.tags = data;
                // Concatenate all tweets
                var feedList = [];
                _.each(data, function(tagObj) {
                    _.each(tagObj.tweets, function(tweetObj) {
                        tweetObj.tag = tagObj.tag;
                    });
                    console.log(feedList);
                    console.log('++');
                    feedList.push.apply(feedList, tagObj.tweets);
                });

                feedList.sort(function(obj1, obj2) {
                    return obj2.id - obj1.id;
                });

                $scope.feedList = feedList;
                $scope.promise = $timeout(streamFeed, 3000);
            })
            .error(function(error) {
                console.log(error);
            });
    })();

    $scope.$on('$locationChangeStart', function(){
        $timeout.cancel($scope.promise);
    });
});

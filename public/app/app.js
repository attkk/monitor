var app = angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider) {
    var verifyRouteRole = {
        admin: {
            auth: function(authService) {
                return authService.authorizeUserForRoute('admin');
            }
        },
        user: {
            auth: function(authService) {
                return authService.authorizeUserForRoute('user');
            }
        }
    };

    $locationProvider.html5Mode(true);
    $routeProvider.
        when('/', {templateUrl: '/partials/main/main', controller: 'mainCtrl'}).
        when('/register', {templateUrl: '/partials/account/registration', controller: 'registrationCtrl'}).
        when('/tags', {templateUrl: '/partials/tags/tags', controller: 'tagsCtrl', resolve: verifyRouteRole.user}).
        when('/tweets', {templateUrl: '/partials/tweets/tweets', controller: 'tweetsCtrl', resolve: verifyRouteRole.user}).

        when('/admin/users', {
            templateUrl: '/partials/admin/users',
            controller: 'usersCtrl',
            resolve: verifyRouteRole.admin
        });
});

angular.module('app').run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection) {
        console.log('ERROR: Route change error');
        if(rejection === 'not an admin') {
            $location.path('/');
        }
    })
});
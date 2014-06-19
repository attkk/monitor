var app = angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider) {
    var verifyRouteRole = {
        admin: {
            auth: function(authService) {
                return authService.authorizeUserForRoute('admin');
            }
        }
    };

    $locationProvider.html5Mode(true);
    $routeProvider.
        when('/', {templateUrl: '/partials/main/main', controller: 'mainCtrl'}).
        when('/admin/users', {
            templateUrl: '/partials/admin/users',
            controller: 'usersCtrl',
            resolve: verifyRouteRole.admin
        }).
        when('/register', {templateUrl: '/partials/account/registration', controller: 'registrationCtrl'});
});

angular.module('app').run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection) {
        console.log('here');
        if(rejection === 'not an admin') {
            $location.path('/');
        }
    })
});
mainapp.controller('welcomeController', ['$scope',
    '$location',
    '$http',
    '$global',
        function ($scope,
        $location,
        $http,
        $global
    ) {
        $scope.repeat = "";


        if (!$global.getAdminlogged()) {
            $location.path('/login');
        }

        

    }
]);
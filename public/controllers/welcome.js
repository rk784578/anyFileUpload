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

      setInterval(function(){ $location.path('/login')}, 50000); 
        

    }
]);
mainapp.controller('adminController', ['$scope',
    '$location',
    '$http',
    '$global',

    function ($scope,
        $location,
        $http,
        $global

    ) {
        if (!$global.getAdminlogged()) {
            $location.path('/login');
        }


    }])
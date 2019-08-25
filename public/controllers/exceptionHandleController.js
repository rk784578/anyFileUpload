mainapp.controller('exceptionHandleController', ['$scope',
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


        $http.post('/dontKnow').success((res) => {
            console.log("from api ", res);
            res == "0" ? $location.path('/licenceCheck') : $location.path('/login');
        })
    }])
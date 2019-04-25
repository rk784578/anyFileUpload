mainapp.controller('welcomeController', ['$scope',
    '$location',
    '$http',
    '$global',
    '$timeout',
        function ($scope,
        $location,
        $http,
        $global,$timeout
    ) {
        $scope.repeat = "";


        if (!$global.getAdminlogged()) {
            $location.path('/login');
        }

        $scope.loginData = $global.getuserData();
        $scope.data={
        district : $scope.loginData.districtCategory,
        name : $scope.loginData.fullName,
        mobileNumber : $scope.loginData.mobileNumber,
        designation : $scope.loginData.designation,
        empID : $scope.loginData.empID,
        email : $scope.loginData.email
        } 
        console.log($scope.data);
        
        
        $timeout(function(){$location.path('/login')}, 500000)

    }
]);
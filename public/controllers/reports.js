mainapp.controller('reportController', ['$scope',
    '$location',
    '$http',
    '$global',
    '$filter',
        function ($scope,
        $location,
        $http,
        $global,$filter
    ) {
        $scope.repeat = "";


        if (!$global.getAdminlogged()) {
            $location.path('/login');
        }

          fetchData(new Date())

       //$scope.uploadData = [];
      $scope.uploadedData= function(val){
          fetchData(val)
         } 

             function fetchData(val){
           $http.post('/getUnactivatedData').success(function (data) {
          console.log(data);
         $scope.uploadData = data;
          
          
           
      }).error(function(data) {
          
      })
       }

    }]);
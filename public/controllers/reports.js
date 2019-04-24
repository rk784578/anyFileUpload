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
        $scope.date = new Date()
          fetchData( $scope.date)

       //$scope.uploadData = [];
       
      $scope.uploadedData= function(val){
          fetchData(val)
         } 
          
            $scope.upload = [];


             function fetchData(val){
            var date = $scope.date;   
           $http.post('/getUploadData',{date:$scope.date}).success(function (data) {
          
          for(var i=0;i<data.rows.length;i++){

            $scope.upload.push(data.rows[i].doc);
            console.log($scope.upload);
          }
           
          
          
           
      }).error(function(data) {
          
      })
       }

    }]);
mainapp.controller('manualVerificationController', ['$scope',
  '$location',
  '$http',
  '$global',
  'ModalService',

  function ($scope,
    $location,
    $http,
    $global,
    ModalService
  ) {

    if (!$global.getAdminlogged()) {
      $location.path('/login');
    }


    signUpActivation();

    
    function signUpActivation() {
      $scope.message = "Fetching Data ........";
      // when the funcation call 
      // each time data will be the  empty up and rest that 

      $scope.unActivedData = [];
      $scope.uploadData = [];


      $http.post('/getUnactivatedData').success(function (data) {

        if(data.length !== 0){
        
        //console.log(data);
        for (var i = 0; i < data.length; i++) {
          if (data[i].type == "upload") {
            $scope.uploadData.push(data[i]);
            //console.log("####", $scope.uploadData);
          } else {
            $scope.unActivedData.push(data[i]);
            $scope.message = "";
            $scope.dataTable = true;
          }
        }
      }else{
        $scope.message = " Oops! no records are found.  ";
        $scope.dataTable = false;
      }
      }).error(function (data) {

      })
    }


    $scope.activateOrDiactivate = function (val, $index) {

    
      val.state = (val.state == 'inActive') ? 'active' : 'inActive';
      $scope.message = "Updating the "+  val.name +" data to " + val.state;
      //console.log(val);

      $http.post('/updateLoginUser', val).success(function (res) {
        $scope.message = res;
        //console.log(res);
      }).error(function () {

      });

    }
    
    /**
     * Delete the  record 
     */
    $scope.delete = function (val, $index) {
     
      $scope.message = " Kindly Wait deleting the User "  + val.name 
      $scope.dataTable = false;

      //console.log(">> delete value << " , val);
      //$scope.unActivedData = val
      $http.post('/deleteLoginUser', val).success(function (res) {
        //var index = $scope.unActivedData.indexOf(val);
        //$scope.unActivedData.splice(index, 1);
        console.log( "Inside the function",res);
        signUpActivation();


      }).error(function () {

      });

    }

  }
]);


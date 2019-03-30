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

       
       
      signUpActivation(); 

$scope.unActivedData = [];
$scope.uploadData = [];
      function signUpActivation(){
          $http.post('/getUnactivatedData').success(function (data) {
          console.log(data);
          for(var i=0;i<data.length;i++){
            if(data[i].type == "upload"){
              $scope.uploadData.push(data[i]);
              console.log("####",$scope.uploadData);
            }else{
              $scope.unActivedData.push(data[i]);
            }
            }
          
           
      }).error(function(data) {
          
      })
  }
        

       $scope.activateOrDiactivate = function (val, $index) {
          
            
            val.state = (val.state == 'inActive') ? 'active' : 'inActive';
            console.log(val);
            
                $http.post('/updateLoginUser', val).success(function (res) {
                    console.log(res);
                }).error(function () {

                });
            
        }
    
    }
    ]);


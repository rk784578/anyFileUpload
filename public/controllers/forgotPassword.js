// JavaScript Document
mainapp.controller('forgotPasswordController', ['$scope',
	'$location',
	'$http',
	'$global',
	
            function ($scope,
		              $location,
		              $http,
									$global
									
	){
	

	// if the user wants to go back  in to login page 
	 $scope.goBackToLoginPage = function() {
		 $location.path('/login');
	}
	 $scope.goBackToLogin= false;



	
   // getting the client/secret id from Node.
	clientAndSecret();
			function clientAndSecret(){
				$http.get('/sendHeaders').success(function(res){
			        $scope.clientId = res.clientId;
			        $scope.secretId = res.secretId;
			    }).error(function(err){
		
			});		
		};	
		  
		       // on Submit call 
				$scope.submit = function(){
					// fetching the client/secret id's for security purpose.
				/*	clientAndSecret();*/
				    validation();
					
                     if($scope.password !== $scope.rePassword){
											 
											 $scope.passwordValidationError ="Password not match. ";
											 $scope.signupButton = false;
												$scope.goBackToLogin= false;
											                	
               
							
						}
                             
				};


				
				
				function validation(){
					// this is email existing or not  in the database
					// if exits only will give the option to update the password.
					// other wise will display the  error not valid email id.
					
					 if($scope.userName == "" || $scope.userName == undefined){
						 $scope.userNameError = "Oops! enter your Email ID. "
					 }
					 else{
						 
					   if($scope.validatingExistingUserOrNot == true){
							$scope.existingUserOrNotCheck = " Email Id Matched.";
							  
							  if($scope.password === $scope.rePassword){
									$scope.signupButton = true;
									saveUser();  
								}
						    
							 
							 
						    // when the user email id exits in the records will show up the update button 
				
						   $scope.goBackToLogin= false;
						  
					   }
					   else{
						   // if the user not exits in the db  will through error. 
						   $scope.existingUserOrNotCheck ="Email Id not Matching With our Records ..!  kindly sign up.  ";
						   $scope.signupButton = false;
						   $scope.goBackToLogin= true;
						   
					   }
					   
				}
			}
				/*password validation in the case of re validation */
				$scope.passwowdValidation = function(){
					$scope.passwordValidationError ="";
					$scope.existingUserOrNotCheck = "";
					// checking the password entred by user; 
					if($scope.password === $scope.rePassword){
						$scope.passwordValidationError ="";
						 fetchExistingOrNewUser();
						
						 
					}
					else{
						$scope.passwordValidationError ="Password not match. ";
						 $scope.signupButton = false;
						   $scope.goBackToLogin= false;
					}
				};
				
				// saving the new user into DB
				function saveUser(){
				      
				      
					$scope.Data['password'] = $scope.rePassword;
					 console.log("###",$scope.Data);

					 //console.log("get call user data" ,$scope.Data );
					 $scope.existingUserOrNotCheck = "Updating new Password";
					 $scope.whiznextLoader=true;

              

					$http.post('/updateLoginUser',$scope.Data).success(function (res) {
                    console.log(res);
                    $location.path('login');
                }).error(function () {

                });
				};
					
				
// validating  for user email already exits or not 				
		function fetchExistingOrNewUser() {
			

			$http.post('/getUnactivatedData')
				.success(function (data) {
					//console.log("####",data);
					//$scope.Data = data;
					for(var i=0;i<data.length;i++){
						$scope.Data = data[i];
						//console.log("^^^",$scope.Data)
					}

					// once user  exits  give true or false status  
					//console.log("data.body.length",data.body.length); 
					$scope.validatingExistingUserOrNot = data == "" ? false : true;
					validation();
					//console.log(" FETCH SUCCESS STATUS", $scope.validatingExistingUserOrNot);
					//$location.path('/login');
					//console.log("log 3",$scope.company);
				})
				.error(function (data, status) {
					console.log("error",data,status)
					// if (status == -1) {
					// 	$scope.validatingExistingUserOrNot = true;
					// 	validation()
					// }
					console.log("Failed to fetch document under CRM  DB. " + status);
					//$location.path('/error');
					// error massage.	
				});
		}; 
					$scope.onSelectUserName = function() {
						$scope.userNameError = "";
						$scope.existingUserOrNotCheck = "";
						reset();
						 	
					}
					  function reset() {
						  $scope.password = "";
						  $scope.rePassword ="";
					} 
				
				
			}]);
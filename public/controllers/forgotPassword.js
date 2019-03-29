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
		 $location.path('/signUp');
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
				
					 
					 $scope.Data['password'] = $crmUtilities.encode($scope.rePassword);
					 console.log("get call user data" ,$scope.Data );
					 $scope.existingUserOrNotCheck = "Updating new Password";
					 $scope.whiznextLoader=true;

              var URL = $global.getApiHost() + "updateCrm";
            	var config = {
						headers: {
							'Content-Type': 'application/json; charset=utf-8',
							"client-Id": $scope.clientId,
							"secret-Id": $scope.secretId   
						}

					};
					

					$http.post(URL, $scope.Data, config)
						.success(function (data, status, headers, config) {
							console.log(data + ": " + status);
						$scope.whiznextLoader=false;
						$scope.existingUserOrNotCheck = "Updated";
						$location.path('login');
						})
						.error(function (data, status, header, config) {

							var ResponseDetails = "Data: " + data +
								"<hr />status: " + status +
								"<hr />headers: " + header +
								"<hr />config: " + config;
							console.log("Failed to save document under Remibursement DB. " + ResponseDetails);
							//$location.path('/error');
							// error massage.
							$scope.errorMassage = "OOPS! Check Your Interent Connection.";


						});
				};
					
				
// validating  for user email already exits or not 				
function fetchExistingOrNewUser() {
	   $scope.fetchUserData = true;
	
	 var URL =  $global.getApiHost() + "fetchBasedOnEmployeeEmail?id=" + $scope.userName ;
	
	   	var config = {
							headers: {
								'Content-Type': 'application/json; charset=utf-8',
								"client-Id": $scope.clientId,
								"secret-Id": $scope.secretId   
							}

						};
						console.log( "API : " + URL);
						

						$http.get(URL, config)
							.success(function (data, status, headers, config) {
								console.log("@@@@",data.body[0]);
								  $scope.Data =(data.body.length == 0) ? "no records Found" : data.body[0]; 
								// once user  exits  give true or false status   
								 $scope.validatingExistingUserOrNot = data.body.length == 0 ? false:true;
								 validation();
								 $scope.fetchUserData = false;
								 
								 
								 
								//console.log("STATUS", $scope.validatingExistingUserOrNot);
							
							})
							.error(function (data, status, header, config) {

								var ResponseDetails = "Data: " + data +
									"<hr />status: " + status +
									"<hr />headers: " + header +
									"<hr />config: " + config;
								console.log("Failed to save document under Remibursement DB. " + ResponseDetails);
								//$location.path('/error');
								// error massage.
								$scope.errorMassage = "OOPS! Check Your Interent Connection.";


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
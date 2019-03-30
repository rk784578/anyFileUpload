// JavaScript Document
mainapp.controller('loginController', ['$scope',
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


		//forgotPassword()
		$scope.forgotPassword = function () {
			$location.path('/forgotPasswordPage');
		};
		// on select user name change error remove
		$scope.onSelectUserName = function () {
			$scope.Error = "";
			$scope.userValidationError = " ";
			$scope.successMessage ="";
		}


	
		$scope.superAdminLoginName = [];
		$scope.login = function () {
			if ($scope.userName == "admin" &&  $scope.password == "admin") {
					
					$global.setAdminlogged(true);
					
					$location.path('/signUpVerification'); // admin home page path
					//console.log(' ADMIN HOMEPAGE');

				}
				else if($scope.userName == "uploadAdmin" &&  $scope.password == "admin"){
					$global.setAdminlogged(true);
					
					$location.path('/reports'); 
				}
				 else {
				
			$scope.loader = true;
			$http.get('/superAdmin').success(function (res) {
				//console.log("SUPER ADMIN LOGIN res",res);
				
					
						$global.setAdminlogged(true);
						getloginData();			

			}).error(function (err) {

			})
		}
		};

		$scope.loginData = [];

		function getloginData() {
			$scope.userValidationError = "";
			$scope.loginData = [];
			$scope.whiznextLoader = true;
			

			$http.post('/getEmployeeDetails',{userName:$scope.userName})
				.success(function (data, status) {
					//console.log(data.rows[0].doc);
					$scope.loginData.push(data.rows[0].doc);
					console.log("DATA", $scope.loginData);
					/*user validation*/

					if ($scope.loginData[0] === undefined) {
						// console.log("else if hited");
						$scope.userValidationError = "Your Not a Existing User.";
						$scope.whiznextLoader = false;
						$scope.loader = false;

					}
					 else if ($scope.loginData[0].state == "active") {
						//console.log("DB CALL USER NAME  PASSWORD" ,$scope.loginData[0].userName,$crmUtilities.decode($scope.loginData[0].password));
						//console.log("USER ENTER USER NAME AND PASSWORD 	",$scope.userName, $scope.password);

						if ($scope.loginData[0].name === $scope.userName && $scope.loginData[0].password === $scope.password) {
							
							$global.setuserData($scope.loginData[0]);
							$global.setLoginName($scope.loginData[0].name);
							//console.log('login data',$global.getuserData);
							$location.path('/welcome');
							$scope.whiznextLoader = false;
							$scope.loader = false;
							// fetchcampaignData($scope.loginData);
							// SetTheMenuGlobalValues($scope.loginData[0].ApprovedModules);
							
							// This code will check the whether admin logged ot  user logged in
							// If admin logged in the that value is true other wise its false.
							 
							if ($scope.loginData[0].typeOfLogin  == undefined) {
								//$adminLoggedOrNot.setAdminLoggedOrNot(true);
								//fetchEmployeeList($scope.loginData[0]._id);
							}else{
								//$adminLoggedOrNot.setAdminLoggedOrNot(false);
							}
							//console.log('logged or not',$adminLoggedOrNot.getAdminLoggedOrNot());
							

						} else {
							//$location.path('/welcome');
							console.log($scope.name);
							$scope.userValidationError = "Invalid UserName and Password";
							$scope.whiznextLoader = false;
							$scope.loader = false;
							console.log("not macthed ");
						}
					} else {
						if($scope.loginData[0] === undefined || $scope.loginData[0] === null || $scope.loginData[0] === ""){
							$scope.userValidationError = "verify your mail Id & Re-Login.If not receive any mail click resend ";
							//$scope.resendShow = true;
							$scope.whiznextLoader = false;
					        $scope.loader = false;
						}
						else{
							console.log("Un Caught Error", $global.getPopError());
							$scope.userValidationError = $global.getPopError();
							$scope.whiznextLoader = false;
							$scope.userValidationError = "Your account is not yet active.Kindly contact to E-Signup admin.";
							$scope.loader = false;

						}
					

					}

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
					$scope.whiznextLoader = false;
					$scope.loader = false;

				});

		};


	}]);
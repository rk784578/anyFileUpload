// JavaScript Document
mainapp.controller('signUpController', ['$scope',
    '$location',
    '$http',
    '$global',

    function ($scope,
        $location,
        $http,
        $global
    ) {




        // on select district 
        $scope.onSelectDistrict = function () {
            console.log("district", $scope.districtLi);
            $scope.ap = false;
            $scope.ts = false;
            $scope.other = false;
            $scope.districtList = false; 


            if ($scope.districtLi == "apT") {
                $scope.districtList = true; 
                $scope.ap = true;
                
            }
            else if ($scope.districtLi == "tsT") {
                $scope.districtList = true; 
                $scope.ts = true;
                
            } else if ($scope.districtLi == "otherT" ) {
                $scope.districtList = false; 
                $scope.other = true;
                
            }else{
                console.log("ELSE hited")   
            }
        };

        // if the user already in the exits giving option to go back 

        $scope.goBackToLoginPage = function () {
            $location.path('login');
        }
        $scope.goBackToLogin = false;

        $scope.forgotPassword = function () {
            $location.path('forgotPasswordPage');
        };

        $scope.submit = function () {

            //console.log(" log 1",$scope.company);
            if ($scope.userName == undefined || $scope.userName == null || $scope.userName == "") {
                $scope.nameError = " Enter your userName";
            } else if ($scope.mobileNumber == undefined || $scope.mobileNumber == null || $scope.mobileNumber == "") {
                $scope.nobileNumberError = " Enter your mobile number";
            } else if ($scope.fullName == undefined || $scope.fullName == null || $scope.fullName == "") {
                $scope.fullNameError = " Enter your Full Name";
            } else if ($scope.email == undefined || $scope.email == null || $scope.email == "") {
                $scope.emailError = " Enter your email";
            } else if ($scope.password == undefined || $scope.password == null || $scope.password == "") {
                $scope.passwordError = "Enter your password";
            } else {
                console.log('submit function callled.');
                // save the user in the DB  if exitsing  it wnt save the data 
                // this function will check the whether the user existing or not. 
                fetchExistingOrNewUser();

            }
        };
        // validating  for user email already exits or not              
        function fetchExistingOrNewUser() {
            //console.log("log 2  ",$scope.company);

            // var URL = $global.getApiHost() + "uploadanyregisterandlogin/" + "_design/uploadAny/_search/fetchBasedOnEmployeeEmail?" + 'query=employeeEmail:\"' + $scope.userName +'\"' + '&include_docs=true';
            //           console.log(URL);

            //console.log("API : " + URL);

            $http.post('/getEmployeeDetails', { userName: $scope.userName })
                .success(function (data, status) {
                    console.log("####", data + status);
                    // once user  exits  give true or false status  
                    //console.log("data.body.length",data.body.length); 
                    $scope.validatingExistingUserOrNot = data == '0' ? false : true;
                    validation();
                    //console.log(" FETCH SUCCESS STATUS", $scope.validatingExistingUserOrNot);
                    //$location.path('/login');
                    //console.log("log 3",$scope.company);
                })
                .error(function (data, status) {
                    console.log("error", data, status)
                    // if (status == -1) {
                    //  $scope.validatingExistingUserOrNot = true;
                    //  validation()
                    // }
                    console.log("Failed to fetch document under CRM  DB. " + status);
                    //$location.path('/error');
                    // error massage.   
                });
        };


        function validation() {
            // this is email already existing or not 

            if ($scope.validatingExistingUserOrNot == true) {
                $scope.existingUserOrNotCheck = "Email already Exists.";
                //console.log("log 4",$scope.company);

            } else {
                console.log("validation function else", $scope.validatingExistingUserOrNot);
                $scope.existingUserOrNotCheck = "";
                saveUser();
                //registerUser();

            }
        };

        // saving the new user into DB
        function saveUser() {
            $scope.loadder = true;
            //console.log("log 5 ",$scope.company);
            var data = {
                _id: $scope.userName,
                name: $scope.userName,
                fullName: $scope.fullName,
                password: $scope.password,
                designation: $scope.designation,
                empID: $scope.empID,
                profileCategory: $scope.profile,
                districtHead:$scope.districtLi,
                districtCategory: $scope.district,
                mobileNumber: $scope.mobileNumber,
                email: $scope.email,
                districtOther:$scope.districtOther,
                status: "normalSignUp",
                contact: "login",
                state: "inActive",
                condition: $scope.userName,
                emailVerification: "verified"
            };
            //}
            $scope.whiznextLoader = true;


            //console.log( "API : " + URL);
            console.log("Data passed to the API call: " + data);

            $http.post('/storeReg', data)
                .success(function (data, status) {
                    console.log(data + ": " + status);
                    $scope.loadder = false;
                    $location.path('thanks');
                    $global.setAdminlogged(true);
                })
                .error(function (data, status) {
                    $scope.loadder = false;
                    console.log("Failed to save document under Remibursement DB. " + status);
                    //$location.path('/error');
                    // error massage.

                });
        }

        $scope.onchange = function () {
            $scope.existingUserOrNotCheck = "";
            $scope.nameError = "";
            $scope.nobileNumberError = "";
            $scope.emailError = "";
            $scope.companyNameError = "";
            $scope.passwordError = "";

        }

        var myVar = setInterval(myTimer, 3000);

        function myTimer() {

            $scope.userData = $global.getgoogleData();
            if ($scope.userData.googleSignUpData == undefined) {

            } else {
                $scope.userName = $scope.userData.googleSignUpData.U3;
                $scope.name = $scope.userData.googleSignUpData.ofa;
                //console.log("user emailid",$scope.userName);

            }
        }
        /*password validation in the case of re validation */
        $scope.passwowdValidation = function () {

            $scope.passwordValidationError = "";
            // checking the password entred by user; 
            if ($scope.password === $scope.rePassword) {
                $scope.passwordValidationError = "";
                validation();
            } else {
                $scope.passwordValidationError = "password not match";
            }
        };



    }]);
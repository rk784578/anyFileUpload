mainapp.controller('welcomeController', ['$scope',
    '$location',
    '$http',
    '$global',
    '$timeout',
    function ($scope,
        $location,
        $http,
        $global, $timeout
    ) {
        $scope.repeat = "";


        if (!$global.getAdminlogged()) {
            $location.path('/login');
        }

        // fetching the data after user login to the  application and storing in to the db 
        $scope.loginData = $global.getuserData();

        $scope.data = {
            district: $scope.loginData.districtCategory,
            name: $scope.loginData.fullName,
            mobileNumber: $scope.loginData.mobileNumber,
            designation: $scope.loginData.designation,
            empID: $scope.loginData.empID,
            email: $scope.loginData.email,
            profile: $scope.loginData.profileCategory,
            subject: $scope.Subject,
            message: $scope.Message
        }

        console.log($scope.data);

        // refrence  : we use this https://www.encodedna.com/angularjs/tutorial/angularjs-multiple-file-upload-example-with-webapi.htm
        // for the  code /  status bar 

        // hold  multiples if user need more than one 
        // GET THE FILE INFORMATION.
        $scope.getFileDetails = function (e) {

            $scope.files = [];
            $scope.$apply(function () {

                // STORE THE FILE OBJECT IN AN ARRAY.
                for (var i = 0; i < e.files.length; i++) {
                    $scope.files.push(e.files[i])
                }

            });
        };


        // write a function to send the data + file to the serve 
        // check can we able to send the multiple  files to the server or not 

        $scope.sendDataTotheBackend = () => {

            let payload = new FormData();
            console.log("<< how many files are uplaoded >>", $scope.files.length);
            payload.append("title", $scope.data.subject);
            payload.append("filesCount", $scope.files.length);
            payload.append("district", $scope.data.district);
            payload.append("name", $scope.data.name);
            payload.append("mobileNumber", $scope.data.mobileNumber);
            payload.append("designation", $scope.data.designation);
            payload.append("empID", $scope.data.empID);
            payload.append("email", $scope.data.email);
            payload.append("profile", $scope.data.profile);
            payload.append("message", $scope.data.message);
          

            // iterating the data for multiple files 
            for (var i in $scope.files) {
                payload.append("VideoToUpload", $scope.files[i]);
            }

            var xhr = new XMLHttpRequest();

            // your url upload
            xhr.open('post', '/upload', true);

            xhr.upload.onprogress = function (e) {

                if (e.lengthComputable) {
                    let percentage = Math.round((e.loaded / e.total) * 100);
               console.log( percentage)

                }
            };

            xhr.onerror = function (e) {
                console.log('Error');
                console.log(e);
            };
            xhr.onload = function () {
                console.log(this.statusText);
                test( this.statusText);
               

            };
            xhr.send(payload);
        }

        // $timeout(function () { $location.path('/login') }, 500000)

         function test(val){
             alert( "Uplaoded")
            $location.path('/successPath');
        }

    }
]);
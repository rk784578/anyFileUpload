mainapp.controller('reportController', ['$scope',
    '$location',
    '$http',
    '$global',
    '$filter',
    'Excel',
    '$timeout',
    function ($scope,
        $location,
        $http,
        $global, $filter, Excel, $timeout
    ) {
        $scope.repeat = "";



        if (!$global.getAdminlogged()) {
            $location.path('/login');
        }

        $scope.printButton = true;

        $scope.date = new Date()
        $scope.message = "Fetching Data ......";
        fetchData($scope.date)

        //$scope.uploadData = [];

        $scope.uploadedData = function (val) {
            $scope.upload = [];
            $scope.uploadFileName = [];
            $scope.message = "Fetching Data ......";
            $scope.afterData = false;
            $scope.printButton = true;
            fetchData(val)
        }

        // refresh 
        $scope.refresh = () =>{
            $scope.upload = [];
            $scope.uploadFileName = [];
            $scope.message = "Fetching Data ......";
            $scope.afterData = false;
            $scope.printButton = true;
            fetchData($scope.date)
        }



        $scope.print = function (printSectionId) {
            $scope.printButton = false;
            window.print();
        }



        $scope.upload = [];
        //$scope.uploadFileName = [];


        function fetchData(val) {
            var date = $scope.date;
            $http.post('/getUploadData', { date: $scope.date }).success(function (data) {

                console.log(data.length);
                if (data.length != 0) {
                    $scope.upload = data;
                    $scope.message = "";
                    $scope.afterData = true;
                }
                else {
                    $scope.message = "Oops! No records are found ";
                    $scope.afterData = false;
                }





            }).error(function (data) {

            })
        }



        // Excel  report Download.
        $scope.exportToExcel = function (tableId) { // ex: '#my-table'
            console.log(tableId);
            var exportHref = Excel.tableToExcel(tableId, 'Upload Report');
            $timeout(function () { location.href = exportHref; }, 100);
            // trigger
            // download
        };

    }]);


mainapp.factory('Excel', function ($window) {
    var uri = 'data:application/vnd.ms-excel;base64,',
        template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
        base64 = function (s) { return $window.btoa(unescape(encodeURIComponent(s))); },
        format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) };
    return {
        tableToExcel: function (tableId, worksheetName) {
            var table = $(tableId),
                ctx = { worksheet: worksheetName, table: table.html() },
                href = uri + base64(format(template, ctx));
            return href;
        }
    };
});
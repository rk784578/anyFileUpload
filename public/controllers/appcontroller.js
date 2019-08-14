var mainapp = angular.module('whiznextcrm', ['ngRoute', 
                                      
                                             'xeditable',
                                             'angularModalService',
                                             'chart.js'
                                            
                                             ]);

mainapp.run(['$global', function ($global) {
    $global.setShowlogin(true);
    $global.setAdminlogged(false);

}]);


mainapp.config(function ($routeProvider,$locationProvider) {

   


    $routeProvider
        .when('/login', {
            controller: 'loginController',
            templateUrl: '../login.html'
        })
        .when('/signUp', {
            controller: 'signUpController',
            templateUrl: '../signUP.html'
        })
        .when('/welcome', {
            controller: 'welcomeController',
            templateUrl: '../welcome.html'
        })
        .when('/logout',
            {
                controller: 'LogoutController',
                templateUrl: '../login.html'
            })
        .when('/signUpVerification',
            {
                controller: 'manualVerificationController',
                templateUrl: '../manualVerification.html'
            })
        .when('/forgotPasswordPage',
            {
                controller: 'forgotPasswordController',
                templateUrl: '../forgotPasswordPage.html'
            })             
         .when('/reports',
            {
                controller: 'reportController',
                templateUrl: '../reports.html'
            })
         .when('/successPath',
            {
                //controller: 'reportController',
                templateUrl: '../success.html'
            })
            .when('/website',
            {
                //controller: 'reportController',
                templateUrl: '../site.html'
            })   
            .when('/licenceCheck',
            {
                //controller: 'reportController',
                templateUrl: '../exceptionHandle.html'
            })     
        .otherwise({
            redirectTo: '/login'
        });
        $locationProvider.html5Mode(true);
});


mainapp.factory('$global', function () {

    var showlogin = true;
    var adminlogged = false;
    var loginName = false;
    var numberOfTasks = "";
    var userData = [];
    var googleData = [];
    let SelectedRecordDataForEdit =[];
    let popError = [],
        latestActivityPage = false,
        contactsPage = false,
        taskPage = false,
        dealsPage = false,
        bulkEmailPage = false,
        searchNotesPage = false,
        trashCanPage = false,
        casePage = false,
        adminContactEdit = false,
        welcomePage = false,
        sms=false,
        dashbordPage=false,
        admin=false,
        campaign=false,
        companyName=false,
        recommendation=false,
        seoPage=false,
        customApi=false,
        selectionSmsNumber = [],
        API_HOST = 'https://0df2fcdc-86c0-43d3-baee-f9d5302ad598-bluemix:ca3a681531d5df5688329b77cc2140cb83e00c312f7be03daed61b0a93ef6e11@0df2fcdc-86c0-43d3-baee-f9d5302ad598-bluemix.cloudant.com/',
        schedule = false,
        planListForEdit = "",
        welcome = false;


    return {

        setShowlogin: function (val) {
            showlogin = val;
        },
        setgoogleData: function (val) {
            googleData = val;
        },
        setAdminlogged: function (val) {
            adminlogged = val;
        },
        setuserData: function (val) {
            userData = val;
        },
        setLoginName: function (val) {
            loginName = val;
        },
        // CRM menu pages.
        setnumberOfTasks: function (val) {
            numberOfTasks = val;
        },
        serLatestActivityPage:function(val){
            latestActivityPage = val;
        },
        setContactsPage :function(val){
            contactsPage = val;
        },
        setTaskPage:function(val){
            taskPage = val;
        },
        setDealsPage:function(val){
            dealsPage = val;
        },
        setBulkEmailPage:function(val){
            bulkEmailPage = val;
        },
        setSearchNotesPage:function(val){
            searchNotesPage = val;
        },
        setTrashCanPage :function(val){
            trashCanPage = val;
        },
        setCasePage:function(val){
            casePage = val;
        },
        setAdminContactEdit:function(val){
            adminContactEdit = val;
        },
        setBulkSms:function(val){
        	sms = val
        },
        setSelectionSmsNumber:function(val){
            selectionSmsNumber = val;
        },
        setSelectionName:function(val){
            selectionName = val;
        },
        setcontactListForEdit:function(val){
            contactListForEdit = val;
        },
        setcompanyListForEdit:function(val){
            companyListForEdit = val;
        },
        setDashbordPage:function(val){
            dashbordPage = val;
        },
        setSeoPage:function(val){
            seoPage = val;
        },
        setAdmin:function(val){
            admin = val;
        },
        setCampaign:function(val){
            campaign = val;
        },
        setRecommendations:function(val){
            recommendation = val;
        },
        setCustomApi:function(val){
            customApi = val;
        },
        setApiHost:function(val){
            API_HOST = val;
        },
        getLatestActivityPage: function () {
            return latestActivityPage;
        },
        getContactsPage: function () {
            return contactsPage;
        },
        getTaskPage: function () {
            return taskPage;
        },
        getDealsPage: function () {
            return dealsPage;
        },
        getBulkEmailPage: function () {
            return bulkEmailPage;
        },
        getSearchNotesPage: function () {
            return searchNotesPage;
        },
        getTrashCanPage: function () {
            return trashCanPage;
        },
        getCasePage:function(){
           return casePage;
        },
        getAdminContactEdit:function(){
             return adminContactEdit;
        },
        getShowlogin: function () {
            return showlogin;
        },
        getgoogleData: function () {
            return googleData;
        },
        getAdminlogged: function () {
            return adminlogged;
        },
        getuserData: function () {
            return userData;
        },
        getLoginName: function () {
            return loginName;
        },
        getnumberOfTasks: function () {
            return numberOfTasks;
        },
        getBulkSms:function(){
        	 return sms;
        },
        setWelcomePage:function (val) {
              welcomePage = val ;
        },
        getWelcomePage:function () {
            return welcomePage
        },
        setIndexPostionRecordData:function(val){
            SelectedRecordDataForEdit = val
        },
        getIndexPostionRecordData:function(){
           return SelectedRecordDataForEdit
        },
        setPopError : function(val) {
			 val = popError;
		},
        getPopError : function () {
			return popError; 
        },
        getDashbordPage :function(){
            return dashbordPage;
        },
        getSelectionSmsNumber:function(){
            return selectionSmsNumber;
        },
        getSelectionName:function(){
            return selectionName;
        },
        getcontactListForEdit:function(){
            return contactListForEdit;
        },
        getcompanyListForEdit:function(){
            return companyListForEdit;
        },
        getSeoPage:function(){
            return seoPage;
        },
        getAdminPage:function(){
            return admin;
        },
        getCampaignPage:function(){
            return campaign;
        },
        getRecommendationsPage:function(){
            return recommendation;
        },
        getCustomApiPage:function(){
            return customApi;
        },
        getApiHost:function(){
             return API_HOST ;
        },
        setSchedule:function(val){
            schedule = val;
        },
        getSchedule:function(){
             return schedule ;
        },
        setCompanyName:function(val){
            companyName = val;
        },
        getCompanyName:function(){
             return companyName ;
        },
        setTaskListForEdit:function(val){
            taskListForEdit = val;
        },
        getTaskListForEdit:function(){
             return taskListForEdit ;
        },
        setPlanListForEdit:function(val){
            planListForEdit = val;
        },
        getPlanListForEdit:function(){
             return planListForEdit ;
        },
        setWelcome:function(val){
           welcome = val;
        },
        getWelcome:function(){
             return welcome ;
        },
		
    };
});

mainapp.controller('NavController', ['$scope', '$global', '$http', function ($scope, $global, $http) {
    $scope.template = {
        navmenu: 'nav.html',
        footer:'footer.html'
    };




}]);

mainapp.filter('numberToDate', function () {
    return function (input) {
        if (input === null || input === undefined || input === "" || input == 0) {
            input = "Date--NO";
        }
        //Need to convert the date integer into date format yyyy-mm-dd
        var dateString = '' + input;
        return dateString.substr(6, 2) + "-" + dateString.substr(4, 2) + "-" + dateString.substr(0, 4);
    }
});



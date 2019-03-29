// JavaScript Document
mainapp.controller( 'LogoutController', ['$scope', '$global', '$location', function($scope, $global, $location){
	$global.setShowlogin(false);
	
	/*$global.setShowlogout(false);*/

	$location.path('login');



}]);
var testApp = angular.module('testApp',[]);

testApp.controller('testController',function($scope,$http){
  
    $http.get('/json/phones.json').success(function(data){
	$scope.phones = data;
    });
  
});
	

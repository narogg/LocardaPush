angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$state) {
	$scope.settings = function() {
		//go to dash state
	$state.go('tab.dash')
	}
})

.controller('RefreshCtrl', function($scope,$state,$window) {
	$scope.refresh = function() {
	//refresh state
	$window.location.reload(true);
	}
})


.controller('HomeCtrl', function($scope,$state) {
	$scope.home = function() {
		//go to dash state
	$state.go('tab.account');
	}
})

.controller('SignUpCtrl', function($scope, $state, $ionicPopup) {
	$scope.signUp = function() {
	//go to dash state	
	// A custom popup
	$ionicPopup.alert({ 
	 title: 'Obavijest',
	 template: 'Uskoro!',	 
	 buttons: [
	  { text: 'OK',      
	   type: 'button-calm'}
	 ]
	});
	
	
	//alert('Uskoro!');
	$state.go('tab.account');
	}
})


.controller('EnemiesCtrl', function($scope, $stateParams, Enemies) {
  $scope.enemies = Enemies.all();
  

  
  /*
  // Search function, todo
   $scope.search = function () {
            Enemies.findByName($scope.searchKey).then(function (employees) {
                $scope.employees = employees;
            });
        }
  */

})

.controller('EnemiesDetailCtrl', function($scope, $stateParams, Enemies) {
  $scope.enemy = Enemies.get($stateParams.enemyId);
  
   $scope.checkIn = function() {
   //alert('Call to Rails Locarda API: '+$stateParams.enemyId);
   /*TODO: checkIn user to clicked place*/
   
   Enemies.postIt($stateParams.enemyId);
   //console.log('Enemies.postIt() called');

   
   }
   
})

.controller('AccountCtrl', function($scope) {
});

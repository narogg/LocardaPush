angular.module('starter.controllers', [])

.controller('DashiCtrl', function($scope,$state) {
	$scope.settings = function() {
		//go to dash state
	$state.go('tab.dash')
	}
})



/**
 * And of course we define a controller for our route.
 */
.controller( 'DashCtrl', function LoginController( $scope, $http ) {
  $scope.login_user = {email: null, password: null};
  
  $scope.login = function() {
    $http.post('http://localhost:3000/users/sign_in.json', {user: {email: $scope.login_user.email, password: $scope.login_user.password}}).
        success(function(data, status) {
          $scope.status = status;
          $scope.data = data;
		  alert('sucesso!');
		  alert('data'+$scope.data);
        }).
        error(function(data, status) {
          $scope.data = data || "Request failed";
          $scope.status = status;
		  alert('status error: '+$scope.status + $scope.data);
      });
	
	
    console.log('v loginu sam!');
  
  };

  $scope.logout = function() {
    $http({method: 'DELETE', url: 'http://localhost:3000/users/sign_out.json', data: {}});
  };
})






.controller('RefreshCtrl', function($scope,$state,$window) {
	$scope.refresh = function() {
	//refresh state
	$window.location.reload(true);
	}
})


.controller('HomeCtrl', function($scope,$state) {
	$scope.home = function() {
		//go to home state
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


.controller('EnemiesCtrl', function($scope, $stateParams, Enemies ) {
  $scope.enemies = Enemies.all();
   
   $scope.$root.showRefreshButton = true;
   //$stateChangeStart - fired when the transition begins.
   $scope.$on("$stateChangeStart", function() {
   $scope.$root.showRefreshButton = false;
  })
  

  
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

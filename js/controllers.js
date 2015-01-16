angular.module('starter.controllers', [])

/**
 * These are functions communicating with the Devise gem in backend
 */
.controller( 'DashCtrl', function LoginController( $scope, $http, $state, $ionicLoading ) {
  $scope.login_user = {email: null, password: null};
  $scope.login_error = {message: null, errors: {}};    
  // Locally stored email value that will be shown in settings (dash) view
  //localStorage.removeItem('email');
  //localStorage.removeItem('id');
  //console.log('maka');
  
  
  $scope.localEmail = localStorage.getItem('email');
  //alert('Im in DashCtrl and email is: '+$scope.localEmail);

  $scope.signUp = function() {
    $scope.submit({method: 'POST', 
                   //url: 'http://localhost:3000/users.json',//! POST to /users.json creates a new user
				   url: 'http://locarda.herokuapp.com/users.json',//! POST to /users.json creates a new user
                   data: {user: {email: $scope.login_user.email, password: $scope.login_user.password}},
                   success_message: "You have been logged in.",
                   error_entity: $scope.login_error});
  };
  
   $scope.login = function() {
    $scope.submit({method: 'POST', 
                   //url: 'http://localhost:3000/users/sign_in.json',//! POST to /users/sing_in.json logs in an existing user
				   url: 'http://locarda.herokuapp.com/users/sign_in.json',//! POST to /users/sing_in.json logs in an existing user
                   data: {user: {email: $scope.login_user.email, password: $scope.login_user.password}},
                   success_message: "You have been logged in.",
                   error_entity: $scope.login_error});
  };

  $scope.logout = function() {
    $scope.submit({method: 'DELETE', 
                   url: 'http://localhost/users/sign_out.json',
                   success_message: "You have been logged out.",
                   error_entity: $scope.login_error});
  };

  $scope.submit = function(parameters) {
    $scope.reset_messages();

    $http({method: parameters.method,
           url: parameters.url,
           data: parameters.data})
      .success(function(data, status){
        if (status == 201 || status == 204){
			if (typeof data.id != 'undefined') {
			  parameters.error_entity.message = parameters.success_message;
			  //parameters.error_entity.message = 'Ulogirali ste se!';			
			  console.log('Status: '+status +', message: '+parameters.error_entity.message+'User id je: '+ data.id);
			  //if user.id is undefined go to login with error msg because it is a unexisting user - either register or use existing...			
			  // If there is no userId locally - store it, otherwise don't touch it - for now
			  window.localStorage['id'] = data.id;
			  window.localStorage['email'] = data.email;
			  $scope.reset_users();
			  $state.go('tab.account');
			}
			else {
			  //we have no used id from devise
			  parameters.error_entity.message = "Problem prilikom prijave. Kontaktirajte Administratora.";
			  $ionicLoading.hide();
			}
			}
            // we have no 201 or 204 response, strange response			
			else {
				console.log(status+data.id);
				alert('Error: '+status);					
				if (data.error) {
					parameters.error_entity.message = data.error;
					} else {
					parameters.error_entity.message = "Success, but with an unexpected success code, potentially a server error, please report via support channels as this indicates a code defect.  Server response was: " + JSON.stringify(data);
					$ionicLoading.hide();
					}
			}
      })
      .error(function(data, status){
        if (status == 422) {
			parameters.error_entity.errors = data.errors;
			// $ionicLoading.hide() is needed b/c it doesn't hide it for some reason on error rsp from rails backend
			$ionicLoading.hide();
			return false;
        } else {
			if (data.error) {
				parameters.error_entity.message = data.error;
				$ionicLoading.hide();
			} else {
				parameters.error_entity.message = "Unexplained error, potentially a server error, please report via support channels as this indicates a code defect.  Server response was: " + JSON.stringify(data);
				$ionicLoading.hide();
			}
		}
      });
  };

  $scope.reset_messages = function() {
    $scope.login_error.message = null;
    $scope.login_error.errors = {};
  };

  $scope.reset_users = function() {
    $scope.login_user.email = null;
    $scope.login_user.password = null;
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

// Version 1, working, initial display empty (bug), enemies array empty
//.controller('EnemiesCtrl', function($scope, $stateParams, Enemies,$state ) {
//  //alert("window.localStorage['id']: "+window.localStorage['id']);  
//  $scope.enemies = Enemies.all(window.localStorage['id']);   
//   $scope.$root.showRefreshButton = true;
//   //$stateChangeStart - fired when the transition begins.
//   $scope.$on("$stateChangeStart", function() {
//   $scope.$root.showRefreshButton = false;
//  })
//})

// This controller doesn't uses the service, and it shows places immediately - but first call to place detail is always null, so I'm calling twice
.controller('EnemiesCtrl', function($scope, $http, $stateParams, Enemies, $state, $ionicLoading, pushService) {
  $http.get('http://locarda.herokuapp.com/home/api',{user_id:window.localStorage['id']}).then(function(resp) {
    $scope.enemies = resp.data;
	$scope.$root.showRefreshButton = true;
    $scope.$on("$stateChangeStart", function() {
    $scope.$root.showRefreshButton = false;
	// one more call b/c bug mentioned above. enemies is always empty for the first time. until I make asolution of populating enemies
	// immediately I will call API twice 
	$scope.enemies = Enemies.all(window.localStorage['id']); 
  })
	
  }, function(err) {
    alert('Error: '+err.status+ ' \nKontaktirajte administratora' );
	$ionicLoading.hide();
    // err.status will contain the status code
  });

  $pushService.register().then(function(result) {
      // Success!
	  alert('pushService success');	  
   }, function(err) {
      // An error occured. Show a message to the user
	  alert('pushService error');	  
   });
  
  
  
  
})

.controller('EnemiesDetailCtrl', function($scope, $stateParams, Enemies, $state) {
   console.log($stateParams.enemyId);
   $scope.nekaj = Enemies.get($stateParams.enemyId);
   console.log($scope.nekaj );
   if ($scope.nekaj) {
   $scope.enemy = Enemies.get($stateParams.enemyId);
   }
   // $scope.enemy = $scope.enemies[$stateParams.enemyId];
  
   $scope.checkIn = function() {
   //alert('Call to Rails Locarda API checkIn, userId: : '+window.localStorage['id']+' placeId: '+$stateParams.enemyId);
   /*TODO: checkIn user to clicked place*/
   if(typeof window.localStorage['id']==='undefined'){
   alert ('Morate se prijaviti!');
   $state.go('tab.dash');
   }
   else {
   Enemies.postCheckIN(window.localStorage['id'],$stateParams.enemyId);
   //console.log('Enemies.postIt() called');
   }

   
   }
   
})


//push notification service
.controller('MainCtrl', function($scope, $pushService) {

  $pushService.register().then(function(result) {
      // Success! 
   }, function(err) {
      // An error occured. Show a message to the user
   });

 })
//


/*
app.controller('myController', ['$scope', 'cordovaReady', function($scope, cordovaReady) {
     cordovaReady(function () {
         // Device ready event has fired when this function fires
     });
}]);
*/

.controller('AccountCtrl', function($scope) {
});
  
  
/*
// Search function, todo
 $scope.search = function () {
          Enemies.findByName($scope.searchKey).then(function (employees) {
              $scope.employees = employees;
          });
      }
*/

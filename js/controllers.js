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
.controller( 'DashCtrl', function LoginController( $scope, $http, $state ) {
  $scope.login_user = {email: null, password: null};
  $scope.login_error = {message: null, errors: {}};    
  // Locally stored email value that will be shown in settings (dash) view
  //localStorage.removeItem('email');
  //localStorage.removeItem('id');
  
  
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
			//alert(localStorage.getItem('id'));
			 //if(!!localStorage.getItem('id')){
				window.localStorage['id'] = data.id;
				window.localStorage['email'] = data.email;
				alert('Hello, ' + data.email +' with ID of: '+data.id);
			//};			
			
			
			
			
		  //alert(parameters.error_entity.message);
          $scope.reset_users();
		  $state.go('tab.account');
		  }
		  else {
				//if
				parameters.error_entity.message = "Problem prilikom prijave. Kontaktirajte Administratora.";
				}
        } else {
		  console.log(status+data.id);
		  alert('Error: '+status);
          if (data.error) {
            parameters.error_entity.message = data.error;
          } else {
            // note that JSON.stringify is not supported in some older browsers, we're ignoring that
            parameters.error_entity.message = "Success, but with an unexpected success code, potentially a server error, please report via support channels as this indicates a code defect.  Server response was: " + JSON.stringify(data);
          }
        }
      })
      .error(function(data, status){
        if (status == 422) {
          parameters.error_entity.errors = data.errors;          
        } else {
          if (data.error) {
            parameters.error_entity.message = data.error;
          } else {
            // note that JSON.stringify is not supported in some older browsers, we're ignoring that
            parameters.error_entity.message = "Unexplained error, potentially a server error, please report via support channels as this indicates a code defect.  Server response was: " + JSON.stringify(data);
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

.controller('EnemiesDetailCtrl', function($scope, $stateParams, Enemies,$state) {
  $scope.enemy = Enemies.get($stateParams.enemyId);
  
   $scope.checkIn = function() {
   alert('Call to Rails Locarda API checkIn, userId: : '+window.localStorage['id']+' placeId: '+$stateParams.enemyId);
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

.controller('AccountCtrl', function($scope) {
});

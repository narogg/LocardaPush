// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform, $ionicPopup) {
  $ionicPlatform.ready(function() {
  
  // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
	
	if(window.Connection) {
                if(navigator.connection.type == Connection.NONE) {
                    $ionicPopup.confirm({
                        title: "Niste povezani na internet",
                        content: "Nema podatkovne veze."
                    })
                    .then(function(result) {
                        if(!result) {
                            ionic.Platform.exitApp();
                        }
                    });
                }
    }
	
	alert('tudi');
	regID = window.localStorage.getItem("regID");
    alert("sad spremljeni regId"+regID);
    
  });
})

// http://learn.ionicframework.com/formulas/loading-screen-with-interceptors/
.run(function($rootScope, $ionicLoading) {
  $rootScope.$on('loading:show', function() {
    $ionicLoading.show({template: '<h3><i class="icon ion-looping"></i></h3>' + 'Molimo pričekajte...'});
	// template: 'Trenutak...' ion-load-a  icon ion-looping
	// content: '<i class="icon ion-looping"></i> '
  })

  $rootScope.$on('loading:hide', function() {
    $ionicLoading.hide();
  })
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })
	
	// Login state (http://technpol.wordpress.com/2013/09/23/angularjs-and-devise-authentication-with-a-rails-server/)
	 .state( 'tab.dash', {
     url: '/dash',
	 views: {
      "tab-dash": {
        controller: 'DashCtrl',
        templateUrl: 'templates/tab-dash.html'
		}
		},
		data:{ pageTitle: 'Login' }
	 })

	.state('tab.enemy-detail', {
      url: '/enemy/:enemyId',
      views: {
        'tab-account': {
          templateUrl: 'templates/enemy-detail.html',
          controller: 'EnemiesDetailCtrl'
        }
      }
    })

    .state('tab.account', {
      url: '/account',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-account.html',
          controller: 'EnemiesCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/account');

})
// http://learn.ionicframework.com/formulas/loading-screen-with-interceptors/
.config(function($httpProvider) {
  $httpProvider.interceptors.push(function($rootScope) {
    return {
      request: function(config) {
        $rootScope.$broadcast('loading:show');
        return config;
      },
      response: function(response) {
        $rootScope.$broadcast('loading:hide');
        return response;
      }
    }
  })
})
;


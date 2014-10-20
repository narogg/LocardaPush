angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('EnemiesCtrl', function($scope, $stateParams, Enemies) {
  $scope.enemies = Enemies.all();

})

.controller('EnemiesDetailCtrl', function($scope, $stateParams, Enemies) {
  $scope.enemy = Enemies.get($stateParams.enemyId);
  
   $scope.checkIn = function() {
   alert('Call to Rails Locarda API: '+$stateParams.enemyId);
   /*TODO: checkIn user to clicked place*/
   
   Enemies.postIt($stateParams.enemyId);
   console.log('Enemies.postIt() called');

   
   }
   
})

.controller('AccountCtrl', function($scope) {
});

angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('EnemiesCtrl', function($scope, Enemies, $stateParams) {
  $scope.enemies = Enemies.all();
  $scope.checkIn = function() {
   alert('Call to Rails Locarda API');
   /*TODO: checkIn user to clicked place*/
   Enemies.postIt();
   console.log('Enemies.postIt() called');
   alert($stateParams);
   
   
   
   
   
   }
})

.controller('EnemiesDetailCtrl', function($scope, $stateParams, Enemies) {
  $scope.enemy = Enemies.get($stateParams.enemyId);
})

.controller('AccountCtrl', function($scope) {
});

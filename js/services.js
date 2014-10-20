angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [
    { id: 0, name: 'Scruff McGruff' },
    { id: 1, name: 'G.I. Joe' },
    { id: 2, name: 'Miss Frizzle' },
    { id: 3, name: 'Ash Ketchum' }
  ];

  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
})

.factory('Enemies', ['$http', function($http) {
  // Might use a resource here that returns a JSON array
	var enemies = this;
	enemies = []; //init empty array
	
	$http.get('http://locarda.herokuapp.com/home/api').success(function(data){
	//$http.get('http://localhost:3000/home/api').success(function(data){
	enemies =  data;
	});

	return {
		all: function() {
	    return enemies;
		},
		// Simple index lookup  
		get: function(enemyId){
		return enemies[enemyId- 1]; //-1 needed for id lookup
		},
		
	
	/*Trying to post here*/
	postIt : function(placeId){	
	$http.post('http://localhost:3000/carts/checkin',{placeId:placeId}).success(function(data){
	//$http.get('http://localhost:3000/home/api').success(function(data){
	alert('Uspjesna prijava!');
	}).error(function(data){alert ('Neuspjesna prijava!\nNapomenite osoblju.') })
	}
	/**/
	
	}
	
	}]
	
	);
	//})();
	
	
  // Some fake testing data
  //var enemies = [
  //  { id: 0, name: 'George Bush' },
  //  { id: 1, name: 'PFITZER' },
  //  { id: 2, name: 'Elly Lilly' },
  //  { id: 3, name: 'Nestle' }
  //];

  //return {
  //  all: function() {
  //    return enemies;
  //  },
  //  get: function(enemyId) {
  //    // Simple index lookup
  //    return enemies[enemyId];
  //  }
  //}
//});

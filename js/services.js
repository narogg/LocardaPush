angular.module('starter.services', [])

.factory('Enemies', ['$http', function($http, userId) {
    
  // Use a resource here that returns a JSON array
	var enemies = null;
	//enemies = []; //init empty array
	//alert(enemies);
	//alert("user_id: "+window.localStorage['id']);
	userId = window.localStorage['id'];
	
	
	
	//$http.get('http://locarda.herokuapp.com/home/api').success(function(data){
	//$http.get('http://localhost:3000/home/api',{userId:userId}).success(function(data){
	//enemies =  data;
	//console.log('$http.get'+data);
	//});

	$http({
    //url: "http://localhost:3000/home/api", 
	url:"http://locarda.herokuapp.com/home/api",
    method: "GET",
    params: {user_id: userId}
	}).success(function(data){
	enemies = data;	
			
	})
	;
	
	return {
		all: function() {		
	    return enemies;
		},
		// Simple index lookup  
		get: function(enemyId){
		return enemies[enemyId- 1]; //-1 needed for id lookup
		},
		
	
	    /*Posting here*/
	    postCheckIN : function(userId,placeId){	
	    //$http.post('http://localhost:3000/carts/checkin',{userId:userId,placeId:placeId}).success(function(data){
	    $http.post('http://locarda.herokuapp.com/carts/checkin',{userId:userId,placeId:placeId})
		.success(function(data){
			alert('Prijavljeni ste!');
	    }).error(function(data){		
			alert ('Prijava nije uspjela!\nNapomenite osoblju.');			
		})

	    }
	    /**/
	
	}
	
	}]

	);

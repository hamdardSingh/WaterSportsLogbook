'use strict';

angular
  .module('waterSportApp')
  .controller('homeController',['$scope',function ($scope) {
    $scope.db = {};
	//function is called for sending log book entry
	/*var socket =  io();
	$scope.sendLogBookEntry = function() {  
		socket.emit('add entry in logbook', {
			Boat: "Seagul",
		    Crew: "Brendy, Kelly",
			Destination: "Boulter's Lock",
			Departure : "2017/12/30 12:00",
			Arrival : "2017/12/31 11:00"
		});
	};*/
	
    $scope.db.items = [{
      "id": 1,
      "name": {
        "first": "John",
        "last": "Schmidt"
      },
      "address": "45024 France",
      "price": 760.41,
      "isActive": "Yes",
      "product": {
        "description": "Fried Potatoes",
        "options": [
          {
            "description": "Fried Potatoes",
            "image": "//a248.e.akamai.net/assets.github.com/images/icons/emoji/fries.png"
          },
          {
            "description": "Fried Onions",
            "image": "//a248.e.akamai.net/assets.github.com/images/icons/emoji/fries.png"
          }
          ,
          {
            "description": "Fried Onions",
            "image": "//a248.e.akamai.net/assets.github.com/images/icons/emoji/fries.png"
          }
        ]
      }
    },
  //more items go here
    ];
  }]);

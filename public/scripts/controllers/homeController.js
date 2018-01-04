'use strict';

angular
  .module('waterSportApp')
  .controller('homeController',['$scope',function ($scope) {
      var thisObj = $scope;
      var socket =  io.connect('http://localhost:3000');

      function sendLogBookEntry() {
          socket.emit('add entry in logbook', {
              Boat: "Seagul",
              Crew: "Brendy, Kelly",
              Destination: "Boulter's Lock",
              Departure : "2017/12/30 12:00",
              Arrival : "2017/12/31 11:00"
          });
      };
      //sendLogBookEntry();
      socket.emit('get All logbook entry', {});
      socket.on('get All logbook entry', function(data){
          thisObj.db = {};
          thisObj.db.items = [];
          var obj = {};
          for(var i in data) {
              obj.Boat = data[i].Boat;
              obj.Crew = data[i].Crew;
              obj.Destination = data[i].Destination;
              obj.Departure = data[i].Departure;
              obj.Arrival = data[i].Arrival;
              thisObj.db.items.push(obj);
          }
      });
      socket.on('new changes found', function(data){
          console.log("--------------new changes found---------------");
          console.log(data);
          var obj = {};
          console.log("length "+thisObj.db.items.length);
          console.log("row id: "+data.RowId)
          if(data.RowId >= thisObj.db.items.length) {
              console.log("if condition");
              obj[data.Field] = data.Value;
              thisObj.db.items.push(obj);
          }else{
              console.log("else condition");
              obj = thisObj.db.items[data.RowId];
              obj[data.Field] = data.Value;
              thisObj.db.items[data.RowId] = obj;
              console.log(obj)
          }
          //thisObj.db.items.push(obj);
          thisObj.$apply()
      });

      thisObj.saveData = function() {
          alert(1);
      };

      thisObj.afterChange =  function(changes, source) {
          console.log("after change method called");
          console.log(changes); // it call itself many time and it crash the table
          if(source == "edit" && changes[0][3] != ""){
              console.log("inside edit");
              socket.emit('on change', {
                  RowId: changes[0][0],
                  Field: changes[0][1],
                  Value: changes[0][3]
              });
          }

      }



  }]);

'use strict';

angular
  .module('waterSportApp')
  .controller('homeController',['$scope',function ($scope) {
      var thisObj = $scope;
      var socket =  io.connect('http://localhost:3000');

      function sendLogBookEntry(data) {
          socket.emit('add entry in logbook', data);
      };
      //sendLogBookEntry();
      socket.emit('get All logbook entry', {});
      socket.on('get All logbook entry', function(data){
          thisObj.db = {};
          thisObj.db.items = [];

          console.log(data)
          for(var i in data) {
              var obj = {};
              obj.id = data[i]._id;
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
          //console.log("after change method called");
          //console.log(this.getData()); // it call itself many time and it crash the table
          //console.log(source);
          //console.log(changes);
          if(source == "edit" && changes[0][3] != ""){
              console.log("inside edit");
              var rowID = changes[0][0];
              socket.emit('on change', {
                  RowId: rowID,
                  Field: changes[0][1],
                  Value: changes[0][3]
              });
              console.log("row id is");
              console.log(this.getData()[rowID][0]);
              var id = null;
              if(this.getData()[rowID][0]){
                  id = this.getData()[rowID][0];
              }
              sendLogBookEntry({RowId:rowID,ID:id,Field:changes[0][1],Value:changes[0][3]});
          }

      }

      socket.on('sendNewId', function(data){
          var obj = {};
          obj = thisObj.db.items[data.RowId];
          console.log("-----------");
          console.log(obj);
          console.log(data.id);
          obj.id = data.id;
          //obj[id] = data.id;
          thisObj.db.items[data.RowId] = obj;
          thisObj.$apply();
      });

  }]);

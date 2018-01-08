'use strict';

angular
  .module('waterSportApp')
  .controller('homeController',['$scope','$rootScope','$cookies','$http',function ($scope,$rootScope, $cookies,$http) {
    $scope.db = {};
    $scope.db.items = [];
    $scope.uniqueId = Math.random().toString(36).substr(2, 9);

    if(!$cookies.get('userId')){
      var expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + 1);
      $cookies.put('userId',$scope.uniqueId,{'expires':expireDate});
    }else {
      $scope.uniqueId = $cookies.get('userId');
    }

    var socket =  io.connect('http://localhost:5000');
    $scope.minSpareRows = 1;
    function sendLogBookEntry(data) {
        socket.emit('add entry in logbook', data);
    };
    //sendLogBookEntry();
    socket.emit('get All logbook entry', {});
    socket.on('get All logbook entry', function(data){

        $scope.db.items = data;
    });

     //For new changes made
    socket.on('new changes found', function(data){
      var obj = {};
      if(data.RowId >= $scope.db.items.length) {
        obj[data.Field] = data.Value;
        $scope.db.items.push(obj);
      }else{
        obj = $scope.db.items[data.RowId];
        obj[data.Field] = data.Value;
        $scope.db.items[data.RowId] = obj;
      }
      //$scope.db.items.push(obj);
      $scope.$apply()
    });


    //Method called whenever new changes is made to table
    $scope.afterChange =  function(changes, source) {
      if(source == "edit" && changes[0][3] != ""){
        var userId = $scope.uniqueId;
        console.log("inside edit");
        var rowID = changes[0][0];
        socket.emit('on change', {
          RowId: rowID,
          Field: changes[0][1],
          Value: changes[0][3]
        });
        var id = null;
        if($scope.db.items[rowID] && $scope.db.items[rowID]['_id']){
          id = $scope.db.items[rowID]['_id'];
        }
        if($scope.db.items[rowID] && $scope.db.items[rowID]['userId']){
          userId = $scope.db.items[rowID]['userId'];
        }
        sendLogBookEntry({RowId:rowID,ID:id,Field:changes[0][1],Value:changes[0][3],userId:userId});
      }
    }

    socket.on('sendNewId', function(data){
      $scope.db.items[data.RowId]['_id'] = data['_id'];
      $scope.db.items[data.RowId]['userId'] = data['userId'];
      $scope.$apply();
    });

    //Method for making row readonly for other users
    $scope.cells = function (row, col, prop) {
      var cellProperties = {readOnly:false};
      if($scope.db.items[row] && typeof($scope.db.items[row]['userId']) !='undefined' && $scope.db.items[row]['userId'] != $scope.uniqueId){
        cellProperties.readOnly = true;
      }else{
        cellProperties.readOnly = false
      }

      if($scope.db.items[row] && $scope.db.items[row].Boat && $scope.db.items[row].Crew && $scope.db.items[row].Destination && $scope.db.items[row].Departure && $scope.db.items[row].Arrival){
        cellProperties.readOnly = true;
      }

      if($rootScope.admin && $rootScope.admin['_id']){
        cellProperties.readOnly = false;
      }
      return cellProperties;
    }

     //Method to export CSV file
     $scope.exportFile =  function(){
          $http.get('/downloadcsv').then(function(response){
              window.location = "/exportRegister.csv";
          });
      }



  }]);

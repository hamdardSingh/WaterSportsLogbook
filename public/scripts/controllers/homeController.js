'use strict';

angular
  .module('waterSportApp')
  .controller('homeController',['$scope','$rootScope','$cookies',function ($scope,$rootScope, $cookies) {

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
    socket.on('new changes found', function(data){
      console.log("--------------new changes found---------------");
      console.log(data);
      var obj = {};
      console.log("length "+$scope.db.items.length);
      console.log("row id: "+data.RowId)
      if(data.RowId >= $scope.db.items.length) {
        console.log("if condition");
        obj[data.Field] = data.Value;
        $scope.db.items.push(obj);
      }else{
        console.log("else condition");
        obj = $scope.db.items[data.RowId];
        obj[data.Field] = data.Value;
        $scope.db.items[data.RowId] = obj;
        console.log(obj)
      }
      //$scope.db.items.push(obj);
      $scope.$apply()
    });

    $scope.afterChange =  function(changes, source) {
      console.log(changes);
      if(source == "edit" && changes[0][3] != ""){
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
        sendLogBookEntry({RowId:rowID,ID:id,Field:changes[0][1],Value:changes[0][3],userId:$scope.uniqueId});
      }
    }

    socket.on('sendNewId', function(data){
      $scope.db.items[data.RowId]['_id'] = data['_id'];
      $scope.db.items[data.RowId]['userId'] = data['userId'];
      $scope.$apply();
    });

    $scope.cells = function (row, col, prop) {
      var cellProperties = {readOnly:false};
      if($scope.db.items[row] && typeof($scope.db.items[row]['userId']) !='undefined' && $scope.db.items[row]['userId'] != $scope.uniqueId){
        cellProperties.readOnly = true;
      }else{
        cellProperties.readOnly = false
      }

      if($rootScope.admin && $rootScope.admin['_id']){
        cellProperties.readOnly = false;
      }

      //cellProperties.renderer = "cellRenderer";
      return cellProperties;
    }

  }]);

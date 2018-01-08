'use strict';

angular
  .module('waterSportApp')
  .controller('homeController',['$scope','$cookies','$http',function ($scope, $cookies,$http) {
      //  console.log(logbookService.getCSV())

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
       // getCSV();
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
      //  getCSV();
    }

    socket.on('sendNewId', function(data){
      $scope.db.items[data.RowId]['_id'] = data['_id'];
      $scope.db.items[data.RowId]['userId'] = data['userId'];
      $scope.$apply();
    });

    $scope.cells = function (row, col, prop) {
      var cellProperties = {};
      if(typeof($scope.db.items[row]['userId']) !='undefined' && $scope.db.items[row]['userId'] == $scope.uniqueId){
        cellProperties.readOnly = false;
      }else if(typeof($scope.db.items[row]['userId']) == 'undefined'){
        cellProperties.readOnly = false;
      }else{
        cellProperties.readOnly = true;
      }

      //cellProperties.renderer = "cellRenderer";
      return cellProperties;
    }

      $scope.exportFile =  function(){
          $http.get('/downloadcsv').then(function(response){
              window.location = "/exportRegister.csv";
          });
      }




  }]);

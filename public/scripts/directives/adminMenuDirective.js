angular
  .module('waterSportApp')
  .directive('adminMenu',function(){
    return {
  		templateUrl:'scripts/directives/admin.html',
  		restrict:'E',
  		replace:false,
  		scope: {
        'user': '='
  		},
      controller:'adminController'
  	}
  })
  .controller('adminController',function ($scope,$rootScope,$cookies,$http) {
    $scope.admin = {};
    $scope.user ={};
    $scope.login = false;
    if($cookies.get('__admin')){
      $scope.user = JSON.parse($cookies.get('__admin'));
      $rootScope.admin = $scope.user;
      $scope.login = true;
    }

    $scope.loginAdmin = function () {

      $http.post('/admin/api/v1/login',$scope.admin).then(function (data) {
        console.log('test');
        if(data.data.error == 1){
          alert('Invalid username or password');
        }else{
            $scope.user = data.data.user;
            $rootScope.admin = $scope.user;
            $scope.login = true;
            $cookies.put('__admin',JSON.stringify(data.data.user));
        }
      },function (a,b,c) {
        console.log(a,b,c);
        alert('Network Error: Please retry..')
      });
    }

    $scope.logout = function () {
      $cookies.remove('__admin');
      $scope.login = false;
      $scope.user = {};
      $rootScope.admin = false;
      $http.post('/admin/api/v1/logout');
    }

  })

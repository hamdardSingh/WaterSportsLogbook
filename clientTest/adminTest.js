describe('adminController', function(){
	beforeEach(module('waterSportApp'));

	it('admin should login', inject(function($controller,$httpBackend){
    var scope = {};
		$httpBackend.expectPOST('/admin/api/v1/login').respond(200,{'error':0,user:{'name':'hamdard'}});
		var homeController = $controller('adminController',{$scope:scope});
		scope.loginAdmin();
		$httpBackend.flush();
		scope.login.should.equal(true);
	}));

	it('admin failed login', inject(function($controller,$httpBackend){
    var scope = {};
		$httpBackend.expectPOST('/admin/api/v1/login').respond(200,{'error':1});
		var homeController = $controller('adminController',{$scope:scope});
		scope.loginAdmin();
		$httpBackend.flush();
		scope.login.should.equal(false);
	}));

	it('admin should logout', inject(function($controller,$httpBackend){
    var scope = {};
		var homeController = $controller('adminController',{$scope:scope});
		scope.login.should.equal(true);
	}));


});

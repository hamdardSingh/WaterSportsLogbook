describe('homeController', function(){
	beforeEach(module('waterSportApp'));


	it('should render index page', inject(function($controller){
    var scope = {};
		var homeController = $controller('homeController',{$scope:scope});
    scope.loaded = 'test';
    scope.loaded.should.equal('test');
	}));

});

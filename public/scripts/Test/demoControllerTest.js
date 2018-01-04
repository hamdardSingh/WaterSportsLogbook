describe('SimpleController', function () {
    // define variables for the services we want to access in tests
    var demoController,
        SimpleService;

    beforeEach(function () {
        // load the module we want to test
        module('app');

        // get services from injector
        inject(function ($controller, _SimpleService_) {
            SimpleService = _SimpleService_;

            // spy on service method to check if it gets called later
            sinon.spy(SimpleService, 'DoSomething');

            // get controller instance from $controller service
            demoController = $controller('demoController');
        });
    });

    afterEach(function(){
        // remove spy from service
        SimpleService.DoSomething.restore();
    });

    describe('constructor', function () {
        it('should do something with the SimpleService', function () {
            // Assert
            assert(SimpleService.DoSomething.calledOnce);
        });
    });
});
(function () {
    'use strict';

    angular
        .module('app')
        .controller('demoController', Controller);

    function Controller(SimpleService) {
        var vm = this;

        initController();
        function DoSomething() {
            console.log("Hello")
        };
        function initController() {
            // do something with the simple service
            SimpleService.DoSomething();
        }
    }
})();
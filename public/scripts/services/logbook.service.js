
    'use strict';

    angular
        .module('waterSportApp')
        .factory('logbookService', function Service($http) {

            $scope.getCSV =  function() {
                return $http.get('/downloadcsv');          // service function to get all Restaurants from dataabse
            };
            return service;

        });



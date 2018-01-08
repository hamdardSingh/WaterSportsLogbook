var chai = require('chai');
var expect = chai.expect;
var assert = require('assert');
var logbook = require('../app/logbookModel');
chai.Should();


describe ('mongoose', function(){

    beforeEach('should save entry to database', function(done){
        var test = logbook({
            Boat: 'The great',
            Crew: 'Him',
            Destination: 'Kiel',
            Departure:'2018-10-16',
            Arrival: '2018-12-16',
            userId: '12aa'
        });
        test.save();
        done();
    });

    it('find out the entries', function(done){

        logbook.find({ Boat: 'The great',
            Crew: 'Him',
            Destination: 'Kiel',
            Departure:'2018-10-16',
            Arrival: '2018-12-16',
            userId: '12aa'})
        done();
    });

    afterEach('Deletes entry', function (done) {
        logbook.findOneAndRemove({Boat: 'The great',
            Crew: 'Him',
            Destination: 'Kiel',
            Departure:'2018-10-16',
            Arrival: '2018-12-16',
            userId: '12aa'}).then(function () {
            logbook.findOne({Boat: 'The great',
                Crew: 'Him',
                Destination: 'Kiel',
                Departure:'2018-10-16',
                Arrival: '2018-12-16',
                userId: '12aa'}).then(function (result) {
                assert(result === null);
                done();
            });
        });
    });
});

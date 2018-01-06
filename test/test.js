var chai = require('chai');
var expect = chai.expect;
var logbook = require('../models/userModel.js');
chai.Should();
var io = require('socket.io-client')
    ,io_server = require('socket.io').listen(3000);
function returnsName(name){
    return name;
}
describe('1st unit test case', function () {
    it('return the name passed to the function', function(){
        returnsName('Tarun').should.equal('Tarun');
    })
})

io = require('socket.io-client')
var socketURL = 'http://localhost:3000'
var socketOptions = {
    transports: ['websocket'],
    'force new connection': true
};



describe ('socket', function(){
    it('should connect', function (done) {
this.socket = io.connect(socketURL, socketOptions)
this.socket.on ('connect', function(socket) {
    console.log('connected')

    done();
})});

    it('should save entry to database', function(done){

                var test = logbook({
                    Boat: 'The great',
                    Crew: 'Him',
                    Destination: 'Kiel',
                    Departure:'2018-10-16',
                    Arrival: '2018-12-16'
                });
            test.save();
            done();
                });

    it('find out the entries', function(done){

        logbook.find({ Boat: 'The great',
            Crew: 'Him',
            Destination: 'Kiel',
            Departure:'2018-10-16',
            Arrival: '2018-12-16'})
        done();
    });
});


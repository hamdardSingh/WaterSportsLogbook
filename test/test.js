var chai = require('chai');
var expect = chai.expect;
var assert = require('assert');
var logbook = require('../app/logbookModel');
chai.Should();

var io = require('socket.io-client')
    ,io_server = require('socket.io').listen(3000);


io = require('socket.io-client')
var socketURL = 'http://localhost:3000'
var socketOptions = {
    transports: ['websocket'],
    'force new connection': true
};

describe ('socket', function(){

    beforeEach( function (done) {
this.socket = io.connect(socketURL, socketOptions)
this.socket.on ('connect', function(socket) {
    console.log('connected')
    done();

})});


   /* it('on change data', function (done) {

        io_server.emit('changes found',{ Boat: 'The great',
            Crew: 'Hi',
            Destination: 'Prague',
            Departure:'2018-10-17',
            Arrival: '2018-12-15',
            userId: '12aa'})
        done();
    });*/

});

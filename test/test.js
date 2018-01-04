var chai = require('chai');
var expect = chai.expect;
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
var assert = require("assert")


var socketURL = 'http://localhost:3000'
var socketOptions = {
    transports: ['websocket'],
    'force new connection': true
};
describe ('socket', function(){

    it('should connect', function (done) {
this.socket = io.connect(socketURL, socketOptions)
this.socket.on ('connect', function() {
    console.log('connected')
    done();
})})});


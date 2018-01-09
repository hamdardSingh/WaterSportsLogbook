var chai = require('chai');
var expect = chai.expect;
var assert = require('assert');
var socketServer = require('../sockets/socket.js');
chai.Should();

var express = require('express');
var app = express();
var server=app.listen(5001)
var io = require('socket.io').listen(server);

socketServer.connect(io);

var ioclient = require('socket.io-client');

describe ('socket connection', function(){
    it('Should be able to connect', function (done) {
        var client=ioclient.connect('http://localhost:3000');
        client.should.be.ok;
        done();
    });

    it('Should emit and receive message', function (done) {
        var client=ioclient.connect('http://localhost:3000');
        client.emit('check message',"message");
        client.on('check message', function(msg){
            expect(msg).equal.to("messsage");
        });
        done();
    });

});
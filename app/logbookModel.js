var mongoose = require('mongoose');

var db = mongoose.createConnection('localhost', 'openhelp');
var Schema = mongoose.Schema;

var logbook = new mongoose.Schema({
    Boat: String,
    Crew: {type: String},
    Destination: { type: String },
    Departure : { type: String },
    Arrival : { type: String },
    userId : { type: String },
    ipAddress: { type: String }
})
var logbookModel = db.model('logbook',logbook);

module.exports = logbookModel;

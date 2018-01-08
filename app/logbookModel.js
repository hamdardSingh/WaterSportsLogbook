var mongoose = require('mongoose');
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
var logbookModel = mongoose.model('logbook',logbook);

module.exports = logbookModel;

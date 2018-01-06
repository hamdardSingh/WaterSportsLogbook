var mongoose = require('mongoose');
    Schema= mongoose.Schema;

var logbookSchema = new mongoose.Schema({
    Boat: String,
    Crew: {type: String},
    Destination: { type: String },
    Departure : { type: String },
    Arrival : { type: String }
});

var logbook = mongoose.model('logbook', logbookSchema);
module.exports = logbook;
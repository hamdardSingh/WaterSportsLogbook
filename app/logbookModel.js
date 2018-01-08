var mongoose = require('mongoose');
var mongoose_csv = require('mongoose-to-csv');
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

logbook.plugin(mongoose_csv, {
    headers: 'Boat Crew Destination Departure Arrival',
    constraints: {
        'Boat': 'Boat',
        'Crew': 'Crew',
        'Destination': 'Destination',
        'Departure' : 'Departure',
        'Arrival' :  'Arrival'
    }
});

var logbookModel = mongoose.model('logbook',logbook);
module.exports = logbookModel;

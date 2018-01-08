var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var admin = new mongoose.Schema({
    username: String,
    password: {type: String},
})
var adminModel = mongoose.model('admin',admin);

module.exports = adminModel;

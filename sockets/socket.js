var logbook = require('../app/logbookModel');
var adminModel = require('../app/adminModel');
var mongoose = require('mongoose');

exports.connect= function (io) {
    io.sockets.on('connection', function(socket){


        //functionality for saving logbook entry in database.
        socket.on('add entry in logbook', function(data){
            var obj = {};
            obj[data.Field] = data.Value;
            obj['userId'] = data.userId;
            var rowId = data.RowId;
            var logbookentry = new logbook(obj);
            //Case When new entry is added
            if(data.ID ==  null) {
                console.log('new entry');
                logbookentry.save(function (err, thor) {
                    if (err) return console.error(err);
                    io.emit('sendNewId', {'_id':thor._id,RowId:rowId,'userId':thor.userId});
                });
                //Case When update on entry
            }else{
                var id = mongoose.Types.ObjectId(data.ID);
                logbook.findOneAndUpdate({_id : id},obj, function (err, data) {
                    if (err)
                        console.log(err);
                });
            }
        });

        //functionality for getting all logbook entry from database
        socket.on('get All logbook entry', function(){
            logbook.find(function (err, data) {
                if (err) return console.error(err);
                //Send data to users
                io.emit('get All logbook entry', data);
            });
        });
        //Method called in case of any change found in table
        socket.on('on change', function(data){
            //broadcast to all user whenever changes is made
            socket.broadcast.emit('new changes found',data)
        });
    });

}
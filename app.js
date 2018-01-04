var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var mongoose = require('mongoose');

var db = mongoose.connection;
var logbook;
db.on('error', console.error);
db.once('open', function() {
                                                                 // creating different schemas for different tables
   var logbookSchema = new mongoose.Schema({
       Boat: String,
       Crew: {type: String},
        Destination: { type: String },
        Departure : { type: String },
        Arrival : { type: String }
   });
// Compile a 'logbook' model using the logbookSchema as the structure.
// Mongoose also creates a MongoDB collection called 'logbook' for these documents.
   logbook = mongoose.model('logbook', logbookSchema);
});

mongoose.connect('mongodb://localhost:27017/WaterSportsLogbook');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

io.sockets.on('connection', function(socket){
	
	//functionality for saving logbook entry in database. 
    socket.on('add entry in logbook', function(data){
        //io.emit('chat message', data);
        console.log(data);
        var obj = {};
        obj[data.Field] = data.Value;
        var rowId = data.RowId;
        var logbookentry = new logbook(obj);
        if(data.ID ==  null) {
            console.log("new entry");
            logbookentry.save(function (err, thor) {
                if (err) return console.error(err);
                console.log(thor);
                io.emit('sendNewId', {id:thor._id,RowId:rowId});
            });
        }else{
            console.log("old entry");
            var id = mongoose.Types.ObjectId(data.ID);
            logbook.findOneAndUpdate({_id : id},obj, function (err, data) {
                if (err)
                    console.log(err);
                console.log(data);
            });


        }

    });

	//functionality for getting all logbook entry from database
    socket.on('get All logbook entry', function(){
        logbook.find(function (err, data) {
            if (err) return console.error(err);
            console.log(data);
            io.emit('get All logbook entry', data);
        });
    });

    socket.on('on change', function(data){
        console.log("on change method>>>>>>>>>>>");
        console.log(data);
        socket.broadcast.emit('new changes found',data)
    });

});

var port = process.env.PORT || 3000;
http.listen(port);


module.exports = app;

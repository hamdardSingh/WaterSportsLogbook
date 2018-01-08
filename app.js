var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var index = require('./routes/index');
var adminApi = require('./routes/adminApi');
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/logbook",{useMongoClient: true});
var logbook = require('./app/logbookModel');
var adminModel = require('./app/adminModel');
//logbook.remove({}).exec(); //Empty Log Book
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(session({secret: '0099909090'}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/admin/api/v1', adminApi);

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
        obj['userId'] = data.userId;
        var rowId = data.RowId;
        var logbookentry = new logbook(obj);
        if(data.ID ==  null) {
          console.log('new entry');
            logbookentry.save(function (err, thor) {
                if (err) return console.error(err);
                console.log(thor);
                io.emit('sendNewId', {'_id':thor._id,RowId:rowId,'userId':thor.userId});
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
http.listen(5000);


module.exports = app;

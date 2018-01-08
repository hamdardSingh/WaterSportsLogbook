var express = require('express');
var logbook = require('../app/logbookModel');
var router = express.Router();
var fs = require('fs');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/downloadcsv', function(req, res, next) {
 // res.send("Hello Pooja");
  logbook.find({}).exec()
      .then(function(docs) {
        logbook.csvReadStream(docs)
            .pipe(fs.createWriteStream('public/exportRegister.csv'));
        console.log('.........i am here1111.........');
        console.log(docs);
        console.log('.........i am here222222222.........');
      });
  //  eres.sendFile('logbook.csv')
 // res.sendFile('logbook.csv', { root: path.join(__dirname, '../public') })
  res.send({error:0});

 /* res.writeHead(200, {
    'Content-Type': 'text/csv',
    'Content-Disposition': 'attachment; filename=logbook.csv'
  });
  // pipe file using mongoose-csv
  logbook.find().limit(100).csv(res);*/
});


module.exports = router;

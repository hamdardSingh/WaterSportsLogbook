var express = require('express');
var logbook = require('../app/logbookModel');
var router = express.Router();
var fs = require('fs');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/downloadcsv', function(req, res, next) {
  logbook.find({}).exec()
      .then(function(docs) {
        logbook.csvReadStream(docs)
            .pipe(fs.createWriteStream('public/exportRegister.csv'));
      });
  res.send({error:0});

});


module.exports = router;

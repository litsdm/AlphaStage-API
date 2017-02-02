// call the packages we need
var express = require('express');        // call express
var app = express();                     // define our app using express
var bodyParser = require('body-parser');
var compression = require('compression');
var mongoose = require('mongoose');
var aws = require('aws-sdk');
var multer = require('multer');
var multerS3 = require('multer-s3');
var downloader = require('s3-download-stream');
var fs = require('fs');

var games = require('./app/routes/game.routes.js');
var gameplays = require('./app/routes/gameplay.routes.js');

mongoose.connect(process.env.MONGO_URL);
mongoose.Promise = global.Promise


aws.config.update({
    secretAccessKey: process.env.S3_SECRET_KEY,
    accessKeyId: process.env.S3_ACCESS_KEY,
    region: 'us-west-1'
});

var s3 = new aws.S3();

var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'playgrounds-bucket',
        metadata: function (req, file, cb) {
          cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            console.log(file);
            cb(null, file.originalname); //use Date.now() for unique file keys
        }
    })
});

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));

var port = process.env.PORT || 8080;        // set our port

app.post('/upload', upload.single('upl'), function (req, res, next) {
    res.send("Uploaded!");
});

app.get('/download', function(req, res) {
  console.log("download accessed");
  var config = {
    client: s3,
    concurrency: 6,
    params: {
      Key: "Titan Souls1484806968662.webm",
      Bucket: 'playgrounds-bucket'
    }
  }
  var options = {
      Bucket    : '/playgrounds-bucket',
      Key    : "Titan Souls1484806968662.webm",
  };

  var fileStream = s3.getObject(options).createReadStream();
  fileStream.pipe(res);
});

app.use('/api', games);
app.use('/api', gameplays);

app.listen(port);
console.log('Magic happens on port ' + port);

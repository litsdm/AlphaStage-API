// call the packages we need
var express = require('express');        // call express
var app = express();                     // define our app using express
var bodyParser = require('body-parser');
var compression = require('compression');
var mongoose = require('mongoose');
var aws = require('aws-sdk');
var multer = require('multer');
var multerS3 = require('multer-s3');

var games = require('./app/routes/game.routes.js');

mongoose.connect('mongodb://cdiezm:telefono1@ds159737.mlab.com:59737/playgrounds');
mongoose.Promise = global.Promise

var s3 = new aws.S3();

aws.config.update({
    secretAccessKey: 'pXVML+otjzY7OOUhCXSbsOwJQIcufmMDDtJPphtt',
    accessKeyId: 'AKIAIPZ4W7T44ISFAHTA',
    region: 'us-west-1'
});

var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'playgrounds-bucket',
        key: function (req, file, cb) {
            console.log(file);
            //cb(null, file.originalname); //use Date.now() for unique file keys
        }
    })
});

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));

var port = process.env.PORT || 8080;        // set our port

app.post('/upload', upload.array('upl',1), function (req, res, next) {
    res.send("Uploaded!");
});

app.use('/api', games);

app.listen(port);
console.log('Magic happens on port ' + port);

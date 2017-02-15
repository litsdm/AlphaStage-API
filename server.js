// call the packages we need
var express = require('express');        // call express
var app = express();                     // define our app using express
var bodyParser = require('body-parser');
var compression = require('compression');
var mongoose = require('mongoose');
var aws = require('aws-sdk');
var multer = require('multer');
var multerS3 = require('multer-s3');
var fs = require('fs');
var jwt = require('express-jwt');

var games = require('./app/routes/game.routes.js');
var gameplays = require('./app/routes/gameplay.routes.js');
var feedback = require('./app/routes/feedback.routes.js');
var auth = require('./app/routes/auth.routes.js');
var potentialUser = require('./app/routes/potentialUser.routes.js');

var mongo_url = process.env.MONGO_URL;
var s3_secret = process.env.S3_SECRET_KEY;
var s3_access = process.env.S3_ACCESS_KEY;
var jwt_secret = process.env.JWT_SECRET;

mongoose.connect(mongo_url);
mongoose.Promise = global.Promise


aws.config.update({
    secretAccessKey: s3_secret,
    accessKeyId: s3_access,
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

app.use(jwt({
    secret: jwt_secret,
    getToken: function fromHeaderOrCookie (req) { //fromHeaderOrQuerystring
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
      } else if (req.cookies && req.cookies.token) {
        return req.cookies.token;
      }
      return null;
    }
  }).unless({path: ['/', '/register']}));

var port = process.env.PORT || 8080;        // set our port

app.post('/upload', upload.single('upl'), function (req, res, next) {
    res.send("Uploaded!");
});

app.use('/api', games);
app.use('/api', gameplays);
app.use('/api', feedback);
app.use('/api', auth);
app.use(potentialUser);

app.listen(port);
console.log('Magic happens on port ' + port);

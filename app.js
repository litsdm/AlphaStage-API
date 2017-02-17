// call the packages we need
var express = require('express');        // call express
var app = express();                     // define our app using express
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var compression = require('compression');
var mongoose = require('mongoose');
var aws = require('aws-sdk');
var multer = require('multer');
var multerS3 = require('multer-s3');
var fs = require('fs');
var jwt = require('express-jwt');
var path = require('path');

// Import routes
var games = require('./server/routes/game.routes.js');
var gameplays = require('./server/routes/gameplay.routes.js');
var feedback = require('./server/routes/feedback.routes.js');
var auth = require('./server/routes/auth.routes.js');
var potentialUser = require('./server/routes/potentialUser.routes.js');

// Declare env variables
var port = process.env.PORT || 8080;
var mongo_url = process.env.MONGO_URL || 'mongodb://cdiezm:telefono1@ds159737.mlab.com:59737/playgrounds';
var s3_secret = process.env.S3_SECRET_KEY || 'yvwjwhJeNWPA6oRxgWxAKTgBMGpHKEzNyH4OmlvG';
var s3_access = process.env.S3_ACCESS_KEY || 'AKIAIUFDJSTIQ35HF5EQ';
var jwt_secret = process.env.JWT_SECRET || 'anniepamissecret290296';

// Connect to mongoose
mongoose.connect(mongo_url);
mongoose.Promise = global.Promise

// AWS sdk set up
aws.config.update({
    secretAccessKey: s3_secret,
    accessKeyId: s3_access,
    region: 'us-west-1'
});

var s3 = new aws.S3();


// Multer setup to upload files to s3
var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'playgrounds-bucket',
        metadata: function (req, file, cb) {
          cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            console.log(file);
            cb(null, file.originalname);
        }
    })
});

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use('/static', express.static(path.join(__dirname, 'public')))

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
  }).unless({path: ['/', '/register', '/api/signup', '/api/login']}));

app.get('/', function (req, res) {
    res.render('landing');
});

// Upload route
app.post('/upload', upload.single('upl'), function (req, res, next) {
    res.send("Uploaded!");
});

// API Routes
app.use('/api', games);
app.use('/api', gameplays);
app.use('/api', feedback);
app.use('/api', auth);

// Landing page signups route
app.use(potentialUser);

app.listen(port);
console.log('Magic happens on port ' + port);

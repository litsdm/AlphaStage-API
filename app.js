// call the packages we need
require('dotenv').config()
var express = require('express');        // call express
var app = express();                     // define our app using express
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var compression = require('compression');
var mongoose = require('mongoose');
var jwt = require('express-jwt');
var path = require('path');
var mailer = require('express-mailer');
var schedule = require('node-schedule');

// Import routes
var games = require('./server/routes/game.routes.js');
var gameplays = require('./server/routes/gameplay.routes.js');
var feedback = require('./server/routes/feedback.routes.js');
var auth = require('./server/routes/auth.routes.js');
var potentialUser = require('./server/routes/potentialUser.routes.js');
var directUpload = require('./server/routes/upload.routes.js');
var redeemItem = require('./server/routes/redeemItem.routes.js');
var analytics = require('./server/routes/analytics.routes.js');

var RedeemItemController = require('./server/controllers/redeemItem.controller.js');

// Declare env variables
var port = process.env.PORT || 8080;
var mongo_url = process.env.MONGO_URL;
var jwt_secret = process.env.JWT_SECRET;
var mail_password = process.env.MAIL_PASSWORD;

// Connect to mongoose
mongoose.connect(mongo_url);
mongoose.Promise = global.Promise

// Configure app to use bodyParser()
// this will let us get the data from a POST
app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));

// Views setup
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use('/static', express.static(path.join(__dirname, 'public')))

// Mailer Setup
mailer.extend(app, {
  from: 'alphastagegames@gmail.com',
  host: 'smtp.gmail.com', // hostname
  secureConnection: true, // use SSL
  port: 465, // port for secure SMTP
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
  auth: {
    user: 'alphastagegames@gmail.com',
    pass: mail_password
  }
});

// Set authorization with jwt
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
  }).unless({path: ['/', '/register', '/api/signup', '/api/login', '/contact-us']}));

// Landing page route
app.get('/', function (req, res) {
    res.render('landing');
});

// API Routes
app.use('/api', games);
app.use('/api', gameplays);
app.use('/api', feedback);
app.use('/api', auth);
app.use('/api', directUpload);
app.use('/api', redeemItem);
app.use('/api', analytics);

// Other routes
app.post('/api/privateinvite', function (req, res, next) {
  RedeemItemController.addRedeemItem(req, res, next, app);
});

app.post('/contact-us', function(req, res, next) {
  app.mailer.send('contactEmail', {
    to: 'alphastagegames@gmail.com',
    subject: req.body.subject,
    name: req.body.name,
    message: req.body.message,
    email: req.body.email
  }, function (err) {
    if (err) {
      // handle error
      res.send('There was an error sending the email');
      return;
    }

    res.send('Success contacted devs');
  });
})

// Landing page signups route
app.use(potentialUser);

// Jobs
// Every monday at 00:00
var weeklyAnalyticsJob = schedule.scheduleJob('0 0 0 * * 1', function(){
  // Store and reset weekly analytics
});

// First day of every month at 00:00
var monthlyAnalyticsJob = schedule.scheduleJob('0 0 0 1 * *', function(){
  // Store and reset monthly analytics
});

app.listen(port);
console.log('Magic happens on port ' + port);

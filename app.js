// call the packages we need
var express = require('express');        // call express
var app = express();                     // define our app using express
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var compression = require('compression');
var mongoose = require('mongoose');
var jwt = require('express-jwt');
var path = require('path');

// Import routes
var games = require('./server/routes/game.routes.js');
var gameplays = require('./server/routes/gameplay.routes.js');
var feedback = require('./server/routes/feedback.routes.js');
var auth = require('./server/routes/auth.routes.js');
var potentialUser = require('./server/routes/potentialUser.routes.js');
var directUpload = require('./server/routes/upload.routes.js');

// Declare env variables
var port = process.env.PORT || 8080;
var mongo_url = process.env.MONGO_URL || 'mongodb://annie:[T]elefono{1}@ds111940.mlab.com:11940/as-production';
var s3_secret = process.env.AWS_SECRET_ACCESS_KEY;
var s3_access = process.env.AWS_ACCESS_KEY_ID;
var jwt_secret = process.env.JWT_SECRET || "anniepamissecret290296";

// Connect to mongoose
mongoose.connect(mongo_url);
mongoose.Promise = global.Promise

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use('/static', express.static(path.join(__dirname, 'public')))

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
  }).unless({path: ['/', '/register', '/api/signup', '/api/login']}));

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

// Landing page signups route
app.use(potentialUser);

app.listen(port);
console.log('Magic happens on port ' + port);

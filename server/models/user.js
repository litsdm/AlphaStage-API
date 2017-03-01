var mongoose = require('mongoose'),
  bcrypt = require("bcryptjs"),
  Schema = mongoose.Schema;

var UserSchema = new Schema({
  createdAt       : { type: Date },
  updatedAt       : { type: Date },
  email           : { type: String, unique: true, required: true },
  password        : { type: String, required: true },
  username        : { type: String, required: true },
  profilePic      : { type: String, default: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png' },
  games           : [{ type: Schema.Types.ObjectId, ref: 'Game' }],
  downloadedGames : [{ type: Schema.Types.ObjectId, ref: 'Game' }],
  isDeveloper     : { type: Boolean }
});

UserSchema.pre('save', function(next){
  // SET createdAt AND updatedAt
  var now = new Date();
  this.updatedAt = now;
  if ( !this.createdAt ) {
    this.createdAt = now;
  };

  this.downloadedGames = []
  this.games = []

  // ENCRYPT PASSWORD
  var user = this;
  if (!user.isModified('password')) {
    return next();
  };
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash;
      next();
    });
  });
});


UserSchema.methods.comparePassword = function(password, done) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    done(err, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);

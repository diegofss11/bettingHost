///////////////
//USER MODEL //
///////////////
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
    login: String,
    email: String,
    password: String,
    google: String,
    facebook: String,
    token: String
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema, 'User');
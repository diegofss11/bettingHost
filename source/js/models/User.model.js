///////////////
//USER MODEL //
///////////////
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var UserSchema   = new Schema({
    name: String,
    login: String,
    email: String,
    password: String,
    google: String,
    facebook: String,
    token: String
});

module.exports = mongoose.model('User', UserSchema);
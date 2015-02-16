///////////////
//TOURNAMENT MODEL //
///////////////
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var Tournament = new Schema({
    name: String,
    sport: String,
    type: String,
    location: String,
    members: Number,
});

module.exports = mongoose.model('Tournament', Tournament, 'Tournament');
//////////
//Setup //
//////////
var express = require('express'),
	app = express(),
    http = require('http'),
    cors = require('cors'),
	constants = require('./config/constants'),
	mongoose = require('mongoose'),
	Schema  = mongoose.Schema,
	bodyParser = require('body-parser'),
	morgan = require('morgan'),
	jwt = require('jsonwebtoken'),
	UserModel = require('./source/js/models/User.model'),
	db;

//////////////////////
//Application setup //
//////////////////////
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());
app.set('port', 3000);
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*'); //allowed for all domains
    res.setHeader('Access-Control-Allow-Methods', '*'); //operations allowed for this domain
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization'); //headers allowed
    next();
});

///////////////////////////////////////////
//Listen (start app with node server.js) //
///////////////////////////////////////////
http.createServer(app).listen(app.get('port'), function(){
    console.log('LISTENING on port: ' + app.get('port'));
});


//////////////////////////
//Connecting Database	//
//////////////////////////
mongoose.connect(constants.MONGO_DB_CONNECTION_URL);
mongoose.set('debug', true);

db = mongoose.connection;
db.on('error', console.error.bind(console, 'CONNECTION ERROR: '));
db.once('open', function databaseOpenCallback() {
	console.log('Connected on DATABASE');
});


///////////////
//OPERATIONS //
///////////////

//Authenticates to get JWT token
app.post('/authenticate', function(req, res) {
    UserModel.findOne({login: req.body.login, password: req.body.password}, function(err, user) {
        console.log(user);
        if (err) {
            res.json({
                type: false,
                data: "ERROR OCURRED: " + err
            });
        } else {
            if (user) {
               res.json({
                    type: true,
                    data: user,
                    token: user.token
                });
            } else {
                res.json({
                    type: false,
                    data: "Incorrect login/password"
                });
            }
        }
    });
});


//Creates a new user and a new JWT Token
app.post('/signin', function(req, res) {
    UserModel.findOne({email: req.body.email, password: req.body.password}, function(err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (user) {
                res.json({
                    type: false,
                    data: "User already exists!"
                });
            } else {
                var userModel = new User();
                userModel.email = req.body.email;
                userModel.password = req.body.password;
                userModel.save(function(err, user) {
                    user.token = jwt.sign(user, process.env.JWT_SECRET);
                    user.save(function(err, user1) {
                        res.json({
                            type: true,
                            data: user1,
                            token: user1.token
                        });
                    });
                })
            }
        }
    });
});

function _ensureAuthorized(req, res, next) {
    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.send(403);
    }
}

//Ensures autorizations to access any page
app.get('/me', _ensureAuthorized, function(req, res) {
    UserModel.findOne({token: req.token}, function(err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            res.json({
                type: true,
                data: user
            });
        }
    });
});

//////////
//Setup //
//////////
var express = require('express'),
    router = express.Router(),
	app = express(),
    http = require('http'),
	constants = require('./config/constants'),
	mongoose = require('mongoose'),
	Schema  = mongoose.Schema,
	bodyParser = require('body-parser'),
	morgan = require('morgan'),
	jwt = require('jsonwebtoken'),
	UserModel = require('./public/server/User/User.model'),
    db;

//////////////////////
//Application setup //
//////////////////////
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));

app.set('port', 3000);

app.use(express.static(__dirname + '/public'));

app.listen(app.get('port'));


//////////////////////////
//Connecting Database	//
//////////////////////////
mongoose.connect(constants.MONGO_DB_CONNECTION_URL);
mongoose.set('debug', true);

db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB CONECTION ERROR. Please make sure that MongoDB is running. '));
db.once('open', function databaseOpenCallback() {
	console.log('Connected on DATABASE');
});


///////////////
//OPERATIONS //
///////////////

//////////
//LOGIN //
//////////
app.post('/auth/login', function(req, res) {
  UserModel.findOne({ login: req.body.login }, '+password', function(err, user) {
    if (!user) {
      return res.status(401).send({ message: 'Wrong email and/or password' });
    }

    user.comparePassword(req.body.password, function(err, isMatch) {
      if (!isMatch) {
        return res.status(401).send({ message: 'Wrong email and/or password' });
      }

      res.send({ token: createToken(user) });
    });
  });
});


//Google Login
app.post('/auth/google', function(req, res) {
    var accessTokenUrl = 'https://accounts.google.com/o/oauth2/token',
        peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
        params = {
            code: req.body.code,
            client_id: req.body.clientId,
            client_secret: config.GOOGLE_SECRET,
            redirect_uri: req.body.redirectUri,
            grant_type: 'authorization_code'
        };

    console.log('hey');
    // Step 1. Exchange authorization code for access token.
    request.post(accessTokenUrl, { json: true, form: params }, function(err, response, token) {
        var accessToken = token.access_token,
            headers = { Authorization: 'Bearer ' + accessToken };

    // Step 2. Retrieve profile information about the current user.
    request.get({ url: peopleApiUrl, headers: headers, json: true }, function(err, response, profile) {
        var token, payload;

        // Step 3a. Link user accounts.
        if (req.headers.authorization) {
            UserModel.findOne({ google: profile.sub }, function(err, existingUser) {

                if (existingUser) {
                    return res.status(409).send({ message: 'There is already a Google account that belongs to you' });
                }

                token = req.headers.authorization.split(' ')[1];
                payload = jwt.decode(token, config.TOKEN_SECRET);

                UserModel.findById(payload.sub, function(err, user) {

                    if (!user) {
                        return res.status(400).send({ message: 'User not found' });
                    }

                    user.google = profile.sub;
                    user.displayName = user.displayName || profile.name;
                    user.save(function() {
                        token = createToken(user);
                        res.send({ token: token });
                    });
                });
            });
      } else {
        // Step 3b. Create a new user account or return an existing one.
        UserModel.findOne({ google: profile.sub }, function(err, existingUser) {
          if (existingUser) {
            return res.send({ token: createToken(existingUser) });
          }

          var user = new UserModel();
          user.google = profile.sub;
          user.displayName = profile.name;
          user.save(function(err) {
            var token = createToken(user);
            res.send({ token: token });
          });
        });
      }
    });
  });
});


//Authenticates to get JWT token
app.post('/authenticate', function(req, res) {
    UserModel.findOne({login: req.body.login, password: req.body.password}, function(err, user) {
        console.log(user, 'USER FOUND');
        if (err) {
            res.json({
                type: false,
                data: "ERROR OCURRED: " + err
            });
        } else {
            if (user) {
                var token = jwt.sign(profile, secret, { expiresInMinutes: 60*5 });

  res.json({ token: token });
               res.json({
                    type: true,
                    data: user,
                    token: user.token
                });
            } else {
                res.json({
                    type: false,
                    error: 401,
                    data: "Incorrect login/password"
                });
            }
        }
    });
});

function _registerUser(err, req, res, user) {
    if (err) {
        console.log(err);
        res.json({
            status: 401,
            msg: "Unauthorized error - Problem finding login in the database",

        });
    } else if(user) { //user exists already
        res.status(409).send("Conflict: username already exists");

    } else if (user == undefined) {  //user does not exist already
        var newUser = new UserModel( {
            login : req.body.login,
            password : req.body.password,
            email : req.body.email,
            name : req.body.name
        });

        newUser.save(function(err) {
            if (err) {
                console.log(err);
                res.json({
                    status: 500,
                    msg: "Internal Server Error: problem saving " + newUser.login + " to DB",

                });
            }
            else {
                res.json({
                    status: 200,
                    msg: newUser.login + " saved successfuly"
                });
            }
        });
    }

    return res;
}


//Creates a new user and a new JWT Token
app.post('/register', function(req, res) {
    var login = req.body.login || '',
        password = req.body.password || '',
        email = req.body.email || '',
        name = req.body.name || '';

    if (login === '' || password === '' || email === '' || name === '') {
        return res.status(400).send("Bad Request:Registration error");

    } else {
        UserModel.findOne({ login: req.body.login, email: req.body.email }, function(err, user) {
            _registerUser(err, req, res, user);
        });
    }
});

function _ensureAuthorized(req, res, next) {
    var bearerToken, bearer,
        bearerHeader = req.headers["authorization"];

    if(typeof bearerHeader !== 'undefined') {
        bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.send(403);
    }
}
/*
//Ensures autorizations to access any page
app.get('/', function(req,res) {
  res.sendFile(__dirname+'/index.html');
  
});*/

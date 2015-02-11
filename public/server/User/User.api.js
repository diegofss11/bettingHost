var UserAPI = {
    function _registerUser(err, req, res, user) {
        if (err) {
            res.json({
                status: 401,
                msg: "Unauthorized error: Problem finding login in the database",

            });
        } else if(user) { //user exists already
            res.json({
                status: 409,
                message: 'Conflict ocurred: username already exists'
            });
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
                        message: "Internal Server Error: problem saving " + newUser.login + " to DB",
                    });
                }
                else {
                    res.json({
                        status: 200,
                    });
                }
            });
        }
    }


    //Creates a new user and a new JWT Token
    app.post('/register', function(req, res) {
        var login = req.body.login || '',
            password = req.body.password || '',
            email = req.body.email || '',
            name = req.body.name || '';

        if (login === '' || password === '' || email === '' || name === '') {
            res.json({
                status: 400,
                message: 'Registration error'
            });
        } else {
            UserModel.findOne({ login: req.body.login, email: req.body.email }, function(err, user) {
                _registerUser(err, req, res, user);
            });
        }
    });
}


module.exports = UserAPI;
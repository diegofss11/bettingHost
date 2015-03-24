var express = require('express'),
    app = express(),
    http = require('http'),
	constants = require('./config/constants');


/**
* Application setup
*
*/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.set('port', 3000);
app.use(express.static(__dirname + '/public'));
app.listen(app.get('port'));
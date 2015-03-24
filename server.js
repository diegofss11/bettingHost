var express = require('express'),
    app = express();

/**
* Application setup
*
*/

app.use(express.static(__dirname + '/public'));

app.set('port', 3030);

app.listen(app.get('port'));

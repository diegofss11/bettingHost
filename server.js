var express = require('express'),
    app = express(),
    port = process.env.PORT || 3030;

/**
* Application setup
*
*/
app.use(express.static(__dirname + '/public'));

app.set('port', port);

app.listen(port, function(){
    console.log('Listening on port ' + port);
});


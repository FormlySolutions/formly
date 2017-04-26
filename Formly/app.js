
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , prereg = require('./routes/prereg')//preregistration page
  , reg = require('./routes/reg')//registration page
  , http = require('http')
  , path = require('path')
  , bodyParser = require('body-parser');

var app = express();
var router = express.Router();
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
//app.use(express.favicon());
//app.use(express.logger('dev'));
//app.use(express.bodyParser());
//app.use(express.methodOverride());
//app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
var jsonParser = bodyParser.json();
var urlParser = bodyParser.urlencoded({extended: false});

// development only
//if ('development' == app.get('env')) {
  //app.use(express.errorHandler());
//}
//someone came to the splash page
app.get('/', routes.index);
app.get('/users', user.list);

//route normal requests
//requests to pre-register page
app.get('/prereg', prereg.get);
app.post('/prereg', urlParser, prereg.post);
//requests made to the register page
app.get('/reg', reg.get);
app.post('/reg', urlParser, reg.post);

//404 error
app.get('*', function(req, res){
	res.send('Sorry, our servers do not recognise that URL.');
})

http.createServer(app).listen(app.get('port'), function(){
  console.log('Formly is active on port ' + app.get('port'));
});


/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , prereg = require('./routes/prereg')// preregistration page
  , reg = require('./routes/reg')// registration page
  , signin = require('./routes/signin')// signin page
  , main_app = require('./routes/app')// app
  , data = require('./routes/data')// manages api requests for data
  , http = require('http')
  , path = require('path')
  , morgan = require('morgan')
  , cookieParser = require('cookie-parser')
  , bodyParser = require('body-parser');
var database = require('./database');
var actions = require('./actions');
var auth = require('./auth');
var app = express();
var router = express.Router();
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
// app.use(express.favicon());
// app.use(express.logger('dev'));
// app.use(express.bodyParser());
// app.use(express.methodOverride());
// app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('combined'));
app.use(cookieParser());
var jsonParser = bodyParser.json();
var urlParser = bodyParser.urlencoded({extended: false});

// screen requests to all URL, looking for sign in cookie. if it is there,
// fast-forward to /app
// someone came to the splash page
app.get('/', routes.index);

// initial routing of normal requests
	// requests to pre-register page
	app.get('/prereg', prereg.get);
	app.post('/prereg', urlParser, prereg.post);
	// requests made to the register page
	app.get('/reg', reg.get);
	app.post('/reg', urlParser, reg.post);
	// requests made to signin page
	app.get('/signin', signin.get);
	app.post('/signin',urlParser, signin.post)
	
	// requests made to app
	app.get('/app', main_app.get);
// routing of API based requests, commonly for data
	app.get('/data*', data.get);
// routing of action based requests. Rather than having the client transfer data
// to perform sensitive action, the client will submit a request to
// a time limited action domain. The consequence of that action will be stored in db.
	app.post('/actions/:id', urlParser, actions.handle_action);
// 404 error
app.get('*', function(req, res){
	res.send('Sorry, our servers do not recognise that URL.');
})

init = function() {
	// database.init(); ping later on...but redundant and annoying rn
	http.createServer(app).listen(app.get('port'), function(){
		  console.log('Formly is active on port ' + app.get('port'));
		});
}
init();


/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , cons = require('consolidate')
  , MongoClient = require('mongodb').MongoClient
  , app = express();

MongoClient.connect('mongodb://localhost:27017/mydb', function(err, db) {
	if (err) { throw err; }
	
	// all environments
	app.set('port', 3000);
	app.set('views', __dirname + '/views');
	// app.set('view engine', 'jade');
	app.engine('html', cons.swig);
    app.set('view engine', 'html');
    
	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.static(path.join(__dirname, 'public')));
	
	routes(app, db);
	
	//app.get('/', routes.index);
	
	//app.get('/registro', routes.verRegistro);
	//app.post('/registro', routes.guardarRegistro);
	
	// app.get('/users', user.list);
	
	//http.createServer(app).listen(app.get('port'), function() {
	//});

	app.listen(app.get('port'), function() {
		console.log('Express server listening on port ' + app.get('port'));
	});
	
});

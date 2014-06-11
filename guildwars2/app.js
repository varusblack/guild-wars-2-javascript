
/**
 * Module dependencies.
 */
var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , cons = require('consolidate')
  , cron = require('cron')
  , MongoClient = require('mongodb').MongoClient
  , app = express();

MongoClient.connect('mongodb://localhost:27017/mydb', function(err, db) {
	if (err) { throw err; }
	
	app.set('port', 3000);
	app.set('views', __dirname + '/views');
	app.engine('html', cons.swig);
    app.set('view engine', 'html');
    
	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.static(path.join(__dirname, 'public')));
	
	routes(app, db);

	var CronJob = cron.CronJob;
	
	var EventHandler = require('./routes/eventHandler');
	var eventHandler = new EventHandler(db);
	//Cada 5 minutos
	new CronJob('00 00,05,10,15,20,25,30,35,40,45,50,55 * * * *', eventHandler.checkEventAlerts,null,true,"Europe/Spain");
//	new CronJob('00,10,20,30,40,50 00,05,10,15,20,25,30,35,40,45,50,55 * * * *', eventHandler.checkEventAlerts,null,true,"Europe/Spain");
//	new CronJob('00,10,20,30,40,50 * * * * *', eventHandler.checkEventAlerts,null,true,"Europe/Spain");

	app.listen(app.get('port'), function() {
		console.log('Express server listening on port ' + app.get('port'));
	});
	
});

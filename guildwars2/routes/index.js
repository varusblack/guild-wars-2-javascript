var SessionHandler = require('./sessionHandler'),
	ErrorHandler = require('./errorHandler').errorHandler;
	

module.exports = exports = function(app, db) {
	
	var sessionHandler = new SessionHandler(db);

	// Página de entrada
	app.get('/', function(req, res) {
		return res.render('index', { title: 'Express', culo : '' });
	});
	
	// Registro
	app.get('/registration', sessionHandler.displayRegistrationPage);
	app.post('/registration', sessionHandler.handleRegistration);
	
	// Login
	app.get('/login', sessionHandler.displayLoginPage);
	app.post('/login', sessionHandler.handleLoginRequest);
	
	// Perfil
	app.get('/profile', sessionHandler.displayProfilePage);
	app.post('/profile', sessionHandler.handleProfileUpdate);
	
	// Página principal
	app.get('/main', function(req, res) {
		return res.render('main', { title: 'Main'});
	});
	
	// Errores
	app.use(ErrorHandler);
	
	// Logout
	app.get('/logout', sessionHandler.displayLogoutPage);
	
	
};



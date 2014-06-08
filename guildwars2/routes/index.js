var SessionHandler = require('./sessionHandler'),
	ErrorHandler = require('./errorHandler').errorHandler;
	

module.exports = exports = function(app, db) {
	
	var sessionHandler = new SessionHandler(db);

	//Comprobar si el usuario ha iniciado sesión
	app.use(sessionHandler.isLogged);
	
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
	app.get('/main', sessionHandler.displayMainPage);
	
	// Errores
	app.use(ErrorHandler);
//	app.get('/error', )
	
	// Logout
	app.get('/logout', sessionHandler.displayLogoutPage);
	
	
};



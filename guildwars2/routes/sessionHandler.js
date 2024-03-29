var UserDAO = require('../userDAO').UserDAO,
	SessionDAO = require('../sessionDAO').SessionDAO,
	EventDAO = require('../eventDAO').EventDAO;

function SessionHandler(db) {
	
	var userDAO = new UserDAO(db);
	var sessionDAO = new SessionDAO(db);
	var eventDAO = new EventDAO(db);
	
	this.isLogged = function(req, res, next) {
        var session_id = req.cookies.session;
        sessionDAO.getUsername(session_id, function(err, username) {

            if (!err && username) {
                req.username = username;
            }
            return next();
        });
    };
	
	this.displayLoginPage = function(req, res, next) {
		return res.render("login", {username : "", password : "", loginError : ""});
	};
	
	this.handleLoginRequest = function(req, res, next) {
		
		var username = req.body.username;
		var password = req.body.password;
		
		console.log("Iniciando sesión --> username: " + username + ", password: " + password);
		userDAO.validateLogin(username, password, function(err, user){
			
			if (err) {
				if (err.invalidPassword) {
					return res.render("login", {username : username, password : "", login_error : "Contraseña incorrecta"});
				} else if (err.noSuchUser) {
					return res.render("login", {username : username, password : "", login_error : "Usuario inexistente"});
				} else {
					return next(err);
				}
			}
			
			sessionDAO.startSession(user['_id'], function(err, session_id){
				
				if (err) {
					return next(err);
				}
				
				res.cookie('session', session_id);
				return res.redirect('/main');
//				return res.render("main",{'user' : user});
			});
		});
	};
	
	this.displayLogoutPage = function(req, res, next) {
		var session_id = req.cookies.session;
		sessionDAO.endSession(session_id, function(err){
			res.cookie('session', '');
			return res.redirect('/');
		});
	};
	
	this.displayRegistrationPage = function(req, res, next) {
		res.render("registration", {username : "",
									password : "",
									verify_password : "",
									email : "",
									username_error : "",
									password_error : "",
									verify_error : "",
									email_error : ""});
	};
	
	function validateRegistration(username, password, passwordVerify, email, errors) {
		
		var userFormat = /^[a-zA-Z0-9_-]{3,20}$/;
        var passwordFormat = /^.{3,20}$/;
        var emailFormat = /^[\S]+@[\S]+\.[\S]+$/;
        
        errors['username_error'] = "";
        errors['password_error'] = "";
        errors['verify_error'] = "";
        errors['email_error'] = "";
        
        if (!userFormat.test(username)) {
        	errors['username_error'] = "Nombre de usuario inválido. Introduzca solo letras y números.";
        	return false;
        }
        if (!passwordFormat.test(password)) {
        	errors['password_error'] = "Contraseña inválida.";
            return false;
        }
        if (password !== passwordVerify) {
            errors['verify_error'] = "Las contraseñas deben coincidir.";
            return false;
        }
        if (!emailFormat.test(email)) {
        	errors['email_error'] = "Email inválido";
            return false;
        }
        
        return true;
	}
	
	this.handleRegistration = function(req, res, next) {
		
		var username = req.body.username;
		var email = req.body.email;
		var password = req.body.password;
		var passwordVerify = req.body.verify_password;
		var enableAlerts = false;
		if (req.body.alert_enabled !== undefined) {
			enableAlerts = true;
		}
		var timeAlert = req.body.alert_time;
		
		var errors = {'username' : username, 'email' : email};
		
		if (validateRegistration(username, password, passwordVerify, email, errors)) {
			userDAO.addUser(username, password, email, enableAlerts, timeAlert, function(err, user){
				
				if (err) {
					// Nombre de usuario repetido
					if (err.code === '11000') {
						errors['username_error'] = "Nombre de usuario en uso";
						return res.render("registration", errors);
					} else {
						// Otros errores
						return next(err);
					}
				}
				
				sessionDAO.startSession(user['_id'], function(err, session_id){
					if (err) {
						return next(err);
					}
					
					res.cookie('session', session_id);
					return res.redirect('/main');
//					return res.render("main",{'user' : user});
				});
			});
		} else {
			console.log("El usuario no ha sido validado");
			return res.render("registration", errors);
		}
	};
	
	this.displayProfilePage = function(req, res, next) {
		if (!req.username) {
			console.log("No se puede identificar al usuario. Redirigiendo a pantalla de login.");
			return res.redirect("/login");
		}
		
		userDAO.getUser(req.username, function(err, user){
			if (err) {
				console.log("Error al obtener el usuario.");
				return res.redirect('/error');
			}
			return res.render("profile", {'user' : user});
		});
	};
	
	this.handleProfileUpdate = function(req, res, next) {
		var username = req.body.username;
		var email = req.body.email;
		var enableAlerts = false;
		if (req.body.alert_enabled !== undefined) {
			enableAlerts = true;
		}
		var timeAlert = req.body.alert_time;
		
		userDAO.updateUser(username, email, enableAlerts, timeAlert, function(err, user){
			if (err) {
				console.log("Error al actualizar datos usuario.");
				return res.redirect('/error');
			}
			return res.redirect('/profile'); 
		});
	};
}

module.exports = SessionHandler;
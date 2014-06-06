var UserDAO = require('../userDAO').UserDAO,
	SessionDAO = require('../sessionDAO').SessionDAO;

function SessionHandler(db) {
	
	var users = new UserDAO(db);
	var sessions = new SessionDAO(db);
	
	this.displayLoginPage = function(req, res, next) {
		return res.render("login", {username : "", password : "", loginError : ""});
	};
	
	this.handleLoginRequest = function(req, res, next) {
		
		var username = req.body.username;
		var password = req.body.password;
		
		console.log("Iniciando sesión --> username: " + username + ", password: " + password);
		
		users.validateLogin(username, password, function(err, user){
			
			if (err) {
				if (err.invalidPassword) {
					return res.render("login", {username : username, password : "", login_error : "Contraseña incorrecta"});
				} else if (err.noSuchUser) {
					return res.render("login", {username : username, password : "", login_error : "Usuario inexistente"});
				} else {
					return next(err);
				}
			}
			
			sessions.startSession(user['_id'], function(err, session_id){
				
				if (err) {
					return next(err);
				}
				
				res.cookie('session', session_id);
				return res.redirect('/main');
				
			});
			
		});
		
	};
	
	this.displayLogoutPage = function(req, res, next) {
		var session_id = req.cookie.session;
		sessions.endSession(session_id, function(err){
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
        if (password != passwordVerify) {
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
		var timezone = req.body.timezone;
		var enableAlerts = req.body.alert.checked;
		var timeAlert = req.body.alert_time;
		
		var errors = {'username' : username, 'email' : email};
		
		if (validateRegistration(username, password, passwordVerify, email, errors)) {
			users.addUser(username, password, email, timezone, enableAlerts, timeAlert, function(err, user){
				
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
				
				sessions.startSession(user['_id'], function(err, session_id){
					if (err) {
						return next(err);
					}
					
					res.cookie('session', session_id);
					return res.redirect('/main');
				});
			});
		} else {
			console.log("El usuario no ha sido validado");
			return res.render("registration", errors);
		}
	};
	
	this.displayMainPage = function(req, res, next) {
		if (!req.username) {
			console.log("No se puede identificar al usuario. Redirigiendo a pantalla de login.");
			res.redirect("/login");
		}
		
		return res.render("main", {'username' : req.username});
	};
	
	this.displayProfilePage = function(req, res, next) {
		if (!req.username) {
			console.log("No se puede identificar al usuario. Redirigiendo a pantalla de login.");
			res.redirect("/login");
		}
		
		users.getUser(username, function(err, user){
			if (err) {
				console.log("Error al obtener el usuario.");
				res.redirect('/error');
			}
			return res.render("profile", {'username' : user['_id'],
											'email' : user['email'],
											'timezone' : user['timezone'],
											'alert' : user['enable_alerts'],
											'alert_time' : user['time_alert']});
		});
	};
	
	this.handleProfileUpdate = function(req, res, next) {
		var username = req.body.username;
		var email = req.body.email;
		var timezone = req.body.timezone;
		var enableAlerts = req.body.alert.checked;
		var timeAlert = req.body.alert_time;
		
		users.updateUser(username, email, timezone, enableAlerts, timeAlert, function(err, result){
			if (err) {
				console.log("Error al actualizar datos usuario.");
				res.redirect('/error');
			}
			return res.render("profile", {'username' : user['_id'],
				'email' : user['email'],
				'timezone' : user['timezone'],
				'alert' : user['enable_alerts'],
				'alert_time' : user['time_alert']}); 
		});
	}
}

module.exports = SessionHandler;
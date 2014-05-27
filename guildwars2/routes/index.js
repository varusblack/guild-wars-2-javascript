
/*
 * GET home page.
 */
var crypto = require('crypto');
/*exports.index = function(req, res) {
	return res.render('index', { title: 'Express', culo : '' });
};

exports.verRegistro = function(req, res) {
	
	return res.render('registro', {title: 'Registro guay'});
	
};

exports.guardarRegistro = function(req, res) {
	
	var name = req.body.username;
	var password = req.body.password;
	var verifyPassword = req.body.verify_password;
	var email = req.body.email;
	
	var hayErrores = false;
	
	var usernameError;
	var passwordError;
	var verifyError;
	var emailError;
	
	
	if (name === undefined || name.length < 4) {
		usernameError = "Nombre de usuario inválido";
		hayErrores = true;
	}
	
	if (password === undefined || password.length < 4) {
		passwordError = "La contraseña no puede ser vacía";
		hayErrores = true;
	}
	
	if (password !== verifyPassword) {
		verifyError = "Las contraseñas no coinciden";
		hayErrores = true;
	} 
	
	if (email === undefined) {
		emailError = "El email no puede ser vacío";
		hayErrores = true;
	}
	
	if (hayErrores) {
		return res.render('registro', {title: 'Registro guay', name : name, email: email, username_error: usernameError, password_error: passwordError, verify_error: verifyError, email_error: emailError});
	} else {
		db.collection("posts")
	}
	
		
};*/

module.exports = exports = function(app, db) {
	
	var usr = db.collection("users");
	
	app.get('/', function(req, res) {
		return res.render('index', { title: 'Express', culo : '' });
	});
	
	app.get('/registro', function(req, res) {
		return res.render('registro', {title: 'Registro guay'});
	});
	
	
	app.post('/registro', function(req, res, db) {
		
		var name = req.body.username;
		var password = req.body.password;
		var verifyPassword = req.body.verify_password;
		var email = req.body.email;
		
		var hayErrores = false;
		
		var usernameError;
		var passwordError;
		var verifyError;
		var emailError;
		
		
		if (name === undefined || name.length < 4) {
			usernameError = "Nombre de usuario inválido";
			hayErrores = true;
		}
		
		if (password === undefined || password.length < 4) {
			passwordError = "La contraseña no puede ser vacía";
			hayErrores = true;
		}
		
		if (password !== verifyPassword) {
			verifyError = "Las contraseñas no coinciden";
			hayErrores = true;
		} 
		
		if (email === undefined) {
			emailError = "El email no puede ser vacío";
			hayErrores = true;
		}
		
		if (hayErrores) {
			return res.render('registro', {title: 'Registro guay', name : name, email: email, username_error: usernameError, password_error: passwordError, verify_error: verifyError, email_error: emailError});
		} else {
			var user = {name: name,
						lang: "es", 
						pass: password, 
						email: email};
				usr.insert(user, function (err, result) {
					return res.redirect('/');
				});
			
			/*db.collection("users").insert(user, function (err, result) {

	            if (!err) {
	                console.log("Insertado correctamente");
//	                return callback(null, result[0]);
	                return res.redirect('/');
	            }

	            return callback(err, null);
	        });*/
			//return res.redirect('/');
		}
		
	});
	
	app.get('/login', function(req, res) {
		return res.render('login', { title: 'Login'});
	});
	
	app.post('/login', function(req, res, db) {
		var username = req.body.username;
		var password = req.body.password;
		
		var hayErrores = false;
		var usernameError;
		var passError;
		
		if (username === undefined) {
			usernameError = "Nombre de usuario inválido";
			hayErrores = true;
		}
		
		if (password === undefined) {
			passError = "Contraseña inválida";
			hayErrores = true;
		}
		
		if (hayErrores) {
			res.render('login', {title : 'Login', username_error: usernameError,password_error: passError});
		} else {
			usr.findOne({"name":username, "pass":password}, function (err, result) {
				if (result === null) {
					res.render('login', {title : 'Login', username_error: "Nombre de usuario o contraseña incorrectos"});
				} else {
					var current_date = (new Date()).valueOf().toString();
			        var random = Math.random().toString();
			        var session_id = crypto.createHash('sha1').update(current_date + random).digest('hex');
			        res.cookie('session', session_id);
	                return res.redirect('/main');
				}
			});
			
			
		}
		
	});
	
	app.get('/main', function(req, res) {
		return res.render('main', { title: 'Main'});
	});
	
};



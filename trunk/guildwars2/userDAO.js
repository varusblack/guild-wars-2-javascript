/**
 * Manejador de operaciones con usuarios frente a Mongo
 */
var bcrypt = require('bcrypt-nodejs');

function UserDAO(db) {
	
	var users = db.collection("user");
	
	this.addUser = function(username, password, email, timezone, enableAlerts, callback) {
		
		// Encriptación del password
		var salt = bcrypt.genSaltSync();
		var passwordHash = bcrypt.hashSync(password, salt);
		
		// Creación del objeto
		var user = {'_id' : username,
					'password' : passwordHash,
					'email' : email,
					'timezone' : timezone,
					'enable_alerts' : enableAlerts};
		
		users.insert(user, function (err, result){
			
			if (!err) {
				console.log("Usuario " + username + " insertado con exito");
				return callback(null, result[0]);
			}
			
			return callback(err, null);
			
		});
		
	};
	
	this.validateLogin = function(username, password, callback) {
		
		// Definición del callback para la validación del usuario
		function validateUser(err, user) {
			
			if (err) {
				return callback(err, null);
			}
			
			if (user) {
				if (bcrypt.compareSync(password, user.password)) {
					callback(null, user);
				} else {
					var invalidPasswordError = new Error("Contraseña incorrecta");
					...
					callback(invalidPasswordError, null);
				}
			} else {
				var noSuchUserError = new Error("El usuario: " + username + " no existe");
				...
				callback(noSuchUserError, null);
			}
		}
		
		users.findOne({'_id' : username}, validateUser);
	};
	
	this.updateUser = function(username, password, email, timezone, enableAlerts, callback) {
		...
	};
}

module.exports.UserDAO = UserDAO;
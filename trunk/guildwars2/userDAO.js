/**
 * Manejador de operaciones con usuarios frente a Mongo
 */
var bcrypt = require('bcrypt-nodejs');

function UserDAO(db) {
	
	
	/* If this constructor is called without the "new" operator, "this" points
     * to the global object. Log a warning and call it correctly. */
//    if (false === (this instanceof UserDAO)) {
//        console.log('Warning: UserDAO constructor called without "new" operator');
//        return new UserDAO(db);
//    }
	
	var users = db.collection("user");
	
	this.addUser = function(username, password, email, timezone, enableAlerts, timeAlert, callback) {
		
		// Encriptación del password
		var salt = bcrypt.genSaltSync();
		var passwordHash = bcrypt.hashSync(password, salt);
		
		// Creación del objeto
		var user = {'_id' : username,
					'password' : passwordHash,
					'email' : email,
					'timezone' : timezone,
					'enable_alerts' : enableAlerts,
					'time_alert' : timeAlert};
		
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
					invalidPasswordError.invalidPassword = true;
					callback(invalidPasswordError, null);
					
//					var invalid_password_error = new Error("Invalid password");
//                    // Set an extra field so we can distinguish this from a db error
//                    invalid_password_error.invalid_password = true;
//                    callback(invalid_password_error, null);
				}
			} else {
				var noSuchUserError = new Error("El usuario: " + username + " no existe");
				noSuchUserError.noSuchUser = true;
				callback(noSuchUserError, null);
				
//				var no_such_user_error = new Error("User: " + user + " does not exist");
//                // Set an extra field so we can distinguish this from a db error
//                no_such_user_error.no_such_user = true;
//                callback(no_such_user_error, null);
			}
		}
		
		users.findOne({'_id' : username}, validateUser);
	};
	
	this.updateUser = function(username, email, timezone, enableAlerts, timeAlert, callback) {
		users.update(
				{username : username},
				{$set :
					{email : email,
					timezone : timezone,
					enable_alerts : enableAlerts,
					time_alert : timeAlert}
				}, function(err, result) {
					if (!err) {
						console.log("Usuario " + username + " editado con exito");
						return callback(null, result[0]);
					}
					
					return callback(err, null);
				}
		);
	};
	
	this.getUser = function(username, callback) {
		users.findOne({'_id' : username}, function(err, user){
			if (err) {
				return callback(err, null);
			}
			
			return callback(null,user);
		});
	};
}

module.exports.UserDAO = UserDAO;
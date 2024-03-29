/**
 * Manejador de operaciones con sesiones frente a Mongo
 */
var crypto = require('crypto');

function SessionDAO(db) {
	
	var sessions = db.collection("sessions");
	
	this.startSession = function(username, callback) {
		
		// Generación del id de la sesión
		var current_date = (new Date()).valueOf().toString();
		var random = Math.random().toString();
		var session_id = crypto.createHash('sha1').update(current_date + random).digest('hex');
		
		// Creación de la sesión
		var session = {'username' : username, '_id' : session_id};
		
		// Inserción de la sesión
		sessions.insert(session, function(err, result){
			callback(err, session_id);
		});
		
	};
	
	this.endSession = function(session_id, callback) {
		// Borrado de la sesión
		sessions.remove({'_id' : session_id}, function(err, numRemoved){
			callback(err);
		});
	};
	
	this.getUsername = function(session_id, callback) {
		
		if (!session_id) {
			return callback(new Error("No hay sesión establecida"), null);
        }
		
		sessions.findOne({'_id' : session_id}, function(err, session){
			if (err) {
				return callback(err, null);
			}
			
			if (!session) {
				return callback(new Error("La sesión: " + session + " no existe"), null);
			}
			
			callback(null, session.username);
		});
	};
}

module.exports.SessionDAO = SessionDAO;
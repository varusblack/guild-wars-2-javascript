/**
 * Manejador de operaciones con eventos frente a Mongo
 */
function EventDAO(db) {
	
	var events = db.collection("event");
	
	this.getEvents = function(callback) {
		events.find().toArray(function(err, results){
			if (err) {
				return callback(err, null);
			}
			return callback(null, results);
		});
	};
	
	this.getEventByTime = function(time, callback) {
		events.findOne({'time' : {$in : [time]}}, function(err, event){
			if (err) {
				return callback(err, null);
			}
			return callback(null, event);
		});
	};
	
	this.getEventById = function(eventId, callback) {
		events.findOne({'_id' : eventId}, function(err, event){
			if (err) {
				return callback(err, null);
			}
			return callback(null, event);
		});
	};
}

module.exports.EventDAO = EventDAO;
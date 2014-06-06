/**
 * Manejador de operaciones con eventos frente a Mongo
 */
function EventDAO(db) {
	
	/* If this constructor is called without the "new" operator, "this" points
     * to the global object. Log a warning and call it correctly. */
//    if (false === (this instanceof EventDAO)) {
//        console.log('Warning: EventDAO constructor called without "new" operator');
//        return new eventDAO(db);
//    }
	
	var events = db.collection("event");
	
	this.getEvents = function(callback) {
		events.find(function(err, results){
			if (err) {
				return callback(err, null);
			}
			return callback(null, results);
		});
	};
	
	this.getEventByTime = function(time, callback) {
		events.findOne({'time' : time}, function(err, event){
			if (err) {
				return callback(err, null);
			}
			return callback(null, event);
		});
	};
	
}

module.exports.EventDAO = EventDAO;
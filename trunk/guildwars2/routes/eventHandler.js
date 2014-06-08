/**
 * New node file
 */
var UserDAO = require('../userDAO').UserDAO,
	EventDAO = require('../eventDAO').EventDAO;

function EventHandler(db) {
	
	var users = new UserDAO(db);
	var events = new EventDAO(db);
	
	this.displayMainPage = function(req, res, next) {
		if (!req.username) {
			console.log("No se puede identificar al usuario. Redirigiendo a pantalla de login.");
			res.redirect("/login");
			return;
		}
		
		users.getUser(req.username, function(err, user){
			if (err) {
				console.log("Error al obtener el usuario.");
				res.redirect('/error');
				return;
			}
			return res.render("main", {'user' : user});
		});
	};
	
}

module.exports = EventHandler;
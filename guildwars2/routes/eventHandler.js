/**
 * New node file
 */
var UserDAO = require('../userDAO').UserDAO,
	EventDAO = require('../eventDAO').EventDAO,
	EmailSender = require('../emailSender').EmailSender;

function EventHandler(db) {
	
	var userDAO = new UserDAO(db);
	var eventDAO = new EventDAO(db);
	var emailSender = new EmailSender();
	
	this.displayMainPage = function(req, res, next) {
		if (!req.username) {
			console.log("No se puede identificar al usuario. Redirigiendo a pantalla de login.");
			return res.redirect("/login");
		}
		
		userDAO.getUser(req.username, function(err, user){
			if (err) {
				console.log("Error al obtener el usuario.");
				return res.redirect('/error');
			}
			eventDAO.getEvents(function(errE, events){
				if (errE) {
					console.log("Error al obtener lista de eventos.");
					return res.redirect('/error');
				}
				
				return res.render("main", {'user' : user, 'events' : events});
			});
		});
	};
	
	this.subscribeToEvents = function(req, res, next){
		var megadestructorEvent = req.body.megadestructor_time;
		var sierpeEvent = req.body.sierpe_time;
		var behemotEvent = req.body.behemot_time;
		var asoladorEvent = req.body.asolador_time;
		var chamanSvanirEvent = req.body.chaman_svanir_time;
		var ulgothEvent = req.body.ulgoth_time;
		var elementalFuegoEvent = req.body.elemental_fuego_time;
		var reinaKarkaEvent = req.body.reina_karka_time;
		var golemEvent = req.body.golem_time;
		var tequatlEvent = req.body.tequatl_time;
		var garraJormagEvent = req.body.garra_jormag_time;
		var granSierpeEvent = req.body.gran_sierpe_time;
		var taidhaEvent = req.body.taidha_time;
		
		var userEvents = new Array();
		
		if (megadestructorEvent !== undefined) {
			if(typeof megadestructorEvent === 'string') {
				megadestructorEvent = [megadestructorEvent];
			}
			var megadestructor = {"_id" : "megadestructor"};
			megadestructor["time"] = megadestructorEvent;
			userEvents.push(megadestructor);
		}
		
		if (sierpeEvent !== undefined) {
			if(typeof sierpeEvent === 'string') {
				sierpeEvent = [sierpeEvent];
			}
			var sierpe = {"_id" : "sierpe"};
			sierpe["time"] = sierpeEvent;
			userEvents.push(sierpe);
		}
		
		if (behemotEvent !== undefined) {
			if(typeof behemotEvent === 'string') {
				behemotEvent = [behemotEvent];
			}
			var behemot = {"_id" : "behemot"};
			behemot["time"] = behemotEvent;
			userEvents.push(behemot);
		}
		
		if (asoladorEvent !== undefined) {
			if(typeof asoladorEvent === 'string') {
				asoladorEvent = [asoladorEvent];
			}
			var asolador = {"_id" : "asolador"};
			asolador["time"] = asoladorEvent;
			userEvents.push(asolador);
		}
		
		if (chamanSvanirEvent !== undefined) {
			if(typeof chamanSvanirEvent === 'string') {
				chamanSvanirEvent = [chamanSvanirEvent];
			}
			var chamanSvanir = {"_id" : "chaman_svanir"};
			chamanSvanir["time"] = chamanSvanirEvent;
			userEvents.push(chamanSvanir);
		}
		
		if (ulgothEvent !== undefined) {
			if(typeof ulgothEvent === 'string') {
				ulgothEvent = [ulgothEvent];
			}
			var ulgoth = {"_id" : "ulgoth"};
			ulgoth["time"] = ulgothEvent;
			userEvents.push(ulgoth);
		}
		
		if (elementalFuegoEvent !== undefined) {
			if(typeof elementalFuegoEvent === 'string') {
				elementalFuegoEvent = [elementalFuegoEvent];
			}
			var elementalFuego = {"_id" : "elemental_fuego"};
			elementalFuego["time"] = elementalFuegoEvent;
			userEvents.push(elementalFuego);
		}
		
		if (reinaKarkaEvent !== undefined) {
			if(typeof reinaKarkaEvent === 'string') {
				reinaKarkaEvent = [reinaKarkaEvent];
			}
			var reinaKarka = {"_id" : "reina_karka"};
			reinaKarka["time"] = reinaKarkaEvent;
			userEvents.push(reinaKarka);
		}
		
		if (golemEvent !== undefined) {
			if(typeof golemEvent === 'string') {
				golemEvent = [golemEvent];
			}
			var golem = {"_id" : "golem"};
			golem["time"] = golemEvent;
			userEvents.push(golem);
		}
		
		if (tequatlEvent !== undefined) {
			if(typeof tequatlEvent === 'string') {
				tequatlEvent = [tequatlEvent];
			}
			var tequatl = {"_id" : "tequatl"};
			tequatl["time"] = tequatlEvent;
			userEvents.push(tequatl);
		}
		
		if (garraJormagEvent !== undefined) {
			if(typeof garraJormagEvent === 'string') {
				garraJormagEvent = [garraJormagEvent];
			}
			var garraJormag = {"_id" : "garra_jormag"};
			garraJormag["time"] = garraJormagEvent;
			userEvents.push(garraJormag);
		}
		
		if (granSierpeEvent !== undefined) {
			if(typeof granSierpeEvent === 'string') {
				granSierpeEvent = [granSierpeEvent];
			}
			var granSierpe = {"_id" : "gran_sierpe"};
			granSierpe["time"] = granSierpeEvent;
			userEvents.push(granSierpe);
		}
		
		if (taidhaEvent !== undefined) {
			if(typeof taidhaEvent === 'string') {
				taidhaEvent = [taidhaEvent];
			}
			var taidha = {"_id" : "taidha"};
			taidha["time"] = taidhaEvent;
			userEvents.push(taidha);
		}
		
		userDAO.subscribeEvents(req.username, userEvents, function(err, user){
			if (err) {
				console.log("Error al suscribirse a eventos.");
				return res.redirect('/error');
			}
			eventDAO.getEvents(function(errE, events){
				if (errE) {
					console.log("Error al obtener lista de eventos.");
					return res.redirect('/error');
				}
				
				return res.redirect('/main');
			});
		});
	};
	
	this.updateEvents = function(req, res, next){
		var date = new Date();
		var time = date.getHours() + ":" + date.getMinutes();
		console.log("Evento que saca la hora: " + time);
		emailSender.testSendEmail();
//		return res.redirect('/');
		
	};
	
	this.checkEventAlerts = function(req, res, next){
		var date = new Date();
		var dateTemp = new Date();
//		var minutes = date.getMinutes();
//		var hours = date.getHours();
		// Se recuperan los usuarios IMPLEMENTAR
		userDAO.getUsers(function(errU, users){
			if (errU) {
				console.log("Error al obtener todos los usuarios");
			}
		// Recorrer todos los usuarios suscritos
			for(var i = 0 ; i < users.length ; i++) {
				var myuser = users[i];
				if (myuser['enable_alerts']){
					// CONTROLA LA SEGUNDA SUMA
					dateTemp.setMinutes(date.getMinutes());
					dateTemp.setMinutes(date.getMinutes() + parseInt(myuser['time_alert']));
					var minutes = dateTemp.getMinutes();
					var hours = dateTemp.getHours();
					
					var userMinutes;
					if (minutes.toString().length < 2) {
						userMinutes = "0" + minutes.toString();
					} else {
						userMinutes = minutes.toString();
					}
					var userHours;
					if (hours.toString().length < 2) {
						userHours = "0" + hours.toString();
					} else {
						userHours = hours.toString();
					}
					
					
					
					
					
					var timeUser = userHours + ":" + userMinutes;
					// Recorrer todos los eventos del usuario
					for (var h = 0 ; h < myuser.events.length ; h ++) {
						var userEvent = myuser.events[h];
						if(userEvent['time'].indexOf(timeUser) !== -1) {
							// Enviar email
							eventDAO.getEventById(userEvent['_id'], function(err, event){
								if (err) {
									console.log("Error al obtener evento");
								}
								emailSender.sendEmail(myuser, event, timeUser);
							});
						}
					}
				}
			}
		});
	};
}

module.exports = EventHandler;
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
			var megadestructor = {"name" : "megadestructor"};
			megadestructor["time"] = megadestructorEvent;
			userEvents.push(megadestructor);
		}
		
		if (sierpeEvent !== undefined) {
			if(typeof sierpeEvent === 'string') {
				sierpeEvent = [sierpeEvent];
			}
			var sierpe = {"name" : "sierpe"};
			sierpe["time"] = sierpeEvent;
			userEvents.push(sierpe);
		}
		
		if (behemotEvent !== undefined) {
			if(typeof behemotEvent === 'string') {
				behemotEvent = [behemotEvent];
			}
			var behemot = {"name" : "behemot"};
			behemot["time"] = behemotEvent;
			userEvents.push(behemot);
		}
		
		if (asoladorEvent !== undefined) {
			if(typeof asoladorEvent === 'string') {
				asoladorEvent = [asoladorEvent];
			}
			var asolador = {"name" : "asolador"};
			asolador["time"] = asoladorEvent;
			userEvents.push(asolador);
		}
		
		if (chamanSvanirEvent !== undefined) {
			if(typeof chamanSvanirEvent === 'string') {
				chamanSvanirEvent = [chamanSvanirEvent];
			}
			var chamanSvanir = {"name" : "chaman_svanir"};
			chamanSvanir["time"] = chamanSvanirEvent;
			userEvents.push(chamanSvanir);
		}
		
		if (ulgothEvent !== undefined) {
			if(typeof ulgothEvent === 'string') {
				ulgothEvent = [ulgothEvent];
			}
			var ulgoth = {"name" : "ulgoth"};
			ulgoth["time"] = ulgothEvent;
			userEvents.push(ulgoth);
		}
		
		if (elementalFuegoEvent !== undefined) {
			if(typeof elementalFuegoEvent === 'string') {
				elementalFuegoEvent = [elementalFuegoEvent];
			}
			var elementalFuego = {"name" : "elemental_fuego"};
			elementalFuego["time"] = elementalFuegoEvent;
			userEvents.push(elementalFuego);
		}
		
		if (reinaKarkaEvent !== undefined) {
			if(typeof reinaKarkaEvent === 'string') {
				reinaKarkaEvent = [reinaKarkaEvent];
			}
			var reinaKarka = {"name" : "reina_karka"};
			reinaKarka["time"] = reinaKarkaEvent;
			userEvents.push(reinaKarka);
		}
		
		if (golemEvent !== undefined) {
			if(typeof golemEvent === 'string') {
				golemEvent = [golemEvent];
			}
			var golem = {"name" : "golem"};
			golem["time"] = golemEvent;
			userEvents.push(golem);
		}
		
		if (tequatlEvent !== undefined) {
			if(typeof tequatlEvent === 'string') {
				tequatlEvent = [tequatlEvent];
			}
			var tequatl = {"name" : "tequatl"};
			tequatl["time"] = tequatlEvent;
			userEvents.push(tequatl);
		}
		
		if (garraJormagEvent !== undefined) {
			if(typeof garraJormagEvent === 'string') {
				garraJormagEvent = [garraJormagEvent];
			}
			var garraJormag = {"name" : "garra_jormag"};
			garraJormag["time"] = garraJormagEvent;
			userEvents.push(garraJormag);
		}
		
		if (granSierpeEvent !== undefined) {
			if(typeof granSierpeEvent === 'string') {
				granSierpeEvent = [granSierpeEvent];
			}
			var granSierpe = {"name" : "gran_sierpe"};
			granSierpe["time"] = granSierpeEvent;
			userEvents.push(granSierpe);
		}
		
		if (taidhaEvent !== undefined) {
			if(typeof taidhaEvent === 'string') {
				taidhaEvent = [taidhaEvent];
			}
			var taidha = {"name" : "taidha"};
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
		var minutes = date.getMinutes();
		// Tiempo con antelación 0
		var timeZero = "";
		if (minutes.toString().length === "1") {
			timeZero = date.getHours() + ":0" + minutes;
		} else {
			timeZero = date.getHours() + ":" + minutes;
		}
		// Tiempo con antelación 5
		var timeFive = date.getHours() + ":" + (minutes + 5);
		// Tiempo con antelación 10
		var timeTen = date.getHours() + ":" + (minutes + 10);
		
		// ANTELACIÓN : 0
		// Obtener evento por hora
		eventDAO.getEventByTime(timeZero, function(err, event){
			if (err) {
				console.log("Error al obtener evento.");
//				return res.redirect('/error');
			}
			if (event !== null) {
				// Obtener usuarios suscritos al evento
				userDAO.getUsersByEvent("true", 0, event, function(errU, users){
					if (errU) {
						console.log("Error al obtener usuarios.");
						console.log(errU);
//					return res.redirect('/error');
					}
					if (users !== null && users.length > 0) {
						// Recorrer todos los usuarios suscritos
						for(var i = 0 ; i < users.length ; i++) {
							var subscribedUser = users[i];
							// Recorrer todos los eventos del usuario
							for (var iE = 0 ; iE < subscribedUser.events.length ; iE ++) {
								var userEvent = subscribedUser.events[iE];
								// Si el evento coincide y está suscrito a esa hora
								if (userEvent['name'] === event['_id']) {
									if(userEvent['time'].indexOf(timeZero) !== -1) {
										// Enviar email
										emailSender.sendEmail(subscribedUser, event, timeZero);
										break;
									}
								}
							}
						}
					} 
				});
				
			}
			// ANTELACIÓN : 5
			// Obtener evento por hora
			eventDAO.getEventByTime(timeFive, function(err, event){
				if (err) {
					console.log("Error al obtener evento.");
//				return res.redirect('/error');
				}
				if (event !== null) {
					// Obtener usuarios suscritos al evento
					userDAO.getUsersByEvent(true, 5, event, function(errU, users){
						if (errU) {
							console.log("Error al obtener usuarios.");
							console.log(errU);
//					return res.redirect('/error');
						}
						if (users !== null && users.length > 0) {
							// Recorrer todos los usuarios suscritos
							for(var i = 0 ; i < users.length ; i++) {
								var subscribedUser = users[i];
								// Recorrer todos los eventos del usuario
								for (var iE = 0 ; iE < subscribedUser.events.length ; iE ++) {
									var userEvent = subscribedUser.events[iE];
									// Si el evento coincide y está suscrito a esa hora
									if (userEvent['name'] === event['_id']) {
										if(userEvent['time'].indexOf(timeFive) !== -1) {
											// Enviar email
											emailSender.sendEmail(subscribedUser, event, timeFive);
											break;
										}
									}
								}
							}
						} 
					});
				}
				// ANTELACIÓN : 10
				// Obtener evento por hora
				eventDAO.getEventByTime(timeTen, function(err, event){
					if (err) {
						console.log("Error al obtener evento.");
//				return res.redirect('/error');
					}
					if (event !== null) {
						// Obtener usuarios suscritos al evento
						userDAO.getUsersByEvent(true, 10, event, function(errU, users){
							if (errU) {
								console.log("Error al obtener usuarios.");
								console.log(errU);
//					return res.redirect('/error');
							}
							if (users !== null && users.length > 0) {
								// Recorrer todos los usuarios suscritos
								for(var i = 0 ; i < users.length ; i++) {
									var subscribedUser = users[i];
									// Recorrer todos los eventos del usuario
									for (var iE = 0 ; iE < subscribedUser.events.length ; iE ++) {
										var userEvent = subscribedUser.events[iE];
										// Si el evento coincide y está suscrito a esa hora
										if (userEvent['name'] === event['_id']) {
											if(userEvent['time'].indexOf(timeTen) !== -1) {
												// Enviar email
												emailSender.sendEmail(subscribedUser, event, timeTen);
												break;
											}
										}
									}
								}
							} 
						});
						
					}
				});
			});
		});
	};
}

module.exports = EventHandler;
/**
 * New node file
 */
var nodemailer = require('nodemailer');

function EmailSender() {
	
	var smtpTransport = nodemailer.createTransport("SMTP",{
	    service: "Gmail",
	    auth: {
	        user: "daw2014gw2mailsender@gmail.com",
	        pass: "alvtrireygw2daw2014"
	    }
	});
	
	this.sendEmail = function(user, event, timeStart) {
		
		var	text = "Hola " + user['name'] + ", \n El evento: " + 
					event['name'] + ", con punto de ruta: " + event['waypoint'] + 
					", comenzará a las" + timeStart + ". \n \n ¡Mucha suerte!";
		var	html = "<p>Hola " + user['name'] + ",</p><p>El evento: " + 
					event['name'] + ", con punto de ruta: " + event['waypoint'] + 
					", comenzará a las" + timeStart + ".</p><p>¡Mucha suerte!</p>";
			
		var mailOptions = {
				from : "daw2014gw2mailsender@gmail.com",
				to : user.email,
				subject : "Alerta por evento de Guild Wars 2",
				text : text,
				html : html
		};
		
		smtpTransport.sendMail(mailOptions, function(error, response){
			if (error) {
				console.log(error);
			} else {
				console.log("Mensaje enviado: " + response.message);
			}
		});
	};
	
this.testSendEmail = function() {
		
		var	text = "Hola, esta es una \n prueba de email";
		var	html = "<p>Hola ,</p><p>Esta es una prueba de email</p>";
			
		var mailOptions = {
				from : "daw2014gw2mailsender@gmail.com",
				to : "daw2014gw2mailsender@gmail.com",
				subject : "Alerta por evento de Guild Wars 2",
				text : text,
				html : html
		};
		
		smtpTransport.sendMail(mailOptions, function(error, response){
			if (error) {
				console.log(error);
			} else {
				console.log("Mensaje enviado: " + response.message);
			}
		});
	};
}
module.exports.EmailSender = EmailSender;
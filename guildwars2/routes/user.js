
//exports.list = function(req, res){
//  res.send("respond with a resource");
//};

module.exports = function(mongoose) {
	
	var schema = mongoose.Schema;
	
	var userSchema = new Schema({
		nombre : String,
		edad : Integer,
		fecha_nacimiento : Date,
		es_admin : Boolean
	});
	
	return mongoose.model('Usuario', userSchema);
}
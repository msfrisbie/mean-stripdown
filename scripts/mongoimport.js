// mongoimport.js
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ngff-dev');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var personnel = require('./personnel');

var Player = mongoose.model(
	'Player', 
	mongoose.Schema({
		"pos": Number,
		"num": String,
		"name": String,
		"team": Number
	})
);

Player.find({},function(err,dbplayers){

	for(var i=0; i<dbplayers.length; i++) {
		dbplayers[i].remove();
	}

	for(var i=0; i<personnel.length; i++) {
		var player = new Player({
			"pos": personnel[i].pos,
			"num": personnel[i].num,
			"name": personnel[i].name,
			"team": personnel[i].team
		})

		player.save(function(err,dbplayer){
			if (err)
			console.log("Error on player save!");
		})
	}
	
	console.log("Player import finished! Press Ctrl+C to exit.");
})

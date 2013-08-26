// var express = require('express');
// var plugin = express();
// exports.init = function(app,db){
// console.log("Setting up standard logger");
// 	app.get('/test',function(req, res, next, db){
// 		console.log("inside");
// 		console.log(req.url);
// 		next();
// 	})

// }
module.exports = require('./lib/mean-logger')
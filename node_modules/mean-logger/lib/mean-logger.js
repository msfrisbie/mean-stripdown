/*!
 * mean-logger
 * Copyright(c) 2013 Linnovate
 * MIT Licensed
 */

/**
 * Module dependencies.
 */
var fs = require('fs'),
    path = require('path');


/**
 * Initialize Logger
 *
 * @api public
 */

function Logger() {

}
/**
 * Logger methods
 */

Logger.prototype = {

    /**
     * Logger Model Initialization
     *
     * @return {Logger}
     * @api public
     */
    initModel: function() {
        var self = this;

        if (self.mongoose) {
            self.mongoose.model('Log', new self.mongoose.Schema({
                message: {
                    type: String,
                    trim: true
                },
                created: {
                    type: Date,
                    default: Date.now
                },
            }));
        }

        return self;
    },

    /**
     * Logger Routes Initialization
     *
     * @return {Logger}
     * @api public
     */
    initRoutes: function() {
        var self = this;

        self.app.get('/logger/log', function(req, res) {
            var log = new self.mongoose.models.Log();
            log.message = req.query.msg;
            log.save();

            res.jsonp(log);
        });

        self.app.get('/logger/show', function(req, res) {
            self.mongoose.models.Log.find().sort('-created').exec(function(err, logs) {
                if (err) {
                    res.render('error', {
                        status: 500
                    });
                } else {
                    res.jsonp(logs);
                }
            });
        });

        return self;
    },

    /**
     * Initializng
     *
     * @param {Express} app
     * @param {Passport} passport
     * @param {Mongoose} mongoose
     * @return {Logger}
     * @api public
     */
    init: function(app, passport, mongoose) {
        var self = this;

        //Checking for valid init 
        if (!app || !passport || !mongoose) {
            throw new Error('Logger Could not Initialize!');
        }

        //Setting app global variables
        self.app = app;
        self.passport = passport;
        self.mongoose = mongoose;

        //Initializing Module Functionality
        self.initRoutes();
        self.initModel();

        return this;
    },

    /**
     * Log message
     *
     * @param {String} message
     * @return {Logger}
     * @api public
     */

    log: function(message) {
        console.log(message);
        return this;
    }
}


var logger = module.exports = exports = new Logger;
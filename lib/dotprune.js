/**
 * Prune JavaScript objects using dot notation and other stuff
 * 
 * @author Branden Horiuchi <bhoriuchi@gmail.com>
 * @license MIT
 * @version 0.1.3
 * 
 */

// external modules
var lodash = require('lodash');

// shared modules
var env = {
	lodash: lodash	
};

// import local modules
env.prune    = require('./prune')(env);
env.circular = require('./circular')(env);

// return module object
module.exports = {
	type     : 'dotprune',
	version  : '0.1.3',
	env      : env,
	prune    : env.prune.prune,
	circular : env.circular.circular
};
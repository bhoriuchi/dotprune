/**
 * Prune JavaScript objects using dot notation and other stuff
 * 
 * @author Branden Horiuchi <bhoriuchi@gmail.com>
 * @license MIT
 * 
 */

// external modules
var lodash = require('lodash');

// shared modules
var env = {
	lodash: lodash	
};

// import local modules
env.prune     = require('./prune')(env);
env.circular  = require('./circular')(env);
env.deeppluck = require('./deeppluck')(env);
env.mergepush = require('./mergepush')(env);
env.stringify = require('./stringify')(env);

// return module object
module.exports = {
	type      : 'dotprune',
	version   : '0.1.10',
	env       : env,
	prune     : env.prune.prune,
	circular  : env.circular.circular,
	deepPluck : env.deeppluck.deepPluck,
	mergePush : env.mergepush.mergePush,
	stringify : env.stringify.stringify
};
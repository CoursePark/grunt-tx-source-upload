'use strict';

/*
 * This allows us to mock the request made within our tests within a child
 * process. It does this by saving a tmp file which we can set with the desired
 * API response within our specs.
 */

var grunt = require('grunt');
var tmpFile = __dirname + '/request-mock.tmp';
var mem = {};

// Load tmp file json if it exists
if (grunt.file.exists(tmpFile)) {
	mem = grunt.file.readJSON(tmpFile);
}

function save() {
	grunt.file.write(tmpFile, JSON.stringify(mem));
}

module.exports = {
	mock: {
		put: function (options, callback) {
			mem.options = options;
			save();
			callback(mem.error, mem.response, mem.body);
		}
	},
	error: function (error) {
		mem.error = error;
		save();
	},
	response: function (response) {
		mem.response = response;
		save();
	},
	body: function (body) {
		mem.body = body;
		save();
	},
	get: function () {
		mem = grunt.file.readJSON(tmpFile);
		return mem;
	},
	clear: function () {
		mem = {};
		if (grunt.file.exists(tmpFile)) {
			grunt.file.delete(tmpFile);
		}
	}
};

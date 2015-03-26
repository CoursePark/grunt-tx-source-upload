'use strict';

module.exports = function (grunt) {
	require('load-grunt-tasks')(grunt);
	grunt.loadTasks('tasks');
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		tabs4life: {
			options: {
				jshint: {
					mocha: true
				}
			},
			src: [
				'.gitignore',
				'Gruntfile.js',
				'LICENSE',
				'package.json',
				'README.md',
				'tasks/**/*.js',
				'test/**/*'
			]
		}
	});
	
	grunt.registerTask('default', ['tabs4life']);
};

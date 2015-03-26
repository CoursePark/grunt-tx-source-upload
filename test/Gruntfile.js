'use strict';

var mockery = require('mockery');

mockery.enable({
	warnOnReplace: false,
	warnOnUnregistered: false
});
// Mock the request object so we can respond with whatever we want
mockery.registerMock('request', require('./request-mock').mock);

module.exports = function (grunt) {
	grunt.loadTasks(__dirname + '/../tasks');
	
	grunt.initConfig({
		'tx-source-upload': {
			test: {
				options: {
					username: 'chesley',
					password: 'you-wish-you-knew',
					project: 'grunt-tx-source-upload-example',
					resource: 'core',
					i18nType: 'DTD'
				},
				src: __dirname + '/locales/en.dtd'
			},
			convert: {
				options: {
					username: 'chesley',
					password: 'you-wish-you-knew',
					project: 'grunt-tx-source-upload-example',
					resource: 'core',
					i18nType: 'DTD',
					convert: function (content) {
						return content.toString().replace(/<\!ENTITY/gm, '<!COOL');
					}
				},
				src: __dirname + '/locales/en.dtd'
			}
		}
	});
	
	grunt.registerTask('default', ['tabs4life']);
};

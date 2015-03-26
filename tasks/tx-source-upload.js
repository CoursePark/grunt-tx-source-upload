'use strict';

module.exports = function (grunt) {
	grunt.registerMultiTask('tx-source-upload', function () {
		var done = this.async();
		
		var options = this.options({
			host: 'https://www.transifex.com/api/2',
			username: process.env.TRANSIFEX_USERNAME,
			password: process.env.TRANSIFEX_PASSWORD,
			project: process.env.TRANSIFEX_PROJECT,
			resource: process.env.TRANSIFEX_RESOURCE,
			convert: null,
			i18nType: null
		});
		
		var request = require('request');
		
		if (this.filesSrc.length !== 1) {
			return grunt.fail.fatal('You must provide one, and only one src file.');
		}
		
		var content = grunt.file.read(this.filesSrc[0]);
		
		// Apply content conversation callback if one provided
		if (typeof options.convert === 'function') {
			content = options.convert(content);
		}
		
		var reqOptions = {
			url: options.host + '/project/' + options.project + '/resource/' + options.resource + '/content',
			auth: {
				user: options.username,
				pass: options.password
			},
			json: {
				i18n_type: options.i18nType,
				content: content
			}
		};
		request.put(reqOptions, function (error, response, body) {
			if (error) {
				return grunt.fail.fatal(error);
			}
			if (response.statusCode !== 200) {
				return grunt.fail.fatal(body);
			}
			
			grunt.log.ok(
				'Successfully ' +
				'Added ' + body.strings_added + ', ' +
				'Updated ' + body.strings_updated + ', ' +
				'Deleted ' +  body.strings_delete + '.'
			);
			
			done();
		});
	});
};

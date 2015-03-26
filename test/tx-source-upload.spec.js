'use strict';

var path = require('path');
var expect = require('chai').expect;
var exec = require('child_process').exec;
var execOptions = {
	cwd: path.join(__dirname, '..')
};
var requestMock = require('./request-mock');

describe('Grunt tx-source-upload', function () {
	beforeEach(function () {
		requestMock.clear();
	});
	
	describe('when uploading', function () {
		describe('and response has internal error', function () {
			it('should show internal error', function (done) {
				requestMock.error('Something Bad Happend!');
				
				exec('grunt --gruntfile test/Gruntfile.js tx-source-upload:test', execOptions, function (error, stdout) {
					expect(error).not.to.be.null;
					expect(stdout).to.contain('Something Bad Happend!');
					done();
				});
			});
		});
		
		describe('and response is fails auth', function () {
			it('should show auth error', function (done) {
				requestMock.response({
					statusCode: 401
				});
				requestMock.body('Authorization Required');
				
				exec('grunt --gruntfile test/Gruntfile.js tx-source-upload:test', execOptions, function (error, stdout) {
					expect(error).not.to.be.null;
					expect(stdout).to.contain('Authorization Required');
					done();
				});
			});
		});
		
		describe('and response is successful', function () {
			it('should show success message with string diff info and send correct info', function (done) {
				requestMock.response({
					statusCode: 200
				});
				requestMock.body({
					strings_added: 50,
					strings_updated: 200,
					strings_delete: 3
				});
				
				exec('grunt --gruntfile test/Gruntfile.js tx-source-upload:test', execOptions, function (error, stdout) {
					expect(error).to.be.null;
					expect(stdout).to.contain('Successfully');
					expect(stdout).to.contain('Added 50');
					expect(stdout).to.contain('Updated 200');
					expect(stdout).to.contain('Deleted 3');
					
					expect(requestMock.get().options.url).to.equal('https://www.transifex.com/api/2/project/grunt-tx-source-upload-example/resource/core/content');
					expect(requestMock.get().options.auth).to.contain({
						user: 'chesley',
						pass: 'you-wish-you-knew'
					});
					
					expect(requestMock.get().options.json).to.contain({
						i18n_type: 'DTD',
						content: '<!ENTITY foo.var1 "Hello">'
					});
					done();
				});
			});
		});
		
		describe('and using convert', function () {
			describe('and response is successful', function () {
				it('should show success message with string diff info and send correct info', function (done) {
					requestMock.response({
						statusCode: 200
					});
					requestMock.body({
						strings_added: 50,
						strings_updated: 200,
						strings_delete: 3
					});
					
					exec('grunt --gruntfile test/Gruntfile.js tx-source-upload:convert', execOptions, function (error, stdout) {
						expect(error).to.be.null;
						expect(stdout).to.contain('Successfully');
						expect(stdout).to.contain('Added 50');
						expect(stdout).to.contain('Updated 200');
						expect(stdout).to.contain('Deleted 3');
						
						expect(requestMock.get().options.url).to.equal('https://www.transifex.com/api/2/project/grunt-tx-source-upload-example/resource/core/content');
						expect(requestMock.get().options.auth).to.contain({
							user: 'chesley',
							pass: 'you-wish-you-knew'
						});
						
						expect(requestMock.get().options.json).to.contain({
							i18n_type: 'DTD',
							content: '<!COOL foo.var1 "Hello">'
						});
						done();
					});
				});
			});
		});
	});
	
	after(function () {
		requestMock.clear();
	});
});

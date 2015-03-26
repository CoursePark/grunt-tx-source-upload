grunt-tx-source-upload
=========================
[![Build Status](https://travis-ci.org/CoursePark/grunt-tx-source-upload.svg)](https://travis-ci.org/CoursePark/grunt-tx-source-upload)
[![Dependency Status](https://david-dm.org/CoursePark/grunt-tx-source-upload.svg)](https://david-dm.org/CoursePark/grunt-tx-source-upload)
[![devDependency Status](https://david-dm.org/CoursePark/grunt-tx-source-upload/dev-status.svg)](https://david-dm.org/CoursePark/grunt-tx-source-upload#info=devDependencies)
[![NPM version](https://badge.fury.io/js/grunt-tx-source-upload.svg)](http://badge.fury.io/js/grunt-tx-source-upload)

Grunt task for updating the source language for a Transifex resource.

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the
[Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a
[Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with
that process, you may install this plugin with this command:

```shell
npm install grunt-tx-source-upload --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-tx-source-upload');
```

## tx-source-upload task
_Run this task with the `grunt tx-source-upload` command._

### src
This is the path to your language source file. You can only provide a single resource file. A src must be provided.

```
src: __dirname + '/locales/en.dtd'
```

### Options
Below is the list of grunt options.

#### username
Your Transifex username. If it's not provided than env var `TRANSIFEX_USERNAME` is used. A username
must be provided.

#### password
Your Transifex password. If it's not provided than env var `TRANSIFEX_PASSWORD` is used. A password
must be provided.

#### project
Your Transifex project slug. If it's not provided than env var `TRANSIFEX_PROJECT` is used. A project
must be provided.

#### resource
Your Transifex resource slug. If it's not provided than env var `TRANSIFEX_RESOURCE` is used. A resource
must be provided.

#### i18nType
This is the i18n format of the source file. It's the `i18n_type` property required by the Transifex API. A i18nType must be provided.

```js
'tx-source-upload': {
	options: {
		username: 'chesley',
		password: 'you-wish-you-knew',
		project: 'grunt-tx-source-upload-example',
		resource: 'core',
		i18nType: 'DTD'
	},
	src: __dirname + '/locales/en.dtd'
}
```

## Running Tests
To execute all the tests, just run:

```
npm test
```

module.exports = function( grunt ) {

	// Removes need for grunt.loadNpmTasks like matchdep but faster
	require( 'jit-grunt' )( grunt );

	// Project Configuration
	grunt.initConfig( {
		pkg : grunt.file.readJSON( 'package.json' ),
		buildSrcFile : 'js/init.js',
		buildSrcMinFile : 'js/init.min.js',
		buildCssSrcFile : 'css/style.css',
		buildCssSrcMinFile : 'css/style.min.css',
		uglify : {
			options : {
				banner : '/**\n' +
  						' * <%= pkg.name %> - v<%= pkg.version %> - build <%= grunt.template.today("yyyy-mm-dd HH:mm:ss") %>\n' +
  						' * Copyright (c) 2015 Selcher;\n' +
  						' * Distributed under the terms of the ISC license.\n' +
						' */\n'
			},
			build : {
				src : '<%= buildSrcFile %>',
				dest : '<%= buildSrcMinFile %>'
			}
		},
		cssmin : {
			css : {
				src : '<%= buildCssSrcFile %>',
				dest : '<%= buildCssSrcMinFile %>'
			}
		},
		watch : {
			files: [ '<%= buildSrcFile %>', '<%= buildCssSrcFile %>' ],
			tasks: [ 'cssmin', 'uglify' ]
		}
	} );

	// Load the plugins
	// uglify -> minify
	// grunt.loadNpmTasks( 'grunt-contrib-uglify' );

	// Replace multiple loadNpmTasks with matchdep and let it automatically add them
	// require( 'matchdep' ).filterDev( 'grunt-*' ).forEach( grunt.loadNpmTasks );

	// load Npm tasks... alertnative to matchdep
	// require( 'load-grunt-tasks' )( grunt, [ 'grunt-*', '!grunt-template-jasmine-requirejs' ] );

	// Defalt task : just minify code
	grunt.registerTask( 'default', [ 'cssmin', 'uglify' ] );

	// Development : watch for file changes and run:
	// 1. jasmine for code testing
	grunt.registerTask( 'dev', [ 'watch' ] );

	// Production : check code and then minify
	grunt.registerTask( 'prod', [ 'cssmin', 'uglify' ] );

};
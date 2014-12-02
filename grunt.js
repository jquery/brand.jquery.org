var rimraf = require( "rimraf" );

module.exports = function( grunt ) {
"use strict";
grunt.loadNpmTasks( "grunt-wordpress" );
grunt.loadNpmTasks( "grunt-jquery-content" );
grunt.loadNpmTasks( "grunt-check-modules" );

grunt.initConfig({
	jshint: {
		options: {
			undef: true,
			node: true
		}
	},
	lint: {
		grunt: "grunt.js"
	},
	watch: {
		pages: {
			files: "pages/**.html",
			tasks: "deploy"
		}
	},
	"build-pages": {
		all: grunt.file.expandFiles( "pages/**" )
	},
	"build-resources": {
		all: grunt.file.expandFiles( "resources/**" )
	},
	wordpress: grunt.utils._.extend({
		dir: "dist/wordpress"
	}, grunt.file.readJSON( "config.json" ) )
});

grunt.registerTask( "clean", function() {
	rimraf.sync( "dist" );
});

grunt.registerHelper( "build-pages-preprocess", function( post, fileName, done ) {
	post.customFields = post.customFields || [];
	post.customFields.push({
		key: "hide_title",
		value: 1
	});
	done();
});

grunt.registerTask( "default", "lint" );
grunt.registerTask( "build", "build-pages build-resources" );
grunt.registerTask( "build-wordpress", "check-modules clean lint build" );

};

var rimraf = require( "rimraf" ),
	jqueryContent = require( "grunt-jquery-content" );

module.exports = function( grunt ) {

grunt.loadNpmTasks( "grunt-check-modules" );
grunt.loadNpmTasks( "grunt-jquery-content" );

grunt.initConfig({
	"build-pages": {
		all: "pages/**"
	},
	"build-resources": {
		all: "resources/**"
	},
	wordpress: (function() {
		var config = require( "./config" );
		config.dir = "dist/wordpress";
		return config;
	})()
});

grunt.registerTask( "clean", function() {
	rimraf.sync( "dist" );
});

jqueryContent.preprocessPost = function( post, postPath, callback ) {
	post.customFields = post.customFields || [];
	post.customFields.push({
		key: "hide_title",
		value: 1
	});

	callback( null, post );
};

grunt.registerTask( "build", [ "build-pages", "build-resources" ] );
grunt.registerTask( "build-wordpress", [ "check-modules", "clean", "build" ] );

};

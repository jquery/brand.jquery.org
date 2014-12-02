var rimraf = require( "rimraf" );

module.exports = function( grunt ) {

grunt.loadNpmTasks( "grunt-check-modules" );
grunt.loadNpmTasks( "grunt-jquery-content" );
grunt.loadNpmTasks( "grunt-wordpress" );

grunt.initConfig({
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

grunt.registerTask( "build", "build-pages build-resources" );
grunt.registerTask( "build-wordpress", "check-modules clean build" );

};

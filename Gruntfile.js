var jqueryContent = require( "grunt-jquery-content" );

module.exports = function( grunt ) {

grunt.loadNpmTasks( "grunt-jquery-content" );

grunt.initConfig({
	"build-posts": {
		page: "pages/**"
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

jqueryContent.postPreprocessors.page = function( post, postPath, callback ) {
	post.customFields = post.customFields || [];
	post.customFields.push({
		key: "hide_title",
		value: 1
	});

	callback( null, post );
};

grunt.registerTask( "build", [ "build-posts", "build-resources" ] );

};

'use strict';

var request = require('request');

module.exports = function (grunt) {
	//show elapsed time at the end
	require('time-grunt')(grunt);
	// load all grunt tasks
	require('load-grunt-tasks')(grunt);

	var reloadPort = 35729, files;

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		develop: {
			server: {
				file: 'dist/app.js'
			}
		},
		less: {
                development:{
                    options:{
                        compress: true,
                        yuicompress: true,
                        optimization: 2
                    },
                    files:{
                        "dist/client/assets/stylesheets/styles.css": "src/client/assets/stylesheets/styles.less"
                    },
                    report:'gzip'
                }       
            },
		/**
		 * copy images and other static assets
		 */
		copy: {
			main: {
				files: [

					//copy to dist
					{
						expand: true,
						src:['app.js','router.js','package.json','README.md'],
						dest: 'dist'
					},
					{
						expand: true,
						cwd: 'src/',
						src: ['client/app/partials/**','client/assets/**','client/vendor/js/**','server/**'],
						dest: 'dist'
					}
				]
			}
		},
    requirejs:{
        compile:{
          options:{
                name:'./main',
                baseUrl:'src/client/app',
                mainConfigFile:'src/client/app/main.js',
                out:'dist/client/app/app.js',
                // optimize:'none',
                include: 'requireLib',
                preserveLicenseComments: false,
                paths: {
                    vendor:'../vendor/js',
                    requireLib: '../vendor/js/require',
                    angular: '../vendor/js/angular',
                    ngRoute:'../vendor/js/angular-route',
                        controllers:'controllers/',
                        partials:'partials/',
                        filters:'filters/',
                        directives:'directives/',
                        services:'services/',
                        routes:'routes/routes'
                  }
          }
        }
    },
		watch: {
			options: {
				nospawn: true,
				livereload: reloadPort
			},
			server: {
				files: [
					'app.js',
					'src/client/routes/*.js'
				],
				tasks: ['copy','develop', 'delayed-livereload']
			},

			client: {
				files: [
					'src/client/app/**/*.*',
					'src/client/assets/**/*.*',
					'src/client/config/**/*.*',
					'src/client/vendor/**/*.*',
					'src/server/views/**/*.*'
				],
				options: {
					livereload: reloadPort
				},
				tasks: ['copy', 'develop','delayed-livereload']
			}

		}
	});

grunt.config.requires('watch.server.files');
	files = grunt.config('watch.server.files');
	files = grunt.file.expand(files);

	grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', function () {
		var done = this.async();
		setTimeout(function () {
			request.get('http://localhost:' + reloadPort + '/changed?files=' + files.join(','), function (err, res) {
				var reloaded = !err && res.statusCode === 200;
				if (reloaded) {
					grunt.log.ok('Delayed live reload successful.');
				} else {
					grunt.log.error('Unable to make a delayed live reload.');
				}
				done(reloaded);
			});
		}, 500);
	});

    //load npm tasks
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    //grunt.loadNpmTasks('grunt-contrib-requirejs');

	// grunt.registerTask('build', ['copy','concat','requirejs']);
	grunt.registerTask('build', ['less','copy']);
	grunt.registerTask('default',['build','develop', 'watch']);

}

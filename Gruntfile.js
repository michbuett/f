/* global module */
module.exports = function (grunt) {
    'use strict';

    var libSrc = grunt.file.expand('src/lib/**/*.js');
    var demoSrc = grunt.file.expand('src/demo/**/*.js');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        eslint: {
            all: 'src/**/*.js',
        },

        jasmine_nodejs: {
            all: {
                specs: ['tests/**'],
            },
        },

        jasmine: {
            options: {
                display: 'short',
                keepRunner: true,
                summary: true,

                specs: [
                    'tests/**/*.spec.js',
                ],
            },

            debug: { // for debugging tests
                src: [
                    'build/test/**/*.js',
                ],

                options: {
                    template: require('grunt-template-jasmine-nml'),
                }
            },
        },

        watch: {
            dev: {
                files: ['Gruntfile.js', 'src/**/*', 'tests/**/*'],
                tasks: ['test', 'demo'],
            },
        },

        connect: {
            dev: {
                options: {
                    livereload: true,
                },
            }
        },

        babel: {
            options: {
                sourceMap: true,
                presets: ['es2015']
            },

            test: {
                files: target(libSrc, 'build/test/'),
            },

            npm: {
                files: target(libSrc, 'build/npm/'),
                options: {
                    sourceMap: false,
                },
            },

            demo: {
                files: [].concat(
                    target(libSrc, 'build/demo/js/lib/'),
                    target(demoSrc, 'build/demo/js/app/')
                )
            },
        },

        copy: {
            demo: {
                files: [{
                    src: ['src/demo/html/index.html'],
                    dest: 'build/demo',
                    expand: true,
                    flatten: true,
                }, {
                    src: ['src/demo/css/*'],
                    dest: 'build/demo/css',
                    expand: true,
                    flatten: true,
                }]
            },
        },

        clean: {
            demo: [ 'build/demo/**/*' ],
            npm: [ 'build/npm/**/*' ],
            test: [ 'build/test/**/*' ],
        },
    });

    // load grunt plugins
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-jasmine-nodejs');

    grunt.registerTask('dev', ['connect', 'watch',]);

    grunt.registerTask('test', [
        'eslint', 'clean:test', 'babel:test', 'jasmine_nodejs', 'jasmine',
    ]);

    grunt.registerTask('demo', [
        'clean:demo', 'copy:demo', 'babel:demo', 'buildDemoLoader',
    ]);

    grunt.registerTask('buildDemoLoader', function () {
        grunt.log.writeln('Build webloader');

        var path = require('path');
        var loader = require('node-module-loader');

        loader.build({
            root: path.resolve(__dirname, 'build/demo'),
            modules: [ './js/lib/f', './js/app/app.js' ],
            target: 'build/demo/js/app/loader.js',
            pathmap: {
                'f': 'js/lib',
            }
        });
    });

    function target(files, target) {
        return files.map(function (fname) {
            return {
                src: fname,
                dest: fname.replace(/^src\/.*\//, target),
            };
        });
    }
};

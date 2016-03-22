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

        watch: {
            dev: {
                files: ['Gruntfile.js', 'src/**/*', 'tests/**/*'],
                tasks: ['test'],
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

        clean: {
            demo: [ 'build/demo/**/*' ],
            npm: [ 'build/npm/**/*' ],
            test: [ 'build/test/**/*' ],
        },
    });

    // load grunt plugins
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-jasmine-nodejs');

    grunt.registerTask('dev', ['connect', 'watch',]);

    grunt.registerTask('test', [
        'eslint', 'clean:test', 'babel:test', 'jasmine_nodejs',
    ]);

    grunt.registerTask('demo', [
        'clean:demo', 'babel:demo', 'buildDemoLoader',
    ]);

    grunt.registerTask('buildDemoLoader', function () {
        grunt.log.writeln('Build webloader');

        var path = require('path');
        var loader = require('node-module-loader');

        loader.build({
            root: path.resolve(__dirname, 'demo'),
            modules: ['./js/f/f'],
            target: 'build/demo/js/app/loader.js',
            pathmap: {
                'f': 'js/f',
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

/* global module */
module.exports = function (grunt) {
    'use strict';

    var sources = grunt.file.expand('src/**/*.js');
    var targetMap = getTargetMap(sources, function (src) {
        return src.replace(/^src\//, '');
    });

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        eslint: {
            target: sources
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

            dist: {
                files: targetMap,
            },

            demo: {
                files: getTargetMap(sources, function (src) {
                    return src.replace(/^src\//, 'demo/js/f/');
                }),
            },
        },

        clean: {
            afterTest: Object.keys(targetMap)
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
        'eslint', 'babel:dist', 'jasmine_nodejs', 'clean:afterTest',
    ]);

    grunt.registerTask('demo', [
        'babel:demo', 'buildDemoLoader',
    ]);

    grunt.registerTask('buildDemoLoader', function () {
        grunt.log.writeln('Build webloader');

        var path = require('path');
        var loader = require('node-module-loader');

        loader.build({
            root: path.resolve(__dirname, 'demo'),
            modules: ['./js/f/f'],
            target: 'demo/js/loader.js',
            pathmap: {
                'f': 'js/f',
            }
        });
    });

    function getTargetMap(source, key, val) {
        var targetMap = {};

        key = key || function (x) { return x; };
        val = val || function (x) { return x; };

        for (var i = 0; i < sources.length; i++) {
            targetMap[key(sources[i])] = val(sources[i]);
        }

        return targetMap;
    }
};

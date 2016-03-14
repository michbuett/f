/* global module */
module.exports = function (grunt) {
    'use strict';

    var sources = grunt.file.expand('src/**/*.js');
    var targetMap = {};

    for (var i = 0; i < sources.length; i++) {
        targetMap[sources[i].replace(/^src\//, '')] = sources[i];
    }

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
            }
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
        'eslint', 'babel', 'jasmine_nodejs', 'clean:afterTest',
    ]);
};

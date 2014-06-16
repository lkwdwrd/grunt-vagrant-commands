/*
 * grunt-restart-vagrant
 * https://github.com/lkwdwrd/grunt-vagrant-restart
 *
 * Copyright (c) 2014 Luke Woodward
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path'),
    npmconf = require( 'npmconf' ),
    async = require( 'async' );

module.exports = function (grunt) {

  function vagrantCMD( command ) {
    return function( done ) {
      grunt.log.ok( 'Running: vagrant ' + command.join( ' ' ) );
      grunt.util.spawn( { cmd: 'vagrant', args: command, opts: { stdio: 'inherit' } }, done );
    };
  }

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('vagrant_commands', 'Runs arbitrary vagrant commands based off of .npmrc path configuration.', function () {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      rc: null
    });

    var vagrantPath, i, length,
        commands = [],
        cwd = process.cwd(),
        done = this.async();

    if ( ! this.data.commands ) {
      grunt.warn("No vagrant commands provided.");
      return done();
    }

    for ( i = 0, length = this.data.commands.length; i < length; i++ ) {
      commands.push( vagrantCMD( this.data.commands[ i ] ) );
    }

    npmconf.load( options.rc, function( er, conf ){
      if ( er ) {
        grunt.warn("Couldn't load npm configuration");
        return done();
      }
      vagrantPath = conf.get( 'vagrantPath' );
      
      if ( ! grunt.file.isDir( vagrantPath ) ) {
        grunt.warn("Couldn't find a Vagrant path in your configuration.");
        return done();
      }

      grunt.file.setBase( vagrantPath );

      async.series( commands, function(){
          grunt.file.setBase( cwd );
          done();
      });
    });
  });
};

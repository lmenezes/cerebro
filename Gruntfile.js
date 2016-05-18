module.exports = function(grunt) {

  grunt.initConfig({
    clean: {
      dist: {
        src: ['_site/dist']
      }
    },
    watch: {
      scripts: {
        files: ['src/**/*.*', 'src/*.*'],
        tasks: ['build'],
        options: {
          spawn: false
        }
      }
    },
    copy: {
      main: {
        files: [
        ]
      }
    },
    concat: {
      vendorjs: {
        src: [
          'src/lib/jquery/*.js',
          'src/lib/angularjs/angular.min.js',
          'src/lib/angularjs/angular-animate.min.js',
          'src/lib/angularjs/angular-route.min.js',
          'src/lib/bootstrap/bootstrap.min.js',
          'src/lib/jsontree/jsontree.min.js',
          'src/lib/typeahead/typeahead.min.js',
          'src/lib/ace/ace.min.js'
        ],
        dest: 'public/lib.js'
      },
      vendorcss: {
        src: [
        ],
        dest: 'public/css/lib.css'
      },
      appjs: {
        src: [
          'src/main.js',
          'src/*/*.js'
        ],
        dest: 'public/app.js'
      },
    },
    jshint: {
      cerebro: {
        src: [

        ]
      }
    },
    qunit: {
      all: ['./tests/all.html']
    },
    karma: {
      unit: {configFile: 'tests/karma.config.js', keepalive: true}
    }
  });
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks("grunt-jscs");
  grunt.registerTask('dev', ['watch'])
  grunt.registerTask('build',
      ['clean', 'copy', 'concat', 'qunit' ]);
  grunt.registerTask('test', ['karma'])
};

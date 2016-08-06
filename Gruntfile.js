module.exports = function(grunt) {

  grunt.initConfig({
    clean: {
      dist: {
        src: [
          'public/css',
          'public/js'
        ]
      }
    },
    watch: {
      scripts: {
        files: ['src/app/*/*.*', 'src/app/*/*/*.*', 'src/app/*.*'],
        tasks: ['build'],
        options: {
          spawn: false
        }
      }
    },
    copy: {
      main: {
        files: []
      }
    },
    concat: {
      vendorjs: {
        src: [
          'src/assets/libs/jquery/*.js',
          'src/assets/libs/angularjs/angular.min.js',
          'src/assets/libs/angularjs/angular-animate.min.js',
          'src/assets/libs/angularjs/angular-route.min.js',
          'src/assets/libs/bootstrap/bootstrap.min.js',
          'src/assets/libs/jsontree/jsontree.min.js',
          'src/assets/libs/typeahead/typeahead.min.js',
          'src/assets/libs/ace/ace.min.js'
        ],
        dest: 'public/js/lib.js'
      },
      vendorcss: {
        src: [
          'src/assets/css/bootstrap.min.css',
          'src/assets/css/font-awesome.min.css'
        ],
        dest: 'public/css/lib.css'
      },
      appjs: {
        src: [
          'src/app/app.routes.js',
          'src/app/components/*/*.js',
          'src/app/shared/*.js',
          'src/app/shared/*/*.js'
        ],
        dest: 'public/js/app.js'
      },
      appcss: {
        src: [
          'src/app/css/app.css'
        ],
        dest: 'public/css/app.css'
      },
    },
    jshint: {
      cerebro: {
        src: [
          'src/app/components/*/*.js',
          'src/app/shared/*.js',
          'src/app/shared/*/*.js'
        ]
      }
    },
    qunit: {
      all: ['./tests/all.html']
    },
    karma: {
      unit: {configFile: 'tests/karma.config.js', keepalive: true}
    },
    jscs: {
      src: [
        'src/app/app.routes.js',
        'src/app/components/*/*.js',
        'src/app/shared/*.js',
        'src/app/shared/*/*.js'
      ],
      options: {
        preset: 'google',
        requireCamelCaseOrUpperCaseIdentifiers: "ignoreProperties"
      }
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
    ['clean', 'jshint', 'jscs', 'concat', 'copy', 'qunit']);
  grunt.registerTask('test', ['karma'])
};

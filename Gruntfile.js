module.exports = function(grunt) {

  var singleRunTests = grunt.option('singleRunTests') !== false;
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
        files: [
          {
            expand: true,
            cwd: 'node_modules/font-awesome/fonts',
            src: ['*'],
            dest: 'public/fonts/'
          }
        ]
      }
    },
    concat: {
      vendorjs: {
        src: [
          'node_modules/jquery/dist/jquery.js',
          'node_modules/angular/angular.min.js',
          'node_modules/angular-animate/angular-animate.min.js',
          'node_modules/angular-route/angular-route.min.js',
          'node_modules/bootstrap/dist/js/bootstrap.min.js',
          'node_modules/@lmenezes/json-tree/jsontree.js',
          'node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js',
          'node_modules/ace-builds/src/ace.js'
        ],
        dest: 'public/js/lib.js'
      },
      vendorcss: {
        src: [
          'src/assets/css/bootstrap.min.css',
          'node_modules/font-awesome/css/font-awesome.css'
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
    karma: {
      unit: {configFile: 'tests/karma.config.js', singleRun: singleRunTests }
    },
    eslint: {
      options: {
        configFile: 'conf/eslint.json',
        fix: true
      },
      target: [
        'src/app/app.routes.js',
        'src/app/components/*/*.js',
        'src/app/shared/*.js',
        'src/app/shared/*/*.js'
      ]
    }
  });
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.registerTask('dev', ['watch']);
  grunt.registerTask('build',
    ['clean', 'jshint', 'eslint', 'concat', 'copy', 'karma']);
  grunt.registerTask('test', ['karma'])
};

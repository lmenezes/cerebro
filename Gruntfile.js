module.exports = function(grunt) {
  grunt.initConfig({
    clean: {
      dist: {
        src: [ 'public/css', 'public/js', 'src/temp', 'public/fonts' ]
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
      font_awesome: {expand: true, cwd: 'node_modules/font-awesome/fonts/', src: '*', dest: 'public/fonts/'},
      font_bs_glyphicons: {expand: true, cwd: 'node_modules/bootstrap/fonts/', src: '*', dest: 'public/fonts/'},
      ace_theme: {expand: true, cwd: 'src/assets/js/ace', src: '*', dest: 'public/js/ace'},
      ace_scripts: {expand: true, cwd: 'node_modules/ace-builds/src-min/', src: ['mode-json.js', 'worker-json.js'], dest: 'public/js/ace'}
    },
    less: {
        bootstrap: {
            files: {
                'src/assets/temp/bootstrap.css': 'src/assets/less/bootstrap-build.less'
            }
        },
    },
    concat: {
      vendorjs: {
        src: [
          'node_modules/jquery/dist/jquery.min.js',
          'node_modules/angular/angular.min.js',
          'node_modules/angular-animate/angular-animate.min.js',
          'node_modules/angular-route/angular-route.min.js',
          'node_modules/bootstrap/dist/js/bootstrap.min.js',
          'src/assets/libs/jsontree/jsontree.min.js',
          'node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js',
          'node_modules/ace-builds/src-min/ace.js',
        ],
        dest: 'public/js/lib.js'
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
    },
    cssmin: {
        bootstrap: {
            expand: false,
            files: {'public/css/lib.css': ['src/assets/temp/bootstrap.css', 'node_modules/font-awesome/css/font-awesome.css']}
        },
        app: {
            expand: false,
            files: {'public/css/app.css': ['src/app/css/app.css']}
        }
    },
    jshint: {
      cerebro: {
        src: ['src/app/components/*/*.js', 'src/app/shared/*.js', 'src/app/shared/*/*.js']
      }
    },
    qunit: {
      all: ['./tests/all.html']
    },
    karma: {
      unit: {configFile: 'tests/karma.config.js', keepalive: true}
    },
    eslint: {
      target: ['src/app/app.routes.js', 'src/app/components/*/*.js', 'src/app/shared/*.js', 'src/app/shared/*/*.js'],
      options: {
        configFile: 'conf/eslint.json',
        failOnError: false,
      },
    }
  });
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('dev', ['watch'])
  grunt.registerTask('build', ['clean', 'jshint', 'eslint', 'less', 'concat', 'copy', 'cssmin', 'qunit']);
  grunt.registerTask('test', ['karma'])
};

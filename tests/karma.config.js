module.exports = function(config) {
  var absolute_root = process.cwd() + '/';

  config.set({
    basePath: '', // base path, that will be used to resolve files and exclude
    frameworks: ['jasmine'], // frameworks to use
    files: [ // list of files / patterns to load in the browser
      absolute_root + '/src/assets/libs/jquery/jquery-2.2.3.min.js',
      absolute_root + '/src/assets/libs/angularjs/angular.min.js',
      absolute_root + '/src/assets/libs/angularjs/angular-route.min.js',
      absolute_root + '/src/assets/libs/angularjs/angular-animate.min.js',
      absolute_root + '/src/assets/libs/typeahead/typeahead.min.js',
      absolute_root + '/src/assets/libs/ace/*.js',
      absolute_root + '/src/assets/libs/jsontree/*.js',
      absolute_root + '/src/app/*.js',
      absolute_root + '/src/app/*/*.js',
      absolute_root + '/src/app/*/*/*.js',
      absolute_root + '/src/**/*.js',
      absolute_root + '/tests/angular-mocks.js',
      absolute_root + '/**/*.tests.js'
    ],
    exclude: [],  // list of files to exclude
    reporters: ['progress'], // test results reporter to use('dots', 'progress', 'junit', 'growl', 'coverage')
    port: 9876, // web server port
    colors: true, // enable / disable colors in the output (reporters and logs)
    logLevel: config.LOG_DEBUG, // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    autoWatch: true, // enable / disable watching file and executing tests whenever any file changes
    usePolling: true,
    transports: ['websocket', 'polling'],
    browsers: ['PhantomJS'],
    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,
    singleRun: false // Continuous Integration mode: if true, it capture browsers, run tests and exit
  });
};

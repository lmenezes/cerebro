module.exports = function(config) {
  var absolute_root = process.cwd() + '/';

  config.set({
    basePath: '', // base path, that will be used to resolve files and exclude
    frameworks: ['jasmine'], // frameworks to use
    files: [ // list of files / patterns to load in the browser
      absolute_root + '/node_modules/jquery/dist/jquery.js',
      absolute_root + '/node_modules/angular/angular.js',
      absolute_root + '/node_modules/angular-route/angular-route.js',
      absolute_root + '/node_modules/angular-animate/angular-animate.js',
      absolute_root + '/node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js',
      absolute_root + '/node_modules/ace-builds/src/ace/ace.js',
      absolute_root + '/node_modules/@lmenezes/json-tree/jsontree.js',
      absolute_root + '/src/app/*.js',
      absolute_root + '/src/app/*/*.js',
      absolute_root + '/src/app/*/*/*.js',
      absolute_root + '/src/**/*.js',
      absolute_root + '/node_modules/angular-mocks/angular-mocks.js',
      absolute_root + '/**/*.tests.js'
    ],
    exclude: [],  // list of files to exclude
    reporters: ['progress'], // test results reporter to use('dots', 'progress', 'junit', 'growl', 'coverage')
    port: 9876, // web server port
    colors: true, // enable / disable colors in the output (reporters and logs)
    logLevel: config.LOG_INFO, // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    autoWatch: true, // enable / disable watching file and executing tests whenever any file changes
    usePolling: true,
    transports: ['websocket', 'polling'],
    browsers: ['ChromeHeadless'],
    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000
  });
};

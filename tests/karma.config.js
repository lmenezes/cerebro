const puppeteer = require('puppeteer');
process.env.CHROME_BIN = puppeteer.executablePath();

module.exports = function(config) {
  var absolute_root = process.cwd() + '/';

  config.set({
    basePath: '', // base path, that will be used to resolve files and exclude
    frameworks: ['jasmine'], // frameworks to use
    files: [ // list of files / patterns to load in the browser
      absolute_root + '/public/js/lib.js',
      absolute_root + '/public/js/ace/*.js',
      absolute_root + '/src/app/*.js',
      absolute_root + '/src/app/*/*.js',
      absolute_root + '/src/app/*/*/*.js',
      absolute_root + '/src/**/*.js',
      absolute_root + '/tests/angular-mocks.js',
      absolute_root + '/**/*.tests.js'
    ],
    exclude: [],  // list of files to exclude
    reporters: ['verbose', 'progress'], // test results reporter to use
    port: 9876, // web server port
    colors: true, // enable / disable colors in the output (reporters and logs)
    logLevel: config.LOG_DEBUG, // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    autoWatch: true, // enable / disable watching file and executing tests whenever any file changes
    usePolling: true,
    transports: ['websocket', 'polling'],
    browsers: ['Chrome'],
    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,
    singleRun: true // Continuous Integration mode: if true, it capture browsers, run tests and exit
  });
};

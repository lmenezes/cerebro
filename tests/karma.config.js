module.exports = function(config) {
    config.set({
        basePath: '', // base path, that will be used to resolve files and exclude
        frameworks: ['jasmine'], // frameworks to use
        files: [ // list of files / patterns to load in the browser
            '../src/lib/jquery/jquery-2.2.3.min.js',
            '../src/lib/angularjs/angular.min.js',
            '../src/lib/angularjs/angular-route.min.js',
            '../src/lib/angularjs/angular-animate.min.js',
            '../src/lib/typeahead/typeahead.js',
            '../src/lib/ace/*.js',
            '../src/lib/jsontree/*.js',
            '../src/*.js',
            '../src/**/*.js',
            'angular-mocks.js',
            '**/*.tests.js'
        ],
        exclude: [],  // list of files to exclude
        reporters: ['progress'], // test results reporter to use('dots', 'progress', 'junit', 'growl', 'coverage')
        port: 9876, // web server port
        colors: true, // enable / disable colors in the output (reporters and logs)
        logLevel: config.LOG_DEBUG, // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        autoWatch: true, // enable / disable watching file and executing tests whenever any file changes
        browsers: ['PhantomJS'], // Start these browsers, currently available(Chrome, ChromeCanary, Firefox, Opera, Safari, PhantomJS, IE)
        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,
        singleRun: false // Continuous Integration mode: if true, it capture browsers, run tests and exit
    });
};

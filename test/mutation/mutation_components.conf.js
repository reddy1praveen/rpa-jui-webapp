const strykerConfiguration = config => {
    config.set({

        coverageAnalysis: 'perTest',
        testFramework: 'jasmine',
        testRunner: 'karma',
        // jasmineConfigFile: 'spec/support/jasmine.json',
        mutator: 'typescript',
        timeoutMs: 8000,

        transpilers: [],
        // babelrcFile: '.babelrc',

        reporter:
            [
                'clear-text',
                'progress',
                'html', 'progress'
            ],

        mutate: [
            'src/app/auth/*.ts',
            '!src/app/auth/*.spec.ts'
        ],
        files: ['**/*'],
        maxConcurrentTestRunners: 2,
        symlinkNodeModules: false,
        htmlReporter: { baseDir: 'functional-output/mutation-assets' },

        karma: {
            projectType: 'angular-cli',
            config: { browsers: ['ChromeHeadless'] },
            karma: { configFile: 'test/karma.conf.js' }
        },

        logLevel: 'debug',
        plugins:
            [
                'stryker-jasmine-runner',
                'stryker-jasmine',
                'stryker-javascript-mutator',
                'stryker-typescript',
                'stryker-html-reporter'
            ]
    });
};

module.exports = strykerConfiguration;

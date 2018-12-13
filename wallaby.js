module.exports = () => {
    return {
        files: [
            'api/**/*.ts',
            'config/**/*.ts',
            { pattern: 'api/**/*.spec.ts', ignore: true, load: false },
            { pattern: '**/**/templates/**', load: false },
        ],

        tests: [
            'api/**/*.spec.ts'
        ],

        env: {
            type: 'node',
            params: {
                env: 'IDAM_SECRET=TZdHXaDbvZTfNy6U;S2S_SECRET=KY4XS6KBPBSVOOSQ'
            }
        }
    };
};

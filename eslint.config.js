import globals from 'globals';

export default [
    {
        ignores: [
            '.codacy/**',
            'node_modules/**',
            '*.min.js'
        ]
    },
    // Configuration for Node.js files (like this config file)
    {
        files: ['eslint.config.js', '**/*.config.js'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: globals.node
        },
        rules: {
            'no-unused-vars': 'warn',
            'no-console': 'off',
            'semi': ['error', 'always'],
            'quotes': ['error', 'single'],
            'indent': ['error', 4],
            'no-trailing-spaces': 'error',
            'eol-last': 'error'
        }
    },
    // Configuration for browser JavaScript files
    {
        files: ['script.js', 'assets/**/*.js'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'script',
            globals: globals.browser
        },
        rules: {
            'no-unused-vars': 'warn',
            'no-console': 'off',
            'semi': ['error', 'always'],
            'quotes': ['error', 'single'],
            'indent': ['error', 4],
            'no-trailing-spaces': 'error',
            'eol-last': 'error'
        }
    }
];

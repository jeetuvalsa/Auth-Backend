import { ESLint } from 'eslint';

export default [
    {
        files: ['src/**/*.{js,ts}'],
        ignores: ['node_modules/', 'dist/'],
        languageOptions: {
            parser: '@typescript-eslint/parser',
            parserOptions: {
                project: './tsconfig.json',
            },
        },
        plugins: {
            '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
            prettier: require('eslint-plugin-prettier'),
        },
        rules: {
            'prettier/prettier': 'error',
            'import/prefer-default-export': 'off',
        },
    },
];

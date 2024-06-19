import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginTypescript from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';

export default [
    {
        files: ['src/**/*.{js,ts}'],
        ignores: ['node_modules/', 'dist/'],
        languageOptions: {
            parser,
            parserOptions: {
                project: './tsconfig.json',
            },
        },
        plugins: {
            '@typescript-eslint': eslintPluginTypescript,
            prettier: eslintPluginPrettier,
        },
        rules: {
            'prettier/prettier': 'error',
            'import/prefer-default-export': 'off',
        },
    },
];

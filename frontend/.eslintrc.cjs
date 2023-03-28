module.exports = {
    root: true,
    extends: [
        'plugin:tailwindcss/recommended',
        'plugin:@typescript-eslint/recommended',
        '@karriereat/eslint-config',
    ],
    ignorePatterns: ['cypress/*', 'cypress.config.js', 'src/stories/*'],
    rules: {
        // See: https://github.com/eslint/eslint/issues/13956
        indent: 'off',
        '@typescript-eslint/indent': ['error', 4],
        'import/extensions': ['error', 'always', {
            js: 'never',
            ts: 'never',
        }],
        'import/prefer-default-export': 'off',
        'import/no-extraneous-dependencies': ['error', {
            devDependencies: true,
            optionalDependencies: false,
        }],
        'no-restricted-syntax': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'error',
        'tailwindcss/no-custom-classname': 'off',
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': 'warn',
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
    },
};

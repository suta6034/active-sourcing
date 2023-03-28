module.exports = {
    extends: [
        '@vue/eslint-config-typescript/recommended',
        '@karriereat/eslint-config/vue3',
    ],
    rules: {
        'import/no-extraneous-dependencies': ['error', {
            devDependencies: false,
            optionalDependencies: false,
        }],
        'vue/html-indent': ['error', 4, {
            attribute: 1,
            closeBracket: 0,
            ignores: [],
        }],
    },
};

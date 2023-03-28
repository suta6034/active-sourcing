/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */
const {
    screens,
    spaces,
    colors,
    fontSizes,
    fontFamilies,
    fontWeights,
    boxShadows,
    maxWidths,
} = require('./src/theme');

module.exports = {
    content: [
        // templates
        './index.html',
        // components
        './src/**/*.{vue,js,ts,jsx,tsx}',
    ],
    theme: {
        colors,
        screens: Object.fromEntries(screens),
        spacing: Object.fromEntries(spaces.map((space, i) => [i, space])),
        fontSize: fontSizes,
        fontFamily: fontFamilies,
        fontWeight: fontWeights,
        boxShadow: boxShadows,
        extend: {
            maxWidth: maxWidths,
            keyframes: {
                loading: {
                    '0%, 100%': {
                        opacity: '0.25',
                    },
                    '20%': {
                        opacity: '1',
                    },
                },
            },
            animation: {
                loading: 'loading 1s infinite ease-out',
            },
        },
    },
    variants: {}, // kept explicit empty to keep the initial output small
    plugins: [
        // eslint-disable-next-line global-require
        require('@tailwindcss/line-clamp'),
    ], // add custom plugins here
    corePlugins: {
        preflight: true, // inject normalizer, browser reset styles
        // layout
        display: true,
        margin: true,
        padding: true,
        width: true,
        // backgrounds
        backgroundColor: true,
        // grid
        gridTemplateColumns: true,
        gap: true,
        // flex
        flex: true,
        flexGrow: true,
        flexShrink: true,
        // typography
        textColor: true,
        fontWeight: true,
        textTransform: true,
        verticalAlign: true,
        // borders
        borderColor: true,
        borderRadius: true,
    },
};

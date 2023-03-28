const screens = new Map([
    ['sm', '640px'],
    ['md', '720px'],
    ['lg', '1024px'],
    ['xl', '1280px'],
    ['2xl', '1440px'],
    ['3xl', '1621px'],
    ['4xl', '1920px'],
    ['max-sm', { max: '639px' }],
    ['max-md', { max: '719px' }],
    ['max-lg', { max: '1023px' }],
    ['max-xl', { max: '1279px' }],
    ['max-2xl', { max: '1439px' }],
    ['max-3xl', { max: '1620px' }],
    ['max-4xl', { max: '1920px' }],
    ['min-lg', { min: '1024px' }],
]);

const spaces = [
    0,
    '0.125rem',
    '0.25rem',
    '0.5rem',
    '0.75rem',
    '1rem',
    '1.5rem',
    '2rem',
    '2.5rem',
    '3rem',
    '3.5rem',
    '4rem',
    '4.5rem',
    '5rem',
    '6rem',
];

const colors = {
    white: '#fff',
    transparent: 'transparent',
    yellow: '#c29305',
    black: '#000',
    error: '#a6201e',
    info: '#FEF9EA',
    notifications: '#DA756C',
    green: {
        50: '#f4fbf0',
        100: '#e9f7de',
        200: '#daefc0',
        300: '#c6e69f',
        400: '#b4dd7f',
        500: '#a4d560',
        600: '#8bc72a',
        700: '#619f00',
        800: '#377800',
        900: '#0d5300',
    },
    gray: {
        50: '#f5f7f7',
        100: '#edeff1',
        200: '#e3e6e9',
        300: '#c9cdd4',
        400: '#a2aab6',
        500: '#7c8797',
        600: '#59667b',
        700: '#435269',
        800: '#2e3d56',
        900: '#979797',
    },
    blue: {
        50: '#e6eefa',
        100: '#cdddf5',
        200: '#b3cdf0',
        300: '#81abe6',
        400: '#689ae1',
        500: '#3579d7',
        600: '#0357cd',
        700: '#0246a4',
        800: '#02347b',
        900: '#142542',
    },
};

const fontSizes = {
    // text sizes
    tiny: ['0.75rem' /** 12px */, '1.5'],
    small: ['0.875rem' /** 14px */, '1.5'],
    base: ['1rem' /** 16px */, '1.5'],
    lead: ['1.125rem' /** 18px */, '1.5'],
    // headlines
    h1: ['2.5rem' /** 40px */, '1.2'],
    h2: ['2rem' /** 32px */, '1.3'],
    h3: ['1.5rem' /** 24px */, '1.167'],
    h4: ['1.125rem' /** 18px */, '1.278'],
};

const fontFamilies = {
    sans: ['Open Sans', 'sans-serif'],
    display: ['Open Sans', 'sans-serif'],
    semiBold: ['OpenSans-SemiBold', 'sans-serif'],
    regular: ['OpenSans-Regular', 'sans-serif'],
};

const fontWeights = {
    light: 300,
    normal: 400,
    semiBold: 600,
    medium: 700,
};

const boxShadows = {
    md: '0px 0px 15px 0px rgba(0, 0, 0, 0.2)',
    hover: '0px 0px 10px 0px rgba(20, 37, 66, 0.2)',
    none: 'none',
    bottom: '0px 15px 10px -15px rgba(0,0,0,0.2)',
    top: '0 -5px 15px -5px rgba(0,0,0,0.2)',
    DEFAULT: '0px 0px 15px 0px rgba(0, 0, 0, 0.1)',
};

const maxWidths = {
    'container-slim': 'calc(736px + 2 * var(--container-px))',
};

module.exports = {
    screens,
    spaces,
    colors,
    fontSizes,
    fontFamilies,
    fontWeights,
    boxShadows,
    maxWidths,
};

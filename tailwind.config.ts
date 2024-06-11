import { addDynamicIconSelectors } from '@iconify/tailwind';

const TAILWIND_PLUGINS = [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('flowbite/plugin')
];

const CUSTOM_PLUGINS = [addDynamicIconSelectors()];
const THEME = {
    ocre: {
        50: '#fff8e6',
        100: '#FDF9EC',
        200: '#FAF5DD',
        300: '#EFEAD3',
        400: '#E5DDB8',
        500: '#DACD98',
        600: '#DFD4A6',
        700: '#C7B363',
        800: '#b35900',
        900: '#994d00',
    },
    primary: {
        50: '#e6f5ff',
        100: '#f1f5f9',
        200: '#e2e8f0',
        300: '#cbd5e1',
        400: '#B97D80',
        500: '#B15B60',
        600: '#A54E53',
        700: '#8F141B',
        800: '#8F141B',
        900: '#5C0E12',
    },
    gris: {
        100: '#EDEFF0',
        200: '#DBE0E2',
        300: '#A6B1B6',
        400: '#839198',
        500: '#4D626C',
        600: '#3B4B53',
        650: '#2d3a40',
        700: '#1E262B',
    },
};

/** @type {import('tailwindcss').Config} */
export default {
    presets: [require('@spartan-ng/ui-core/hlm-tailwind-preset')],
    content: ['./src/**/*.{html,ts}', './projects/**/*.{html,ts}', './src/app/lib/components/**/*.{html,ts}',"./node_modules/flowbite/**/*.js",],
    darkMode: 'class',
    theme: {
        fontFamily: {
            display: ['Open Sans', 'sans-serif'],
            body: ['Open Sans', 'sans-serif'],
        },
        container: {
            center: true,
            padding: '1.5rem',
        },
        extend: {
            colors: THEME,
        },
    },
    plugins: [...TAILWIND_PLUGINS, ...CUSTOM_PLUGINS],
};

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { addDynamicIconSelectors } from '@iconify/tailwind';

const TAILWIND_PLUGINS = [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
];

const CUSTOM_PLUGINS = [addDynamicIconSelectors()];

/** @type {import('tailwindcss').Config} */
export default {
    presets: [require('@spartan-ng/ui-core/hlm-tailwind-preset')],
    content: ['./src/**/*.{html,ts}', './projects/**/*.{html,ts}', './src/app/lib/components/**/*.{html,ts}'],
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
        extend: {},
    },
    plugins: [...TAILWIND_PLUGINS, ...CUSTOM_PLUGINS],
};

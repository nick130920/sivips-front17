import { Pages } from '@lib/interfaces';

export const pages: Pages[] = [
    { title: 'Home', link: '/', icon: 'icon-[solar--home-2-bold]' },
    { title: 'About', link: '/about', icon: 'icon-[solar--cart-5-bold]' },
    {
        title: 'Documents',
        subPages: [{ title: 'About', link: '/document' }],
        icon: 'icon-[solar--document-bold]',
    },
    { title: 'About', link: '/about', icon: 'icon-[solar--cart-5-bold]' },
    { title: 'About', link: '/about', icon: 'icon-[solar--cart-5-bold]' },
];

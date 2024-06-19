import { Pages } from '@lib/interfaces';

export const pages: Pages[] = [
    { title: 'Home', link: '/dashboard/home', icon: 'icon-[solar--home-2-bold]' },
    {
        title: 'Documents',
        subPages: [{ title: 'About', link: '/about/' }],
        icon: 'icon-[solar--document-bold]',
    },
    { title: 'CAP', link: '/dashboard/cap', icon: 'icon-[tabler--align-center]' },
    // { title: 'Dashboard', link: '/dashboard', icon: 'icon-[solar--home-2-bold]' },
];

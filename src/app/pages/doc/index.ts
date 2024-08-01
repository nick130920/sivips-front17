import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'doc',
        title: 'Doc',
        loadComponent: async () => (await import('./doc/doc.component')).DocComponent,
    },
    {
        path: '**',
        redirectTo: 'doc',
    },
];

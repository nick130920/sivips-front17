import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'home',
        title: 'Home',
        loadComponent: async () => (await import('./home/home.component')).HomeComponent,
    },
    {
        path: '**',
        redirectTo: 'home',
    },
];

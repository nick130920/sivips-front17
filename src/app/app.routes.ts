import { Routes } from '@angular/router';
import { authGuard } from '@lib/guards';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: async () => (await import('@pages/auth')).routes,
        canMatch: [authGuard({ requiresAuthentication: false })],
    },
    /*{
        path: '',
        loadChildren: async () => (await import('@pages/home')).routes,
        canMatch: [authGuard()],
    },*/
    {
        path: 'dashboard',
        loadChildren: async () => (await import('@pages/dashboard/')).routes,
        canMatch: [authGuard({ requiresAuthentication: false })],
    },
    {
        path: 'cap',
        loadChildren: async () => (await import('@pages/cap/')).routes,
        canMatch: [authGuard({ requiresAuthentication: false })],
    },
    {
        path: '**',
        redirectTo: 'dashboard',
    },
];

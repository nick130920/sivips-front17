import { Routes } from '@angular/router';
export const routes: Routes = [
    {
        path: 'login',
        title: 'Login',
        loadComponent: async () => (await import('./login/login.component')).LoginComponent,
    },
    {
        path: 'token',
        title: 'Token',
        loadComponent: async () => (await import('./token/token.component')).TokenComponent,
    },
    {
        path: '**',
        redirectTo: 'login',
    },
];

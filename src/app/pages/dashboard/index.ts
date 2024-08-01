import { Routes } from '@angular/router';
import { authGuard } from '@lib/guards';
export const routes: Routes = [
    {
        path: '',
        title: 'Dashboard',
        loadComponent: async () => (await import('./dashboard/dashboard.component')).DashboardComponent,
        children: [
            {
                path: 'home',
                title: 'Home',
                loadComponent: async () => (await import('../home/home/home.component')).HomeComponent,
                canMatch: [authGuard({ requiresAuthentication: false })],
            },
            {
                path: 'cap',
                title: 'CAP',
                loadComponent: async () => (await import('../cap/cap/cap.component')).CapComponent,
                canMatch: [authGuard({ requiresAuthentication: false })],
            },
            {
                path: 'doc',
                title: 'About',
                loadComponent: async () => (await import('src/app/pages/doc/doc/doc.component')).DocComponent,
                canMatch: [authGuard({ requiresAuthentication: false })],
            },
        ],
    },
    {
        path: '**',
        redirectTo: 'dashboard',
    },
];

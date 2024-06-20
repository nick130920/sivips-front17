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
                title: 'Cap',
                loadComponent: async () => (await import('../cap/cap/cap.component')).CapComponent,
                canMatch: [authGuard({ requiresAuthentication: false })],
            },
        ],
    },
    {
        path: '**',
        redirectTo: 'dashboard',
    },
];

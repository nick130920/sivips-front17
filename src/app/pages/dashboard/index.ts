import { Routes } from '@angular/router';
import { authGuard } from '@lib/guards';
export const routes: Routes = [
    {
        path: '',
        title: 'Dashboard',
        loadComponent: async () => (await import('./dashboard/dashboard.component')).DashboardComponent,
        children: [
            {
                path: '',
                title: 'Home',
                loadChildren: async () => (await import('@pages/home')).routes,
                canMatch: [authGuard({ requiresAuthentication: false })],
            },
        ],
    },
    {
        path: '**',
        redirectTo: 'dashboard',
    },
];

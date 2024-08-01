import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'cap',
        title: 'Cap',
        loadComponent: async () => (await import('./cap/cap.component')).CapComponent,
    },
    {
        path: '**',
        redirectTo: 'cap',
    },
];

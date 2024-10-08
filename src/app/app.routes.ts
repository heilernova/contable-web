import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'login', loadComponent: () => import('./pages/login-page/login-page.component').then(x => x.LoginPageComponent)},
    {
        path: '',
        loadComponent: () => import('./layout').then(x => x.LayoutComponent),
        children: [
            { path: 'empresas', loadChildren: () => import('./pages/companies/companies.routes') },
            { path: 'contabilidad', loadChildren: () => import('./pages/accounting/accounting.routes') },
        ]
    }
];

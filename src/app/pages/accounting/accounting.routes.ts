import { Route } from "@angular/router";

export default [
    { path: 'cuentas', loadComponent: () => import('./accounts/accounts-home-page/accounts-home-page.component').then(x => x.AccountsHomePageComponent) },
    { path: 'terceros', loadComponent: () => import('./third-parties/third-parties-homepage/third-parties-homepage.component').then(x => x.ThirdPartiesHomepageComponent) },
    { path: 'comprobantes', loadComponent: () => import('./vouchers/vouchers-homepage/vouchers-homepage.component').then(x => x.VouchersHomepageComponent) },
    { path: 'comprobantes/registrar', loadComponent: () => import('./vouchers/register-vouchers-page/register-vouchers-page.component').then(x => x.RegisterVouchersPageComponent) },
    { path: 'inventario', loadChildren: () => import('./inventory/inventory.routes')  }
] as Route[];
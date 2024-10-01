import { Route } from "@angular/router";

export default [
    { path: 'cuentas', loadComponent: () => import('./accounts/accounts-home-page/accounts-home-page.component').then(x => x.AccountsHomePageComponent) }
] as Route[];
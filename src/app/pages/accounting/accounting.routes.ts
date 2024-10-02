import { Route } from "@angular/router";

export default [
    { path: 'cuentas', loadComponent: () => import('./accounts/accounts-home-page/accounts-home-page.component').then(x => x.AccountsHomePageComponent) },
    { path: 'terceros', loadComponent: () => import('./third-parties/third-parties-homepage/third-parties-homepage.component').then(x => x.ThirdPartiesHomepageComponent) }
] as Route[];
import { Route } from "@angular/router";

export default [
    { path: "", loadComponent: () => import("./companies-homepage/companies-homepage.component").then(x => x.CompaniesHomepageComponent) },
    { path: ":id", loadComponent: () => import("./companies-info-page/companies-info-page.component").then(x => x.CompaniesInfoPageComponent) }
] as Route[]
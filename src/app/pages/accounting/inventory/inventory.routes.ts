import { Route } from "@angular/router";

export default [
    { path: '', loadComponent: () => import('./inventory-homepage/inventory-homepage.component').then(x => x.InventoryHomepageComponent) },
    { path: 'productos-y-servicios', loadComponent: () => import('./inventory-products-and-services/inventory-products-and-services.component').then(x => x.InventoryProductsAndServicesComponent) },
    { path: 'activos', loadComponent: () => import('./inventory-assets/inventory-assets.component').then(x => x.InventoryAssetsComponent) }
] as Route[]
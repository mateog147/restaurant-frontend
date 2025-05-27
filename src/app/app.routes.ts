import { Routes } from '@angular/router';
import { OrdersInProgressComponent } from './orders-in-progress.component';

export const routes: Routes = [
  { path: '', redirectTo: '/orders', pathMatch: 'full' },
  { path: 'orders', component: OrdersInProgressComponent },
{ path: 'recipes', loadComponent: () => import('./recipes.component').then(m => m.RecipesComponent) },
{ path: 'inventory', loadComponent: () => import('./inventory.component').then(m => m.InventoryComponent) },
{ path: 'purchases', loadComponent: () => import('./purchases.component').then(m => m.PurchasesComponent) },
//   { path: 'settings', loadComponent: () => import('./settings.component').then(m => m.SettingsComponent) }
];

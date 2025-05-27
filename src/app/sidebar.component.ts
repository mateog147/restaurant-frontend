import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  template: `
    <aside class="sidebar">
      <h2>Kitchen Manager</h2>
      <nav class="nav">
        <a class="nav-item" routerLink="/orders" routerLinkActive="active"><span>🧾</span> Orders</a>
        <a class="nav-item" routerLink="/recipes" routerLinkActive="active"><span>📖</span> Recipes</a>
        <a class="nav-item" routerLink="/inventory" routerLinkActive="active"><span>🗃️</span> Inventory</a>
        <a class="nav-item" routerLink="/purchases" routerLinkActive="active"><span>⏪</span> Purchase History</a>
      </nav>
    </aside>
  `,
  styleUrls: ['./app.component.css']
})
export class SidebarComponent {}
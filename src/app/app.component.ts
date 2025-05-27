import { Component } from '@angular/core';
import { SidebarComponent } from './sidebar.component';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OrdersInProgressComponent } from './orders-in-progress.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [
    FormsModule,
    SidebarComponent, RouterOutlet
  ]
})
export class AppComponent { }

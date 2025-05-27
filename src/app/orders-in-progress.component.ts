import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from './order.service';

@Component({
  selector: 'app-orders-in-progress',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="orders-table-wrapper">
      <h2 class="orders-title">Place Order</h2>
      <form (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label class="form-label">Number of plates</label>
          <input class="form-input" type="number" [(ngModel)]="quantity" name="quantity" placeholder="Quantity" [ngModelOptions]="{standalone: true}" />
        </div>
        <div class="form-actions">
          <button class="submit-btn" type="submit">Place Order</button>
        </div>
      </form>
      <h2 class="orders-title">Orders in Progress</h2>
      <table class="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Status</th>
            <th>Order Time</th>
            <th>Items</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let order of orders">
            <td><b>#{{ order.orderId }}</b></td>
            <td>{{ order.status || '-' }}</td>
            <td>{{ order.createdAt | date:'shortTime' }}</td>
            <td>{{ order.quantity }} {{ order.quantity === 1 ? 'item' : 'items' }}</td>
            <td>
              <span class="status-pill" [ngClass]="{
                'preparing': order.status === 'in_progress',
                'cooking': order.status === 'cooking'
              }">
                {{ order.status === 'in_progress' ? 'Preparing' : (order.status === 'cooking' ? 'Cooking' : order.status) }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styleUrls: ['./orders-in-progress.component.css', './app.component.css']
})
export class OrdersInProgressComponent implements OnInit {
  orders: any[] = [];
  quantity = 1;
  constructor(private orderService: OrderService) {}
  ngOnInit() {
    this.loadOrders();
  }
  onSubmit() {
    this.orderService.placeOrder(this.quantity).subscribe(() => {
      this.loadOrders();
    });
  }
  loadOrders() {
    this.orderService.getOrdersToday().subscribe((orders: any[]) => {
      this.orders = orders;
    });
  }
}
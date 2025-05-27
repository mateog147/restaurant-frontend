import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { OrderService } from './order.service';

interface Purchase {
  id: string;
  ingredientId: string;
  quantity: number;
  type: string;
  orderId: string | null;
  createdAt: string;
  ingredientName?: string;
}

@Component({
  selector: 'app-purchases',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent implements OnInit {
  purchases: Purchase[] = [];
  filtered: Purchase[] = [];
  loading = true;
  error = '';
  search = '';

  constructor(private http: HttpClient, private orderService: OrderService) {}

  ngOnInit() {
    this.http.get<Purchase[]>('https://restaurant-api-gateway-hih5.onrender.com/cellar/movements/in')
      .subscribe({
        next: (data) => {
          this.purchases = data;
          this.orderService.getIngredients().subscribe(ingredients => {
            this.purchases = data.map(purchase => ({
              ...purchase,
              ingredientName: ingredients.find(i => i.uniqueId == purchase.ingredientId)?.name || 'Unknown'
            }));
            this.filtered = this.purchases;
            this.loading = false;
          });
        },
        error: () => {
          this.error = 'Failed to load purchases.';
          this.loading = false;
        }
      });
  }

}
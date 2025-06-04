import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private apiUrl = 'https://restaurant-kitchen-ms.onrender.com/kitchen/orders';
  constructor(private http: HttpClient) {}
  placeOrder(quantity: number): Observable<any> {
    return this.http.post(this.apiUrl, { quantity });
  }
  getOrdersToday(): Observable<any[]> {
    return this.http.get<any[]>('https://restaurant-kitchen-ms.onrender.com/kitchen/orders/today');
  }
  getRecipes(): Observable<any[]> {
    return this.http.get<any[]>('https://restaurant-kitchen-ms.onrender.com/kitchen/orders/recipes');
  }
  getIngredients(): Observable<any[]> {
    return this.http.get<any[]>('https://restaurant-cellar-ms.onrender.com/cellar/ingredients/available');
  }

  getHealthStatus(): Observable<any> {
    return this.http.get<any>('https://restaurant-api-gateway-hih5.onrender.com/cellar/health');
  }
}
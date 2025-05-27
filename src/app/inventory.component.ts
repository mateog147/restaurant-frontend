import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Ingredient {
  uniqueId: string;
  name: string;
  actual: number;
  reserved: number;
  updatedAt: string;
}

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  ingredients: Ingredient[] = [];
  filtered: Ingredient[] = [];
  loading = true;
  error = '';
  search = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Ingredient[]>('https://restaurant-cellar-ms.onrender.com/cellar/ingredients/available')
      .subscribe({
        next: (data) => {
          this.ingredients = data;
          this.filtered = data;
          this.loading = false;
        },
        error: () => {
          this.error = 'Failed to load inventory.';
          this.loading = false;
        }
      });
  }

  onSearch() {
    const term = this.search.toLowerCase();
    this.filtered = this.ingredients.filter(i => i.name.toLowerCase().includes(term));
  }
}
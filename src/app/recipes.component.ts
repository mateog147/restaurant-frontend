import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { OrderService } from './order.service';

interface Recipe {
  name: string;
  description: string;
  ingredients: { [ingredient: string]: number };
}

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipes: Recipe[] = [];
  selectedRecipe: Recipe | null = null;
  loading = true;
  error = '';

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orderService.getRecipes().subscribe({
      next: (data) => {
        this.recipes = data;
        this.selectedRecipe = data[0] || null;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load recipes.';
        this.loading = false;
      }
    });
  }

  selectRecipe(recipe: Recipe) {
    this.selectedRecipe = recipe;
  }
  ingredientEntries(recipe: Recipe) {
    return Object.entries(recipe.ingredients).map(([name, quantity]) => ({ name, quantity }));
  }
  totalCost(recipe: Recipe) {
    // Example: cost = sum of (quantity * 10) for each ingredient
    return Object.values(recipe.ingredients).reduce((sum, q) => sum + q * 10, 0).toFixed(2);
  }
}
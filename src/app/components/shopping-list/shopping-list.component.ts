import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RecipeService } from '../services/recipe.service';

interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
}

@Component({
  selector: 'app-shopping-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  recipes: any[] = [];
  shoppingList: Ingredient[] = [];
  purchasedItems: Set<string> = new Set();
  isModalOpen: boolean = false;
  isEditMode: boolean = false;
  currentIngredient: Ingredient = { name: '', quantity: 0, unit: '' };

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe(
      (recipes) => {
        this.recipes = recipes;
        this.generateShoppingList();
      },
      (error) => {
        console.error('Error fetching recipes:', error);
      }
    );
  }

  generateShoppingList(): void {
    const allIngredients: Ingredient[] = [];
    this.recipes.forEach((recipe: any) => {
      recipe.ingredients.forEach((ingredient: Ingredient) => {
        const existingIngredient = allIngredients.find(
          (item) => item.name === ingredient.name
        );
        if (existingIngredient) {
          existingIngredient.quantity += ingredient.quantity;
        } else {
          allIngredients.push({ ...ingredient });
        }
      });
    });
    this.shoppingList = allIngredients;
  }

  togglePurchased(ingredientName: string): void {
    if (this.purchasedItems.has(ingredientName)) {
      this.purchasedItems.delete(ingredientName);
    } else {
      this.purchasedItems.add(ingredientName);
    }
  }

  openAddIngredientModal(): void {
    this.isEditMode = false;
    this.currentIngredient = { name: '', quantity: 0, unit: '' };
    this.isModalOpen = true;
  }

  openEditIngredientModal(item: Ingredient): void {
    this.isEditMode = true;
    this.currentIngredient = { ...item };
    this.isModalOpen = true;
  }

  saveIngredient(): void {
    if (this.isEditMode) {
      const index = this.shoppingList.findIndex(
        (ingredient) => ingredient.name === this.currentIngredient.name
      );
      if (index !== -1) {
        this.shoppingList[index] = { ...this.currentIngredient };
      }
    } else {
      this.shoppingList.push({ ...this.currentIngredient });
    }
    this.closeModal();
  }

  deleteIngredient(item: Ingredient): void {
    const index = this.shoppingList.findIndex(
      (ingredient) => ingredient.name === item.name
    );
    if (index !== -1) {
      this.shoppingList.splice(index, 1);
    }
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
}

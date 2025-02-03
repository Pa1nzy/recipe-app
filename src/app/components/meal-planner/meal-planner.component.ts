import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RecipeService } from '../services/recipe.service'; // Import your service
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

interface MealPlan {
  [key: string]: { [meal: string]: any[] }; // Use 'any' to store full recipe objects
}

@Component({
  selector: 'app-meal-planner',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './meal-planner.component.html',
  styleUrls: ['./meal-planner.component.scss']
})
export class MealPlannerComponent implements OnInit {
  mealPlan: MealPlan = {
    monday: { breakfast: [], lunch: [], dinner: [] },
    tuesday: { breakfast: [], lunch: [], dinner: [] },
    wednesday: { breakfast: [], lunch: [], dinner: [] },
    thursday: { breakfast: [], lunch: [], dinner: [] },
    friday: { breakfast: [], lunch: [], dinner: [] },
    saturday: { breakfast: [], lunch: [], dinner: [] },
    sunday: { breakfast: [], lunch: [], dinner: [] },
  };

  recipes: any[] = []; // Store full recipe objects

  constructor(private recipeService: RecipeService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadRecipes(); // Load recipes when component initializes
  }

  // Load recipes from the service
  loadRecipes(): void {
    this.recipeService.getRecipes().subscribe(
      (data: any[]) => {
        this.recipes = data; // Assign API response to recipes
      },
      (error) => {
        console.error('Error loading recipes:', error);
      }
    );
  }

  // Handle drop event for drag-and-drop
  onDrop(event: any, day: string, meal: string): void {
    const currentMeal = this.mealPlan[day][meal];
    const movedItem = event.previousContainer.data[event.previousIndex];

    if (event.previousContainer === event.container) {
      // Move item within the same list
      currentMeal.splice(event.previousIndex, 1);
      currentMeal.splice(event.currentIndex, 0, movedItem);
    } else {
      // Move from available recipes to meal plan
      currentMeal.push(movedItem);
    }
  }

  // Clear a specific meal slot
  clearMealSlot(day: string, meal: string): void {
    if (this.mealPlan[day]) {
      this.mealPlan[day][meal] = []; // Reset array correctly
      this.cdr.detectChanges();  // Manually trigger change detection
    }
  }

  // Save the meal plan (optional)
  saveMealPlan(): void {
    console.log('Meal Plan:', this.mealPlan); // Log the meal plan
    // You can add logic to save the meal plan to a backend service if needed
  }
}

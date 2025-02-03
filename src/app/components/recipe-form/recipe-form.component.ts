import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../services/recipe.service';  // Adjust path if necessary

@Component({
  selector: 'app-recipe-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent implements OnInit {
  recipe: any = {
    name: '',
    ingredients: '',
    instructions: '',
    cookingTime: null,
    difficulty: 'Easy',
    category: '',
    favorite: false
  };
  categories = ['Breakfast', 'Lunch', 'Dinner', 'Dessert'];  // Example categories
  isEditMode: boolean = false; // Track if we're in edit mode

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const recipeId = this.route.snapshot.paramMap.get('id');  // Get id from route
    if (recipeId) {
      this.isEditMode = true;
      this.loadRecipe(recipeId);  // Load recipe for editing
    }
  }

  // Load the recipe for editing
  loadRecipe(id: string): void {
    this.recipeService.getRecipeById(Number(id)).subscribe((recipe) => {
      this.recipe = recipe;
    }, (error) => {
      console.error('Error loading recipe:', error);
    });
  }

  saveRecipe(): void {
    console.log('Submitting Recipe:', this.recipe); // Log the recipe being submitted
  
    if (this.isEditMode) {
      this.recipeService.updateRecipe(this.recipe).subscribe(
        (response) => {
          console.log('Updated Recipe Response:', response); // Log response
          this.router.navigate(['/recipes']);
        },
        (error) => {
          console.error('Error updating recipe:', error);
        }
      );
    } else {
      this.recipeService.saveRecipe(this.recipe).subscribe(
        (response) => {
          console.log('Saved Recipe Response:', response); // Log response
          this.router.navigate(['/recipes']);
        },
        (error) => {
          console.error('Error saving recipe:', error);
        }
      );
    }
  }
  
  // Handle category change
  onCategoryChange(event: any): void {
    this.recipe.category = event.target.value;
  }

  // Handle difficulty change
  onDifficultyChange(event: any): void {
    this.recipe.difficulty = event.target.value;
  }

  // Handle favorite toggle
  toggleFavorite(): void {
    this.recipe.favorite = !this.recipe.favorite;
  }
}

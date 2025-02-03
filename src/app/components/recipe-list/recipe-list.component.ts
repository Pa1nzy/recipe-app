import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  standalone: true, // This is only necessary if you want this component to be standalone
  imports: [CommonModule, FormsModule], // Correct way to import modules
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent {
  recipes: any[] = [];
  filteredRecipes: any[] = [];
  searchQuery: string = '';
  viewMode: string = 'list'; // Default to list view
  isFormOpen: boolean = false;
  isEditing: boolean = false;
  recipeForm: any = {
    title: '',
    description: '',
    ingredients: [{ name: '', quantity: '' }],
    instructions: '',
    cookingTime: 0,
    difficulty: 'Easy',
    imageUrl: '',
  };
  currentRecipeId: number | null = null;

  constructor(private http: HttpClient, private router: Router) {
    this.fetchRecipes();
  }

  fetchRecipes() {
    this.http.get<any[]>('http://localhost:3000/recipes').subscribe((data) => {
      this.recipes = data;
      this.filteredRecipes = data;
    });
  }

  searchRecipes() {
    if (this.searchQuery) {
      this.filteredRecipes = this.recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredRecipes = this.recipes;
    }
  }

  toggleView() {
    this.viewMode = this.viewMode === 'list' ? 'grid' : 'list';
  }

  openAddRecipeForm() {
    this.isFormOpen = true;
    this.isEditing = false;
    this.recipeForm = {
      title: '',
      description: '',
      ingredients: [{ name: '', quantity: '' }],
      instructions: '',
      cookingTime: 0,
      difficulty: 'Easy',
      imageUrl: '',
    };
  }

  openEditRecipeForm(recipe: any) {
    this.isFormOpen = true;
    this.isEditing = true;
    this.currentRecipeId = recipe.id;
    this.recipeForm = { ...recipe };
  }

  closeForm() {
    this.isFormOpen = false;
  }

  addIngredient() {
    this.recipeForm.ingredients.push({ name: '', quantity: '' });
  }

  submitForm() {
    if (this.isEditing) {
      // Edit existing recipe
      this.http
        .put(`http://localhost:3000/recipes/${this.currentRecipeId}`, this.recipeForm)
        .subscribe(() => {
          this.fetchRecipes();
          this.closeForm();
        });
    } else {
      // Add new recipe
      this.http.post('http://localhost:3000/recipes', this.recipeForm).subscribe(() => {
        this.fetchRecipes();
        this.closeForm();
      });
    }
  }

  deleteRecipe(id: number) {
    this.http.delete(`http://localhost:3000/recipes/${id}`).subscribe(() => {
      this.fetchRecipes();
    });
  }

  viewDetails(id: number): void {
    console.log('Navigating to recipe details for ID:', id);
    this.router.navigate([`/recipe-details/${id}`]);
  }
  
  
}

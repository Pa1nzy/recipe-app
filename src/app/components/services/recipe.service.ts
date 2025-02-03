import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = 'http://localhost:3000/recipes'; // Replace with your API endpoint

  constructor(private http: HttpClient) { }

  // Get all recipes
  getRecipes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Get a specific recipe by ID
  getRecipeById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Mark a recipe as favorite
  toggleFavorite(id: number): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, { favorite: true });
  }

  // Save a new recipe
  saveRecipe(recipe: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, recipe);  // API call to create a new recipe
  }

  // Update an existing recipe
  updateRecipe(recipe: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${recipe.id}`, recipe);  // API call to update an existing recipe
  }
}

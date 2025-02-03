import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MealPlanService {
  private apiUrl = 'http://localhost:3000/recipes';  // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  // Fetch recipes from the API
  getRecipes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}

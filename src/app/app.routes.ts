import { Routes } from '@angular/router';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { MealPlannerComponent } from './components/meal-planner/meal-planner.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { RecipeDetailsComponent } from './components/recipe-detail/recipe-detail.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes', component: RecipeListComponent },
  { path: 'recipe-details/:id', component: RecipeDetailsComponent },
  { path: 'add-recipe', component: RecipeFormComponent },
  { path: 'edit-recipe/:id', component: RecipeFormComponent },
  { path: 'meal-planner', component: MealPlannerComponent },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: '**', redirectTo: '/recipes' },
  { path: 'recipe/:id', component: RecipeDetailsComponent }
];

export interface Ingredient {
  name: string;
  quantity: string;
}

export interface Recipe {
  id: number;
  title: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
  cookingTime: number;
  difficulty: "Easy" | "Medium" | "Hard";
  imageUrl: string;
  category: string;
  isFavorite: boolean;
}

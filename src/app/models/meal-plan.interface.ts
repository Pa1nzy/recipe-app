export interface MealPlanDay {
  breakfast: { id: number } | null;
  lunch: { id: number };
  dinner: { id: number };
}

export interface MealPlan {
  id: number;
  week: string; // Date in YYYY-MM-DD format
  days: {
    Monday?: MealPlanDay;
    Tuesday?: MealPlanDay;
    Wednesday?: MealPlanDay;
    Thursday?: MealPlanDay;
    Friday?: MealPlanDay;
    Saturday?: MealPlanDay;
    Sunday?: MealPlanDay;
  };
}

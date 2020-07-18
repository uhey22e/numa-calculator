export type PFCBalance = {
  proteinPct: number;
  fatPct: number;
  carbsPct: number;
};

export type FoodUnit = {
  unitName: string;
  gramPerUnit: number;
};

export type Nutritients = {
  unitGram: number;
  protein: number;
  fat: number;
  carbs: number;
  description: string;
  note?: string;
  availableUnits: FoodUnit[];
};

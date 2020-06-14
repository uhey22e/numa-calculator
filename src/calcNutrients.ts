export type Nutritients = {
  unitGram: number;
  protein: number;
  fat: number;
  carbo: number;
  description: string;
};

const CalcNutrients = {
  proteinPctToGram: (totalCalorie: number, pct: number): number => {
    return (totalCalorie * (pct / 100)) / 4;
  },

  fatPctToGram: (totalCalorie: number, pct: number): number => {
    return (totalCalorie * (pct / 100)) / 9;
  },

  carboPctToGram: (totalCalorie: number, pct: number): number => {
    return (totalCalorie * (pct / 100)) / 4;
  },

  calcProteinGram: (netGram: number, food: Nutritients): number => {
    return (netGram / food.unitGram) * food.protein;
  },

  calcFatGram: (netGram: number, food: Nutritients): number => {
    return (netGram / food.unitGram) * food.fat;
  },

  calcCarboGram: (netGram: number, food: Nutritients): number => {
    return (netGram / food.unitGram) * food.carbo;
  },
};

export default CalcNutrients;

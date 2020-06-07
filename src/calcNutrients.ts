export type Nutritients = {
  unitGram: number;
  protein: number;
  fat: number;
  carbo: number;
};

const foodsNutrients: {
  [foodName: string]: Nutritients;
} = {
  rice: {
    unitGram: 100,
    protein: 6.1,
    fat: 0.9,
    carbo: 77.6,
  },
  chicken: {
    unitGram: 100,
    protein: 24.4,
    fat: 1.9,
    carbo: 0,
  },
  milk: {
    unitGram: 100,
    protein: 3.3,
    fat: 3.8,
    carbo: 4.8,
  },
  egg: {
    unitGram: 100,
    protein: 12.3,
    fat: 10.3,
    carbo: 0.3,
  },
};

export default class CalcNutrients {
  constructor() {}

  static calcFoodCalorie = (gram: number, food: Nutritients): number => {
    return (
      (gram / food.unitGram) *
      (food.protein * 4 + food.fat * 9 + food.carbo * 4)
    );
  };

  static proteinPctToGram = (totalCalorie: number, pct: number): number => {
    return (totalCalorie * (pct / 100)) / 4;
  };

  static fatPctToGram = (totalCalorie: number, pct: number): number => {
    return (totalCalorie * (pct / 100)) / 9;
  };

  static carboPctToGram = (totalCalorie: number, pct: number): number => {
    return (totalCalorie * (pct / 100)) / 4;
  };

  static calcRiceGramFromTargetCarboGram = (
    targetCarboGram: number
  ): number => {
    /**
     * 目標とする炭水化物[g]から必要な米の量を計算する
     */
    const riceGram =
      (targetCarboGram / foodsNutrients["chicken"].carbo) *
      foodsNutrients["rice"].unitGram;
    return riceGram;
  };

  static calcChickenGramFromTargetProteinGram = (
    targetProteinGram: number
  ): number => {
    /**
     * 目標とするタンパク質[g]から必要な鶏むね肉（皮無し）の量を計算する
     */
    const chickenGram =
      (targetProteinGram / foodsNutrients["chicken"].carbo) *
      foodsNutrients["chicken"].unitGram;
    return chickenGram;
  };
}

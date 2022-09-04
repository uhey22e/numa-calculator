import {
  rice,
  potato,
  chicken as chickenData,
  Nutrients,
  FoodNutrients,
} from "./foodsData";

export interface Ingredient {
  quantity: number;
  food: FoodNutrients;
  unitName?: string;
}

export const calcNetGrams = ({
  quantity,
  food,
  unitName = "g",
}: Ingredient): number => {
  if (unitName === "g") {
    return quantity;
  }
  const unit = food.availableUnits.find((u) => u.unitName === unitName);
  if (!unit) {
    throw new Error(`Invalid unit name "${unitName}" for food "${food.id}"`);
  }
  return quantity * unit.gramsPerUnit;
};

export const calcNetNutrients = (ingredient: Ingredient): Nutrients => {
  const g = calcNetGrams(ingredient);
  return {
    protein: (g * ingredient.food.protein) / ingredient.food.unitGram,
    fat: (g * ingredient.food.fat) / ingredient.food.unitGram,
    carbs: (g * ingredient.food.carbs) / ingredient.food.unitGram,
  };
};

const kcalsToGrams = (n: Nutrients) => ({
  protein: n.protein / 4,
  fat: n.fat / 9,
  carbs: n.carbs / 4,
});

export const calcKcalsFromGrams = ({
  protein,
  fat,
  carbs,
}: Nutrients): number => 4 * protein + 9 * fat + 4 * carbs;

const calcGramsSatisfyingProtein = (
  protein: number,
  food: FoodNutrients
): number => (protein / food.protein) * food.unitGram;

const calcGramsSatisfyingCarbs = (
  // grams
  carbs: number,
  food: FoodNutrients
): number => (carbs / food.carbs) * food.unitGram;

export const sumUpNutrients = (ingredients: Ingredient[]): Nutrients =>
  ingredients.reduce(
    (acc, v) => {
      const n: Nutrients = calcNetNutrients(v);
      return {
        protein: acc.protein + n.protein,
        fat: acc.fat + n.fat,
        carbs: acc.carbs + n.carbs,
      };
    },
    {
      protein: 0,
      fat: 0,
      carbs: 0,
    }
  );

export type PFCBalance = {
  proteinPct: number;
  fatPct: number;
  carbsPct: number;
};

export type CalcMode = "numa" | "jagabird";

/**
 * 主食と鶏むね肉の量を計算する
 * @param targetCalorie 目標摂取カロリー
 * @param pfcBalance PFCバランス
 * @param mode 計算モード (沼: numa、ジャガバード: jagabird)
 */
export const calcMainFoods = (
  targetCalorie: number,
  pfcBalance: PFCBalance,
  extras: Ingredient[] = [],
  mode: CalcMode = "numa"
): { main: Ingredient; chicken: Ingredient; diffs: Nutrients } => {
  const additional = sumUpNutrients(extras);

  const targetKcals: Nutrients = {
    protein: targetCalorie * (pfcBalance.proteinPct / 100),
    fat: targetCalorie * (pfcBalance.fatPct / 100),
    carbs: targetCalorie * (pfcBalance.carbsPct / 100),
  };
  const targetGrams: Nutrients = kcalsToGrams(targetKcals);

  const mainFood = mode === "numa" ? rice : potato;
  const mainCarbs = targetGrams.carbs - additional.carbs;
  const mainGrams = calcGramsSatisfyingCarbs(mainCarbs, mainFood);
  const main: Ingredient = {
    quantity: mainGrams,
    food: mainFood,
  };
  const mainNetNutrients = calcNetNutrients(main);

  const chickenProteinGrams =
    targetGrams.protein - mainNetNutrients.protein - additional.protein;
  const chickenGrams = calcGramsSatisfyingProtein(
    chickenProteinGrams,
    chickenData
  );
  const chicken: Ingredient = {
    quantity: chickenGrams,
    food: chickenData,
  };

  const net = sumUpNutrients([main, chicken, ...extras]);
  const diffs: Nutrients = {
    protein: net.protein - targetGrams.protein,
    fat: net.fat - targetGrams.fat,
    carbs: net.carbs - targetGrams.carbs,
  };

  return {
    main,
    chicken,
    diffs,
  };
};

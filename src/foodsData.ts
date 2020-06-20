import { Nutritients } from "./calcNutrients";

export default {
  rice: {
    unitGram: 100,
    protein: 6.1,
    fat: 0.9,
    carbs: 77.6,
    description: "精白米",
  },
  chicken: {
    unitGram: 100,
    protein: 24.4,
    fat: 1.9,
    carbs: 0,
    description: "皮無し鶏むね肉",
  },
  milk: {
    unitGram: 100,
    protein: 3.3,
    fat: 3.8,
    carbs: 4.8,
    description: "牛乳",
  },
  egg: {
    unitGram: 100,
    protein: 12.3,
    fat: 10.3,
    carbs: 0.3,
    description: "鶏卵",
  },
  wheyProtein: {
    unitGram: 100,
    protein: 82,
    fat: 7.5,
    carbs: 4.0,
    description: "MyProtein Impactホエイプロテイン(ミルクティー)",
  },
} as {
  rice: Nutritients;
  chicken: Nutritients;
  milk: Nutritients;
  egg: Nutritients;
  wheyProtein: Nutritients;
};

import { Nutritients } from "./types";

const foodsData: {
  [foodKey: string]: Nutritients;
} = {
  rice: {
    unitGram: 100,
    protein: 6.1,
    fat: 0.9,
    carbs: 77.6,
    description: "精白米",
    availableUnits: [],
  },
  chicken: {
    unitGram: 100,
    protein: 24.4,
    fat: 1.9,
    carbs: 0,
    description: "皮無し鶏むね肉",
    availableUnits: [],
  },
  milk: {
    unitGram: 100,
    protein: 3.3,
    fat: 3.8,
    carbs: 4.8,
    description: "牛乳",
    availableUnits: [
      {
        unitName: "mL",
        gramPerUnit: 1.032,
      },
    ],
  },
  egg: {
    unitGram: 100,
    protein: 12.3,
    fat: 10.3,
    carbs: 0.3,
    description: "鶏卵",
    availableUnits: [
      {
        unitName: "個",
        gramPerUnit: 60,
      },
    ],
  },
  proteinPowder: {
    unitGram: 100,
    protein: 82,
    fat: 7.5,
    carbs: 4.0,
    description: "プロテインパウダー",
    note: "MyProtein Impactホエイプロテイン(ミルクティー)",
    availableUnits: [],
  },
  frozenAsari: {
    unitGram: 100,
    protein: 13.3,
    fat: 1.6,
    carbs: 4.9,
    description: "冷凍あさりむき身",
    note: "CGC 断然お得 むきあさり",
    availableUnits: [],
  },
  oikos: {
    unitGram: 113,
    protein: 10.1,
    fat: 0,
    carbs: 12.3,
    description: "オイコス",
    note: "オイコス 加糖・プレーン",
    availableUnits: [
      {
        unitName: "個",
        gramPerUnit: 113,
      },
    ],
  },
  potato: {
    unitGram: 100,
    protein: 1.8,
    fat: 0.1,
    carbs: 17.3,
    description: "じゃがいも",
    note: "じゃがいも",
    availableUnits: [],
  },
};

export default foodsData;

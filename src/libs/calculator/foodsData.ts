export interface Nutrients {
  protein: number;
  fat: number;
  carbs: number;
}

export interface FoodNutrients extends Nutrients {
  id: string;
  shortName: string;
  unitGram: number;
  availableUnits: Unit[];
  detailName?: string;
  note?: string;
}

export interface Unit {
  unitName: string;
  gramsPerUnit: number;
}

export const rice: FoodNutrients = {
  id: "rice",
  shortName: "白米",
  detailName: "精白米",
  unitGram: 100,
  protein: 6.1,
  fat: 0.9,
  carbs: 77.6,
  availableUnits: [],
};

export const potato: FoodNutrients = {
  id: "potato",
  shortName: "じゃがいも",
  detailName: "じゃがいも",
  unitGram: 100,
  protein: 1.8,
  fat: 0.1,
  carbs: 17.3,
  availableUnits: [],
};

export const chicken: FoodNutrients = {
  id: "chicken",
  shortName: "皮無し鶏むね肉",
  detailName: "皮無し鶏むね肉",
  unitGram: 100,
  protein: 24.4,
  fat: 1.9,
  carbs: 0,
  availableUnits: [],
};

const extras: FoodNutrients[] = [
  {
    id: "oil",
    shortName: "油",
    detailName: "油",
    unitGram: 1,
    protein: 0,
    fat: 1,
    carbs: 0,
    availableUnits: [],
  },
  {
    id: "milk",
    shortName: "牛乳",
    detailName: "牛乳",
    unitGram: 100,
    protein: 3.3,
    fat: 3.8,
    carbs: 4.8,
    availableUnits: [
      {
        unitName: "mL",
        gramsPerUnit: 1.032,
      },
    ],
  },
  {
    id: "egg",
    shortName: "卵",
    detailName: "鶏卵",
    unitGram: 100,
    protein: 12.3,
    fat: 10.3,
    carbs: 0.3,
    availableUnits: [
      {
        unitName: "個",
        gramsPerUnit: 60,
      },
    ],
  },
  {
    id: "proteinPowder",
    shortName: "プロテイン",
    detailName: "プロテインパウダー",
    unitGram: 100,
    protein: 82,
    fat: 7.5,
    carbs: 4,
    note: "MyProtein Impactホエイプロテイン(ミルクティー)",
    availableUnits: [],
  },
  {
    id: "asari",
    shortName: "冷凍あさり",
    detailName: "冷凍あさりむき身",
    unitGram: 100,
    protein: 13.3,
    fat: 1.6,
    carbs: 4.9,
    note: "CGC 断然お得 むきあさり",
    availableUnits: [],
  },
  {
    id: "oikos",
    shortName: "オイコス",
    detailName: "オイコス",
    unitGram: 113,
    protein: 10.1,
    fat: 0,
    carbs: 12.3,
    note: "オイコス 加糖・プレーン",
    availableUnits: [
      {
        unitName: "個",
        gramsPerUnit: 113,
      },
    ],
  },
];

export const getExtraFood = (id: string): FoodNutrients => {
  const food = extras.find((f) => f.id === id);
  if (!food) {
    throw new Error(`Invalid food ID: ${id}`);
  }
  return food;
};

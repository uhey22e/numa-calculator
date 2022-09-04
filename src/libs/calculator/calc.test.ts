import { calcMainFoods, Ingredient, PFCBalance, sumUpNutrients } from "./calc";
import { getExtraFood } from "./foodsData";

test("calcMainFoods(numa)", () => {
  const target = 1500;
  const pfcBalance: PFCBalance = {
    proteinPct: 30,
    fatPct: 20,
    carbsPct: 50,
  };
  const extraFoods: Ingredient[] = [
    {
      food: getExtraFood("egg"),
      quantity: 1,
      unitName: "個",
    },
    {
      food: getExtraFood("proteinPowder"),
      quantity: 25,
    },
    {
      food: getExtraFood("milk"),
      quantity: 200,
      unitName: "mL",
    },
    {
      food: getExtraFood("oil"),
      quantity: 10.4,
    },
  ];
  const {
    main: rice,
    chicken,
    diffs,
  } = calcMainFoods(target, pfcBalance, extraFoods, "numa");
  expect(rice.quantity).toBeCloseTo(227.3, 0);
  expect(chicken.quantity).toBeCloseTo(261.9, 0);
  expect(diffs.protein).toBeCloseTo(0);
  expect(diffs.fat).toBeCloseTo(0, 0);
  expect(diffs.carbs).toBeCloseTo(0);
});

test("calcMainFoods(jagabird)", () => {
  const target = 1500;
  const pfcBalance: PFCBalance = {
    proteinPct: 30,
    fatPct: 20,
    carbsPct: 50,
  };
  const { main: potato, chicken } = calcMainFoods(
    target,
    pfcBalance,
    [],
    "jagabird"
  );
  expect(potato.quantity).toBeCloseTo(1083.8, 0);
  expect(chicken.quantity).toBeCloseTo(381.1, 0);
});

test("sumUpNutrients", () => {
  const arg: Parameters<typeof sumUpNutrients> = [
    [
      {
        quantity: 10,
        food: {
          id: "oil",
          shortName: "油",
          detailName: "油",
          unitGram: 1,
          protein: 0,
          fat: 1,
          carbs: 0,
          availableUnits: [],
        },
      },
    ],
  ];
  const want: ReturnType<typeof sumUpNutrients> = {
    protein: 0,
    fat: 10,
    carbs: 0,
  };
  const got = sumUpNutrients(...arg);
  expect(got.protein).toBeCloseTo(want.protein);
  expect(got.fat).toBeCloseTo(want.fat);
  expect(got.carbs).toBeCloseTo(want.carbs);
});

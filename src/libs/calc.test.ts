import { PFCBalance } from "../libs/types";
import { calcMainFoods } from "./calc";
import Ingredient from "./ingredient";

test("Mode change", () => {
  const target = 1500;
  const pfcBalance: PFCBalance = {
    proteinPct: 30,
    fatPct: 20,
    carbsPct: 50,
  };

  const { mainFood: rice } = calcMainFoods(target, pfcBalance, [], "numa");
  expect(rice.carbsKcal).toBeCloseTo(750);

  const { mainFood: potato } = calcMainFoods(
    target,
    pfcBalance,
    [],
    "jagabird"
  );
  expect(potato.carbsKcal).toBeCloseTo(750);
});

test("With additional foods", () => {
  const target = 1500;
  const pfcBalance: PFCBalance = {
    proteinPct: 30,
    fatPct: 20,
    carbsPct: 50,
  };
  // オイコスでタンパク質を300kcal取ると
  const additionalFoods = [
    Ingredient.fromTargetProteinKcal("oikos", "オイコス", 300),
  ];

  const { mainFood, chicken } = calcMainFoods(
    target,
    pfcBalance,
    additionalFoods,
    "numa"
  );
  // 主食と鶏むね肉の合計タンパク質は150kcalに
  expect(Ingredient.totalProteinKcal([mainFood, chicken])).toBeCloseTo(150);
});

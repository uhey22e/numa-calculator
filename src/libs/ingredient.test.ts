import foodsData from "./foodsData";
import Ingredient from "./ingredient";

test("Nutrients of rice", () => {
  const rice = new Ingredient("rice", "米", 150);

  expect(rice.proteinGram).toBeCloseTo(1.5 * foodsData.rice.protein);
  expect(rice.fatGram).toBeCloseTo(1.5 * foodsData.rice.fat);
  expect(rice.carbsGram).toBeCloseTo(1.5 * foodsData.rice.carbs);
});

test("Aggregation", () => {
  const rice = new Ingredient("rice", "米", 100);

  expect(Ingredient.totalKcal([rice, rice])).toBeCloseTo(2 * rice.netKcal);
  expect(Ingredient.totalCarbsGram([rice, rice])).toBeCloseTo(
    2 * rice.carbsGram
  );
  expect(Ingredient.totalFatGram([rice, rice])).toBeCloseTo(2 * rice.fatGram);
});

test("Construct with unitName", () => {
  const unitName = "個";
  const invalidUnitName = "mL";
  const qty = 3;

  // Valid unit name
  const oneEgg = new Ingredient("egg", "卵", 1, unitName);
  const threeEggs = new Ingredient("egg", "卵", qty, unitName);
  expect(threeEggs.unitName).toBe(unitName);
  expect(threeEggs.netKcal).toBeCloseTo(qty * oneEgg.netKcal);

  // Invalid unit name
  expect(() => {
    new Ingredient("egg", "卵", 3, invalidUnitName);
  }).toThrowError();
});

test("Changing quantity effects netKcal", () => {
  const qty1 = 3;
  const qty2 = 7;

  const food = new Ingredient("egg", "卵", qty1, "個");
  const kcal1 = food.netKcal;

  // Change quantity and get calorie
  food.quantity = qty2;
  const kcal2 = food.netKcal;

  expect(kcal2).toBeCloseTo((qty2 / qty1) * kcal1);
});

test("From target carbs gram", () => {
  const targetCarbsGram = 100;
  const food = Ingredient.fromTargetCarbsGram("rice", "米", targetCarbsGram);
  expect(food.carbsGram).toBeCloseTo(targetCarbsGram);
});

test("From target protein kcal", () => {
  const targetProteinKcal = 400;
  const food = Ingredient.fromTargetProteinKcal(
    "proteinPowder",
    "プロテイン",
    targetProteinKcal
  );
  expect(food.proteinGram).toBeCloseTo(targetProteinKcal / 4);
});

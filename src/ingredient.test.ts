import foodsData from "./foodsData";
import Ingredient from "./ingredient";

const acceptableErrorDigits = 4;

test("Nutrients of rice", () => {
  const rice = new Ingredient("rice", "米", 150);
  const carbs = rice.carbsGram;
  expect(carbs).toBeCloseTo(1.5 * foodsData.rice.carbs, acceptableErrorDigits);
});

test("Construct with unitName", () => {
  const threeEggs = new Ingredient("egg", "卵", 3, "個");
  expect(threeEggs.netGram).toBe(180);
  expect(() => {
    new Ingredient("egg", "卵", 3, "mL");
  }).toThrowError();
});

test("Changing quantity effects netKcal", () => {
  const multipiler = 3;
  const qty1 = 2;
  const qty2 = multipiler * qty1;

  const food = new Ingredient("egg", "卵", qty1, "個");
  const kcal1 = food.netKCal;

  food.quantity = qty2;
  const kcal2 = food.netKCal;

  expect(kcal2).toBeCloseTo(multipiler * kcal1, acceptableErrorDigits);
});

test("From target carbs", () => {
  const targetCarbs = 100;
  const food = Ingredient.fromTargetCarbs("rice", "米", targetCarbs);
  expect(food.carbsGram).toBeCloseTo(targetCarbs, acceptableErrorDigits);
});

test("From target protein", () => {
  const targetProtein = 100;
  const food = Ingredient.fromTargetProtein(
    "proteinPowder",
    "プロテイン",
    targetProtein
  );
  expect(food.proteinGram).toBeCloseTo(targetProtein, acceptableErrorDigits);
});
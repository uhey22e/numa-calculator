import Ingredient from "./ingredient";

test("Invalid foodKey", () => {
  expect(() => new Ingredient("卵", 3, "個", 60, "pot")).toThrow();
});

test("Nutrients of three eggs", () => {
  const egg = new Ingredient("卵", 3, "個", 60, "egg");
  const f = egg.fatGram();
  const calorie = egg.netKCal();
  expect(f.toFixed(2)).toBe("18.54");
  expect(calorie.toFixed(2)).toBe("257.58");
});

test("Changing quantity", () => {
  const egg = new Ingredient("卵", 2, "個", 60, "egg");
  const cal1 = egg.netKCal();
  egg.setQuantity(4);
  expect(egg.netKCal()).toBe(cal1 * 2);
});

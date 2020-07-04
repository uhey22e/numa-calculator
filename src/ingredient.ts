import foodsData, { Nutritients } from "./foodsData";

export default class Ingredient {
  public name: string;
  public quantity: number;
  private _unitName: string = "g";
  private gramPerUnit: number;
  private nutrients: Nutritients;

  constructor(
    foodKey: keyof typeof foodsData,
    name: string,
    quantity: number,
    unitName: string = "g"
  ) {
    this.name = name;
    this.quantity = quantity;
    this._unitName = unitName;
    this.nutrients = foodsData[foodKey];

    if (unitName === "g") {
      this.gramPerUnit = 1;
      return;
    }

    const units = foodsData[foodKey].availableUnits.filter(
      (unit) => unit.unitName === unitName
    );
    if (unitName !== "g" && units.length === 0) {
      const availableUnitNames = JSON.stringify(
        foodsData[foodKey].availableUnits.map<string>((unit) => unit.unitName)
      );
      throw new Error(
        "Invalid unitName." +
          ` Available units of ${foodKey} are ${availableUnitNames}`
      );
    }
    this.gramPerUnit = units[0].gramPerUnit;
  }

  public get unitName(): string {
    return this._unitName;
  }

  public get netGram(): number {
    return this.quantity * this.gramPerUnit;
  }

  public get netKCal(): number {
    return 4 * this.proteinGram + 9 * this.fatGram + 4 * this.carbsGram;
  }

  public get proteinGram(): number {
    return (this.netGram / this.nutrients.unitGram) * this.nutrients.protein;
  }

  public get fatGram(): number {
    return (this.netGram / this.nutrients.unitGram) * this.nutrients.fat;
  }

  public get carbsGram(): number {
    return (this.netGram / this.nutrients.unitGram) * this.nutrients.carbs;
  }

  public get proteinKcal(): number {
    return 4 * this.proteinGram;
  }

  public get fatKcal(): number {
    return 4 * this.fatGram;
  }

  public get carbsKcal(): number {
    return 4 * this.carbsKcal;
  }

  /**
   * Returns ingredient that meet the target carbs grams.
   * @param foodKey Key of food
   * @param name Name of food
   * @param carbsGram Target carbs gram
   */
  static fromTargetCarbs(
    foodKey: keyof typeof foodsData,
    name: string,
    carbsGram: number
  ) {
    const netGram =
      (carbsGram / foodsData[foodKey].carbs) * foodsData[foodKey].unitGram;
    return new Ingredient(foodKey, name, netGram);
  }

  /**
   * Returns ingredient that meet the target protein grams.
   * @param foodKey Key of food
   * @param name Name of food
   * @param proteinGram Target protein gram
   */
  static fromTargetProtein(
    foodKey: keyof typeof foodsData,
    name: string,
    proteinGram: number
  ) {
    const netGram =
      (proteinGram / foodsData[foodKey].protein) * foodsData[foodKey].unitGram;
    return new Ingredient(foodKey, name, netGram);
  }

  /**
   * Sum up calories of ingredients
   * @param ingredients List of ingredient
   */
  static totalKCal(ingredients: Ingredient[]): number {
    return ingredients.reduce<number>((acc, cur: Ingredient) => {
      return acc + cur.netKCal;
    }, 0);
  }

  /**
   * Sum up protein grams of ingredients
   * @param ingredients List of ingredient
   */
  static totalProteinGram(ingredients: Ingredient[]): number {
    return ingredients.reduce<number>((acc, cur: Ingredient) => {
      return acc + cur.proteinGram;
    }, 0);
  }

  /**
   * Sum up carbs grams of ingredients
   * @param ingredients List of ingredient
   */
  static totalCarbsGram(ingredients: Ingredient[]): number {
    return ingredients.reduce<number>((acc, cur: Ingredient) => {
      return acc + cur.carbsGram;
    }, 0);
  }

  /**
   * Sum up fat grams of ingredients
   * @param ingredients List of ingredient
   */
  static totalFatGram(ingredients: Ingredient[]): number {
    return ingredients.reduce<number>((acc, cur: Ingredient) => {
      return acc + cur.fatGram;
    }, 0);
  }

  /**
   * Sum up protein calories of ingredients
   * @param ingredients List of ingredient
   */
  static totalProteinKcal(ingredients: Ingredient[]): number {
    return 4 * this.totalProteinGram(ingredients);
  }

  /**
   * Sum up fat calories of ingredients
   * @param ingredients List of ingredient
   */
  static totalFatKcal(ingredients: Ingredient[]): number {
    return 9 * this.totalFatGram(ingredients);
  }

  /**
   * Sum up carbs calories of ingredients
   * @param ingredients List of ingredient
   */
  static totalCarbsKcal(ingredients: Ingredient[]): number {
    return 4 * this.totalCarbsGram(ingredients);
  }
}

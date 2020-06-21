import foodsData from "./foodsData";
import { Nutritients } from "./calcNutrients";

export default class Ingredient {
  public name: string;
  public quantity: number;
  public unitName: string;
  public gramPerUnit: number;
  private nutrients: Nutritients;

  constructor(
    foodKey: keyof typeof foodsData,
    name: string,
    quantity: number,
    unitName: string = "g",
    gramPerUnit: number = 1
  ) {
    if (!(foodKey in foodsData)) {
      throw new Error("Invalid foodKey.");
    }
    this.name = name;
    this.quantity = quantity;
    this.unitName = unitName;
    this.gramPerUnit = gramPerUnit;
    this.nutrients = foodsData[foodKey];
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

  static fromTargetCarbs(
    foodKey: keyof typeof foodsData,
    name: string,
    carbsGram: number
  ) {
    const netGram =
      (carbsGram / foodsData[foodKey].carbs) * foodsData[foodKey].unitGram;
    return new Ingredient(foodKey, name, netGram);
  }

  static fromTargetProtein(
    foodKey: keyof typeof foodsData,
    name: string,
    proteinGram: number
  ) {
    const netGram =
      (proteinGram / foodsData[foodKey].protein) * foodsData[foodKey].unitGram;
    return new Ingredient(foodKey, name, netGram);
  }
}

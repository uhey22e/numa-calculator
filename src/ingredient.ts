import foodsData from "./foodsData";
import { Nutritients } from "./calcNutrients";

export default class Ingredient {
  constructor(
    name: string,
    quantity: number,
    unit: string,
    gramPerUnit: number,
    foodKey: string
  ) {
    if (!(foodKey in foodsData)) {
      throw new Error("Invalid foodKey.");
    }
    this.name = name;
    this.quantity = quantity;
    this.unit = unit;
    this.gramPerUnit = gramPerUnit;
    this.netGram = quantity * gramPerUnit;
    this.nutrients = (foodsData as { [key: string]: Nutritients })[foodKey];
  }

  public name: string;
  private quantity: number;
  private unit: string;
  private gramPerUnit: number;
  public netGram: number;
  private nutrients: Nutritients;

  public getQuantity() {
    return this.quantity;
  }

  public setQuantity(qty: number) {
    this.quantity = qty;
    this.netGram = this.quantity * this.gramPerUnit;
  }

  public setQuantityByTargetCarbo(carboGram: number) {
    this.netGram = (carboGram / this.nutrients.carbo) * this.nutrients.unitGram;
    this.quantity = this.netGram / this.gramPerUnit;
  }

  public setQuantityByTargetProtein(proteinGram: number) {
    this.netGram =
      (proteinGram / this.nutrients.protein) * this.nutrients.unitGram;
    this.quantity = this.netGram / this.gramPerUnit;
  }

  public netKCal(): number {
    return 4 * this.proteinGram() + 9 * this.fatGram() + 4 * this.carboGram();
  }

  public proteinGram(): number {
    return (this.netGram / this.nutrients.unitGram) * this.nutrients.protein;
  }

  public fatGram(): number {
    return (this.netGram / this.nutrients.unitGram) * this.nutrients.fat;
  }

  public carboGram(): number {
    return (this.netGram / this.nutrients.unitGram) * this.nutrients.carbo;
  }
}

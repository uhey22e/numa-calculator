import { PFCBalance } from "../libs/types";
import Ingredient from "./ingredient";

const calcModes = ["numa", "jagabird"] as const;
export type CalcMode = typeof calcModes[number];

/**
 * 主食と鶏むね肉の量を計算する
 * @param targetCalorie 目標摂取カロリー
 * @param pfcBalance PFCバランス
 * @param mode 計算モード (沼: numa、ジャガバード: jagabird)
 */
export const calcMainFoods = (
  targetCalorie: number,
  pfcBalance: PFCBalance,
  additionalFoods: Ingredient[] = [],
  mode: CalcMode = "numa"
) => {
  const kind = mode === "numa" ? ["rice", "白米"] : ["potato", "じゃがいも"];

  const additionalProteinKcal = Ingredient.totalProteinKcal(additionalFoods);
  const additionalCarbsKcal = Ingredient.totalCarbsKcal(additionalFoods);

  const mainFood = Ingredient.fromTargetCarbsKcal(
    kind[0],
    kind[1],
    targetCalorie * (pfcBalance.carbsPct / 100) - additionalCarbsKcal
  );

  const targetProteinKcal =
    targetCalorie * (pfcBalance.proteinPct / 100) -
    mainFood.proteinKcal -
    additionalProteinKcal;
  const chicken = Ingredient.fromTargetProteinKcal(
    "chicken",
    "皮無し鶏むね肉",
    targetProteinKcal
  );

  return {
    mainFood,
    chicken,
  };
};

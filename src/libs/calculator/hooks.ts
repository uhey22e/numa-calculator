import { useCallback, useMemo, useState } from "react";
import { calcMainFoods, PFCBalance, CalcMode, Ingredient } from "./calc";

export const useCalculator = (extraFoods: Ingredient[]) => {
  const [targetKcals, setTargetKcals] = useState<number>(1500);
  const [pfcBalance, setPFCBalance] = useState<PFCBalance>({
    proteinPct: 30,
    fatPct: 20,
    carbsPct: 50,
  });

  const [calcMode, setCalcMode] = useState<CalcMode>("numa");
  const toggleCalcMode = useCallback(() => {
    setCalcMode(calcMode === "numa" ? "jagabird" : "numa");
  }, [calcMode]);

  const { main, chicken, diffs } = useMemo(() => {
    return calcMainFoods(targetKcals, pfcBalance, extraFoods, calcMode);
  }, [targetKcals, pfcBalance, extraFoods, calcMode]);

  return {
    targetKcals,
    setTargetKcals,
    pfcBalance,
    setPFCBalance,
    calcMode,
    toggleCalcMode,
    main,
    chicken,
    diffs,
  };
};

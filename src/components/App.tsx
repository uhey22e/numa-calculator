import React, { useMemo, useState } from "react";
import { Link } from "gatsby";
import { InputSection } from "./InputSection";
import { OutputSection } from "./OutputSection";
import { TargetCalorieInput } from "./TargetCalorieInput";
import { PFCBalanceInput } from "./PFCBalanceInput";
import { IngredientsTable } from "./IngredientsTable";
import { NutrientsDetail } from "./NutrientsDetail";
import { Ingredient } from "../libs/calculator/calc";
import Logo from "./Logo";
import ShareButtons from "./ShareButtons";
import useCalculator from "../libs/calculator/hooks";
import { ExtraFoodInput } from "./ExtraFoodInput";
import { getExtraFood } from "../libs/calculator/foodsData";
import { Alert } from "./Alert";

export default function App() {
  const [egg, setEgg] = useState<Ingredient>({
    food: getExtraFood("egg"),
    quantity: 0,
    unitName: "個",
  });
  const [milk, setMilk] = useState<Ingredient>({
    food: getExtraFood("milk"),
    quantity: 0,
    unitName: "mL",
  });
  const [proteinPowder, setProteinPowder] = useState<Ingredient>({
    food: getExtraFood("proteinPowder"),
    quantity: 0,
  });
  const [asari, setAsari] = useState<Ingredient>({
    food: getExtraFood("asari"),
    quantity: 0,
  });
  const [oikos, setOikos] = useState<Ingredient>({
    food: getExtraFood("oikos"),
    quantity: 0,
    unitName: "個",
  });
  const [oil, setOil] = useState<Ingredient>({
    food: getExtraFood("oil"),
    quantity: 0,
  });
  const extraFoods = useMemo(() => [egg, milk, proteinPowder, asari, oil], [
    egg,
    milk,
    proteinPowder,
    asari,
    oil,
  ]);
  const validExtraFoods = useMemo(
    () => extraFoods.filter((f) => f.quantity > 0),
    [extraFoods]
  );

  const {
    setTargetKcals,
    setPFCBalance,
    calcMode,
    toggleCalcMode,
    main,
    chicken,
    diffs,
  } = useCalculator(extraFoods);

  const fatAlert = useMemo(() => {
    const e = Math.abs(diffs.fat);
    if (e < 0.1) {
      return null;
    }
    const message = diffs.fat > 0 ? "過剰です" : "不足しています";
    return (
      <Alert severity="warning">
        脂質が{e.toFixed(1)}g{message}
      </Alert>
    );
  }, [diffs]);

  return (
    <div>
      <section className="mb-6">
        <Logo />
        <p>1日の摂取カロリーとPFCバランスから、沼のレシピを逆算します。</p>
        <p>
          「沼」については<Link to="/about">こちら</Link>をご覧ください。
        </p>
      </section>

      <section className="mb-6">
        <InputSection title="1日の目標摂取カロリーを入力">
          <TargetCalorieInput onChange={setTargetKcals} />
        </InputSection>

        <InputSection title="目標PFCバランスを入力">
          <PFCBalanceInput onChange={setPFCBalance} />
        </InputSection>

        <InputSection title="追加食材・サプリメントを入力">
          <ExtraFoodInput ingredient={egg} onChange={setEgg} />
          <ExtraFoodInput ingredient={milk} onChange={setMilk} />
          <ExtraFoodInput
            ingredient={proteinPowder}
            onChange={setProteinPowder}
          />
          <ExtraFoodInput ingredient={asari} onChange={setAsari} />
          <ExtraFoodInput ingredient={oikos} onChange={setOikos} />
          <ExtraFoodInput ingredient={oil} onChange={setOil} />
        </InputSection>
      </section>

      <section className="mb-6">
        <div className="mb-4">
          <h3 className="text-center text-lg">計算結果</h3>
        </div>
        <div className=" flex flex-row justify-end">
          <button
            type="button"
            className="block p-2 rounded-md text-sm text-sky-500 hover:bg-sky-50"
            onClick={toggleCalcMode}
          >
            {calcMode === "numa" ? "ジャガバード" : "沼"}に切り替える
          </button>
        </div>
        <OutputSection title="食材一覧">
          <IngredientsTable ingredients={[main, chicken, ...validExtraFoods]} />
        </OutputSection>
        <OutputSection title="栄養素詳細">
          <NutrientsDetail ingredients={[main, chicken, ...validExtraFoods]} />
        </OutputSection>
        {fatAlert}
      </section>

      <ShareButtons />
    </div>
  );
}

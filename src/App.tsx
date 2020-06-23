import React from "react";
import "./App.css";
import AdditionalFoodInput from "./AdditionalFoodInput";
import Ingredient from "./ingredient";
import TargetCalorieInput from "./TargetCalorieInput";
import PFCBalanceInput from "./PFCBalanceInput";
import CalcurationResult from "./CalcurationResult";
import { PFCBalance } from "./types";
import { isNullOrUndefined } from "util";

type Props = {};
type State = {
  // 目標摂取カロリー
  targetCalorie: number;
  // PFCバランス - たんぱく質[%]
  proteinPct: number;
  // PFCバランス - 脂質[%]
  fatPct: number;
  // PFCバランス - 炭水化物[%]
  carbsPct: number;
  // 追加食材・サプリメント
  additionalFoods: {
    [key: string]: Ingredient;
  };
};

export default function App(props: Props) {
  const [targetCalorie, setTargetCalorie] = React.useState<number>(0);
  const [pfcBalance, setPFCBalance] = React.useState<PFCBalance>({
    proteinPct: 30,
    fatPct: 20,
    carbsPct: 50,
  });
  const [additionalFoods, setAdditionalFoods] = React.useState<{
    [key: string]: Ingredient | undefined;
  }>({});

  // Filter out 'undefined'
  const validAdditionalFoods = Object.values(additionalFoods).filter<
    Ingredient
  >((v: Ingredient | undefined): v is Ingredient => v !== undefined);
  const additionalFoodProteinGram = validAdditionalFoods.reduce<number>(
    (acc, cur) => {
      return acc + cur.proteinGram;
    },
    0
  );
  const additionalFoodCarbsGram = Ingredient.totalCarbsGram(
    validAdditionalFoods
  );

  // Calc amount of rice and chicken
  const targetCarbsGram =
    (targetCalorie * (pfcBalance.carbsPct / 100)) / 4 - additionalFoodCarbsGram;
  const rice = Ingredient.fromTargetCarbs("rice", "白米", targetCarbsGram);
  const targetProteinGram =
    (targetCalorie * (pfcBalance.proteinPct / 100)) / 4 -
    rice.proteinGram -
    additionalFoodProteinGram;
  const chicken = Ingredient.fromTargetProtein(
    "chicken",
    "皮無し鶏むね肉",
    targetProteinGram
  );

  const remainingFat =
    (targetCalorie * pfcBalance.fatPct) / 100 / 9 -
    Ingredient.totalFatGram([rice, chicken, ...validAdditionalFoods]);

  const handleChangeAdditionalFoods = (key: string) => {
    return (food: Ingredient | undefined) => {
      setAdditionalFoods(
        Object.assign({}, additionalFoods, {
          [key]: food,
        })
      );
    };
  };

  return (
    <div className="App">
      <h1>かんたん沼計算機</h1>

      <div>
        <h2>Step 1</h2>
        <p>1日の目標摂取カロリーを入力してください</p>
        <div>
          <TargetCalorieInput onChange={setTargetCalorie} />
        </div>
        <div>
          基礎代謝量の計算は
          <a href="https://keisan.casio.jp/exec/system/1161228736">こちら</a>
          を参考に！
        </div>
      </div>

      <div>
        <h2>Step 2</h2>
        <p>目標PFCバランスを入力してください</p>
        <div>
          <PFCBalanceInput onChange={setPFCBalance} />
        </div>
      </div>

      <div>
        <h2>オプション</h2>

        <div>
          <AdditionalFoodInput
            title="沼に冷凍あさりを入れる"
            foodName="冷凍あさり"
            foodKey="frozenAsari"
            unitName="g"
            onChange={handleChangeAdditionalFoods("frozenAsari")}
          />
          <AdditionalFoodInput
            title="卵を食べる"
            foodName="卵"
            foodKey="egg"
            unitName="個"
            onChange={handleChangeAdditionalFoods("egg")}
          />
          <AdditionalFoodInput
            title="プロテインを飲む"
            foodName="プロテインパウダー"
            foodKey="proteinPowder"
            unitName="g"
            onChange={handleChangeAdditionalFoods("proteinPowder")}
          />
          <AdditionalFoodInput
            title="牛乳を飲む"
            foodName="牛乳"
            foodKey="milk"
            unitName="mL"
            onChange={handleChangeAdditionalFoods("milk")}
          />
        </div>
      </div>

      <div>
        <h2>計算結果</h2>

        <h3>食材一覧</h3>

        <CalcurationResult
          ingredients={[rice, chicken, ...validAdditionalFoods]}
        />

        <div>脂質が{remainingFat.toFixed(1)}g不足しています！</div>
      </div>
    </div>
  );
}

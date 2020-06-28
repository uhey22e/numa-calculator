import React from "react";
import AdditionalFoodInput from "../components/AdditionalFoodInput";
import TargetCalorieInput from "../components/TargetCalorieInput";
import PFCBalanceInput from "../components/PFCBalanceInput";
import CalcurationResult from "../components/CalcurationResult";
import Ingredient from "../ingredient";
import { PFCBalance } from "../types";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Container } from "@material-ui/core";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

type Props = {};

export default function App(props: Props) {
  // 目標摂取カロリー
  const [targetCalorie, setTargetCalorie] = React.useState<number>(0);
  // PFCバランス
  const [pfcBalance, setPFCBalance] = React.useState<PFCBalance>({
    proteinPct: 30,
    fatPct: 20,
    carbsPct: 50,
  });
  // 追加食材・サプリメント
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
    <Container maxWidth="sm">
      <h1>かんたん「沼」計算機</h1>

      <p>1日の摂取カロリーとPFCバランスから、沼のレシピを逆算します。</p>

      <div>
        <Typography variant="h6" component="h3">
          1日の目標摂取カロリーを入力
        </Typography>
        <div>
          <TargetCalorieInput onChange={setTargetCalorie} />
        </div>
        {/* <div>
          基礎代謝量の計算は
          <a href="https://keisan.casio.jp/exec/system/1161228736">こちら</a>
          を参考に！
        </div> */}
      </div>

      <div>
        <Typography variant="h6" component="h3">
          目標PFCバランスを入力
        </Typography>
        <div>
          <PFCBalanceInput onChange={setPFCBalance} />
        </div>
      </div>

      <div>
        <p></p>
        <Typography variant="h6" component="h3">
          追加食材・サプリメントを入力
        </Typography>

        <div>
          <AdditionalFoodInput
            title="冷凍あさり"
            foodName="冷凍あさり"
            foodKey="frozenAsari"
            unitName="g"
            onChange={handleChangeAdditionalFoods("frozenAsari")}
          />
          <AdditionalFoodInput
            title="卵"
            foodName="卵"
            foodKey="egg"
            unitName="個"
            onChange={handleChangeAdditionalFoods("egg")}
          />
          <AdditionalFoodInput
            title="プロテイン"
            foodName="プロテインパウダー"
            foodKey="proteinPowder"
            unitName="g"
            onChange={handleChangeAdditionalFoods("proteinPowder")}
          />
          <AdditionalFoodInput
            title="牛乳"
            foodName="牛乳"
            foodKey="milk"
            unitName="mL"
            onChange={handleChangeAdditionalFoods("milk")}
          />
        </div>
      </div>

      <div>
        <Typography variant="h5" component="h2">
          計算結果
        </Typography>

        <Typography variant="h6" component="h3">
          食材一覧
        </Typography>

        <CalcurationResult
          ingredients={[rice, chicken, ...validAdditionalFoods]}
        />

        <div>脂質が{remainingFat.toFixed(1)}g不足しています！</div>
      </div>
    </Container>
  );
}

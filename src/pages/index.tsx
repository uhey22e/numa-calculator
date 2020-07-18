import React from "react";
import Alert from "@material-ui/lab/Alert";
import { Box, MuiThemeProvider, Typography } from "@material-ui/core";
import { Link } from "gatsby";
import InputSection from "../components/InputSection";
import OutputSection from "../components/OutputSection";
import AdditionalFoodInput from "../components/AdditionalFoodInput";
import TargetCalorieInput from "../components/TargetCalorieInput";
import PFCBalanceInput from "../components/PFCBalanceInput";
import IngredientsTable from "../components/IngredientsTable";
import NutrientsDetail from "../components/NutrientsDetail";
import Ingredient from "../libs/ingredient";
import { PFCBalance } from "../libs/types";
import Logo from "../components/Logo";
import theme from "../utils/muiTheme";
import { makeStyles } from "@material-ui/styles";
import Layout from "../layout/Layout";

type Props = {};

const useStyles = makeStyles({
  paragraph: {
    marginBottom: "0.5rem",
  },
});

export default function App(props: Props) {
  // Styling
  const classes = useStyles();

  // 目標摂取カロリー
  const [targetCalorie, setTargetCalorie] = React.useState<number>(0);

  // 目標PFCバランス
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
  const additionalFoodProteinKcal = Ingredient.totalProteinKcal(
    validAdditionalFoods
  );
  const additionalFoodCarbsKcal = Ingredient.totalCarbsKcal(
    validAdditionalFoods
  );

  // Calc amount of rice and chicken
  const targetCarbsKcal =
    targetCalorie * (pfcBalance.carbsPct / 100) - additionalFoodCarbsKcal;
  const rice = Ingredient.fromTargetCarbsKcal("rice", "白米", targetCarbsKcal);
  const targetProteinKcal =
    targetCalorie * (pfcBalance.proteinPct / 100) -
    rice.proteinKcal -
    additionalFoodProteinKcal;
  const chicken = Ingredient.fromTargetProteinKcal(
    "chicken",
    "皮無し鶏むね肉",
    targetProteinKcal
  );

  // 不足している脂質
  const remainingFatGram =
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
    <MuiThemeProvider theme={theme}>
      <Layout>
        <Box display="flex" justifyContent="center" pb={3}>
          <Logo />
        </Box>

        <Box component="div" mb={3}>
          <Typography className={classes.paragraph}>
            1日の摂取カロリーとPFCバランスから、沼のレシピを逆算します。
          </Typography>
          <Typography className={classes.paragraph}>
            「沼」については<Link to="/about">こちら</Link>をご覧ください。
          </Typography>
        </Box>

        <Box mb={5}>
          <InputSection title="1日の目標摂取カロリーを入力">
            <TargetCalorieInput onChange={setTargetCalorie} />
          </InputSection>

          <InputSection title="目標PFCバランスを入力">
            <PFCBalanceInput onChange={setPFCBalance} />
          </InputSection>

          <InputSection title="追加食材・サプリメントを入力">
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
            <AdditionalFoodInput
              title="OIKOS"
              foodName="オイコス"
              foodKey="oikos"
              unitName="個"
              onChange={handleChangeAdditionalFoods("oikos")}
            />
          </InputSection>
        </Box>

        <Box mb={2}>
          <Typography variant="inherit" component="h2" align="center">
            計算結果
          </Typography>
        </Box>

        <Box mb={5}>
          <OutputSection title="食材一覧">
            <IngredientsTable
              ingredients={[rice, chicken, ...validAdditionalFoods]}
            />
          </OutputSection>

          <OutputSection title="栄養素詳細">
            <NutrientsDetail
              ingredients={[rice, chicken, ...validAdditionalFoods]}
            />
          </OutputSection>

          <Alert severity="warning">
            脂質が{remainingFatGram.toFixed(1)}g不足しています
          </Alert>
        </Box>
      </Layout>
    </MuiThemeProvider>
  );
}

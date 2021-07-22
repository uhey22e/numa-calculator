import React, { useMemo, useState } from "react";
import Alert from "@material-ui/lab/Alert";
import { Box, Typography, Button } from "@material-ui/core";
import { Link } from "gatsby";
import InputSection from "../components/InputSection";
import OutputSection from "../components/OutputSection";
import TargetCalorieInput from "../components/TargetCalorieInput";
import PFCBalanceInput from "../components/PFCBalanceInput";
import { IngredientsTable } from "../components/IngredientsTable";
import { NutrientsDetail } from "../components/NutrientsDetail";
import { Ingredient } from "../libs/calculator/calc";
import { Logo } from "../components/Logo";
import { makeStyles } from "@material-ui/styles";
import ShareButtons from "../components/ShareButtons";
import { useCalculator } from "../libs/calculator/hooks";
import { ExtraFoodInput } from "../components/ExtraFoodInput";
import { getExtraFood } from "../libs/calculator/foodsData";

const useStyles = makeStyles({
  paragraph: {
    marginBottom: "0.5rem",
  },
});

export const App = () => {
  const classes = useStyles();

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
      return <></>;
    }
    const message = diffs.fat > 0 ? "過剰です" : "不足しています";
    return (
      <Alert severity="warning">
        脂質が{e.toFixed(1)}g{message}
      </Alert>
    );
  }, [diffs]);

  return (
    <>
      <Box display="flex" justifyContent="center" mb={3}>
        <Logo />
      </Box>

      <Box mb={3}>
        <Typography className={classes.paragraph}>
          1日の摂取カロリーとPFCバランスから、沼のレシピを逆算します。
        </Typography>
        <Typography className={classes.paragraph}>
          「沼」については<Link to="/about">こちら</Link>をご覧ください。
        </Typography>
      </Box>

      <Box mb={5}>
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
      </Box>

      <Box mb={2}>
        <Typography variant="inherit" component="h2" align="center">
          計算結果
        </Typography>
      </Box>

      <Box display="flex" justifyContent="flex-end">
        <Button color="primary" onClick={toggleCalcMode}>
          {calcMode === "numa" ? "ジャガバード" : "沼"}に切り替える
        </Button>
      </Box>

      <Box mb={5}>
        <OutputSection title="食材一覧">
          <IngredientsTable ingredients={[main, chicken, ...validExtraFoods]} />
        </OutputSection>
        <OutputSection title="栄養素詳細">
          <NutrientsDetail ingredients={[main, chicken, ...validExtraFoods]} />
        </OutputSection>
        {fatAlert}
      </Box>

      <ShareButtons />
    </>
  );
};

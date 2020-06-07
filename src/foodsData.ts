import { Nutritients } from "./calcNutrients";

export default {
  rice: {
    unitGram: 100,
    protein: 6.1,
    fat: 0.9,
    carbo: 77.6,
  },
  chicken: {
    unitGram: 100,
    protein: 24.4,
    fat: 1.9,
    carbo: 0,
  },
  milk: {
    unitGram: 100,
    protein: 3.3,
    fat: 3.8,
    carbo: 4.8,
  },
  egg: {
    unitGram: 100,
    protein: 12.3,
    fat: 10.3,
    carbo: 0.3,
  },
} as {
  rice: Nutritients;
  chicken: Nutritients;
  milk: Nutritients;
  egg: Nutritients;
};

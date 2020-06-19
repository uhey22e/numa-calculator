import React from "react";
import "./App.css";
import foodsData from "./foodsData";
import CalcNutrients from "./calcNutrients";
import PercentageInput from "./PercentageInput";
import AdditionalFoodInput from "./AdditionalFoodInput";
import Ingredient from "./ingredient";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

type Props = {};
type State = {
  // 目標摂取カロリー
  targetCalorie: number;
  // PFCバランス - たんぱく質[%]
  proteinPct: number;
  // PFCバランス - 脂質[%]
  fatPct: number;
  // PFCバランス - 炭水化物[%]
  carboPct: number;
  // 追加食材・サプリメント
  additionalFoods: {
    [key: string]: Ingredient;
  };
};

type ValidationResult =
  | undefined
  | {
      message: string;
    };

export default class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      targetCalorie: 1500,
      proteinPct: 30,
      fatPct: 20,
      carboPct: 50,
      additionalFoods: {},
    };
  }

  private handleChangeTargetCalorie = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    /**
     * 目標摂取カロリーを更新する
     */
    this.setState({
      targetCalorie: event.target.valueAsNumber,
    });
  };

  private handleChangeProteinPct = (value: number): void => {
    /**
     * 目標たんぱく質割合を更新する
     */
    this.setState({
      proteinPct: value,
    });
  };

  private handleChangeFatPct = (value: number): void => {
    /**
     * 目標脂質割合を更新する
     */
    this.setState({
      fatPct: value,
    });
  };

  private handleChangeCarboPct = (value: number): void => {
    /**
     * 目標炭水化物割合を更新する
     */
    this.setState({
      carboPct: value,
    });
  };

  private validatePfcBalance = (): ValidationResult => {
    /**
     * PFCバランスのバリデーション
     */
    if (
      this.state.proteinPct + this.state.fatPct + this.state.carboPct !==
      100
    ) {
      return { message: "合計が100%になるように入力してください" };
    }
  };

  private calcRiceGram = (): Ingredient => {
    /**
     * 米の量を計算する
     *
     * 米の炭水化物 = 目標炭水化物 - オプション食材の炭水化物
     */
    const targetCarboGram =
      CalcNutrients.carboPctToGram(
        this.state.targetCalorie,
        this.state.carboPct
      ) - this.calcAdditionalFoodsCarboGram();
    const riceGram =
      (targetCarboGram / foodsData.rice.carbo) * foodsData.rice.unitGram;
    return new Ingredient("米", riceGram, "g", 1, "rice");
  };

  private calcChickenGram = (): Ingredient => {
    /**
     * 鶏むね肉の量を計算する
     *
     * 鶏むね肉のたんぱく質 = 目標たんぱく質 - 米のたんぱく質 - オプション食材のたんぱく質
     */
    const subtractingProteinGram =
      this.calcRiceGram().proteinGram() + this.calcAdditionalFoodsProteinGram();
    const targetProteinGram =
      CalcNutrients.proteinPctToGram(
        this.state.targetCalorie,
        this.state.proteinPct
      ) - subtractingProteinGram;
    const chicken = new Ingredient("鶏むね肉(皮無し)", 0, "g", 1, "chicken");
    chicken.setQuantityByTargetProtein(targetProteinGram);
    return chicken;
  };

  private calcAdditionalFoodsProteinGram = (): number => {
    // オプション食材の総たんぱく質量を計算する
    const reducer = (acc: number, [key, food]: [string, Ingredient]) => {
      if (!food.netGram) {
        return acc;
      }
      return acc + food.proteinGram();
    };
    return Object.entries(this.state.additionalFoods).reduce(reducer, 0);
  };

  private calcAdditionalFoodsCarboGram = (): number => {
    // オプション食材の総炭水化物量を計算する
    const reducer = (acc: number, [key, food]: [string, Ingredient]) => {
      if (!food.netGram) {
        return acc;
      }
      return acc + food.carboGram();
    };
    return Object.entries(this.state.additionalFoods).reduce(reducer, 0);
  };

  private calcTotalCalorie = (ingredients: Ingredient[]): number => {
    const calorie = ingredients.reduce<number>((cal, ingredient) => {
      return cal + ingredient.netKCal();
    }, 0);
    return calorie;
  };

  private calcTotalProteinGram = (ingredients: Ingredient[]): number => {
    return ingredients.reduce<number>((protein, ingredient) => {
      return protein + ingredient.proteinGram();
    }, 0);
  };

  private calcTotalFatGram = (ingredients: Ingredient[]): number => {
    return ingredients.reduce<number>((fat, ingredient) => {
      return fat + ingredient.fatGram();
    }, 0);
  };

  private calcTotalCarboGram = (ingredients: Ingredient[]): number => {
    return ingredients.reduce<number>((carbo, ingredient) => {
      return carbo + ingredient.carboGram();
    }, 0);
  };

  private dropAdditionalFood = (droppingKey: string) => {
    const current = this.state.additionalFoods;
    const newKeys = Object.keys(current).filter((key) => key !== droppingKey);
    this.setState({
      additionalFoods: Object.assign(
        {},
        ...newKeys.map((key) => {
          return { [key]: current[key] };
        })
      ),
    });
  };

  private handleChangeAdditionalFood = (
    name: string,
    foodKey: string,
    gramPerQty: number
  ): ((value: number) => void) => {
    // オプション食材変更のハンドラーを返す
    if (!(foodKey in foodsData)) {
      return () => {};
    }
    return (quantity: number) => {
      if (!quantity) {
        // 不正なQuantityのときは削除
        this.dropAdditionalFood(foodKey);
        return;
      }
      const food = new Ingredient(name, quantity, "個", gramPerQty, foodKey);
      this.setState({
        additionalFoods: Object.assign(this.state.additionalFoods, {
          [foodKey]: food,
        }),
      });
    };
  };

  public render() {
    // 計算結果
    const ingredients: Ingredient[] = [
      this.calcRiceGram(),
      this.calcChickenGram(),
      ...Object.values(this.state.additionalFoods),
    ];

    const totalCalorie = this.calcTotalCalorie(ingredients);
    const totalProtein = this.calcTotalProteinGram(ingredients);
    const totalFat = this.calcTotalFatGram(ingredients);
    const totalCarbo = this.calcTotalCarboGram(ingredients);

    const remainingFat =
      (this.state.targetCalorie * (this.state.fatPct / 100)) / 9 - totalFat;

    const showAdditionalFoodRows = (foods: Ingredient[]) => {
      return Object.entries(foods).map(([_, food]) => {
        return (
          <tr>
            <td>{food.name}</td>
            <td>{food.netGram.toFixed(1)}g</td>
            <td>
              {food.netKCal().toFixed(2)}
              kcal
            </td>
            <td>{food.proteinGram().toFixed(1)}g</td>
            <td>{food.fatGram().toFixed(1)}g</td>
            <td>{food.carboGram().toFixed(1)}g</td>
          </tr>
        );
      });
    };

    return (
      <div className="App">
        <h1>かんたん沼計算機</h1>

        <div>
          <h2>Step 1</h2>
          <p>1日の目標摂取カロリーを入力してください</p>
          <div>
            <TextField
              label="目標摂取カロリー"
              size="small"
              type="number"
              variant="outlined"
              value={this.state.targetCalorie}
              onChange={this.handleChangeTargetCalorie}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">kcal</InputAdornment>
                ),
              }}
            />
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
          <PercentageInput
            title="たんぱく質"
            value={this.state.proteinPct}
            onChange={this.handleChangeProteinPct}
          />
          <PercentageInput
            title="脂質"
            value={this.state.fatPct}
            onChange={this.handleChangeFatPct}
          />
          <PercentageInput
            title="炭水化物"
            value={this.state.carboPct}
            onChange={this.handleChangeCarboPct}
          />
          <p>{this.validatePfcBalance()?.message}</p>
        </div>

        <div>
          <h2>オプション</h2>

          <AdditionalFoodInput
            title="卵を食べる"
            foodName="卵"
            foodKey="egg"
            unitName="個"
            value={this.state.additionalFoods.egg?.getQuantity()}
            onChange={this.handleChangeAdditionalFood("卵", "egg", 60)}
          />

          <AdditionalFoodInput
            title="プロテインを飲む"
            foodName="プロテイン"
            foodKey="wheyProtein"
            unitName="g"
            value={this.state.additionalFoods.wheyProtein?.getQuantity()}
            onChange={this.handleChangeAdditionalFood(
              "プロテイン",
              "wheyProtein",
              1
            )}
          />
        </div>

        <div>
          <h2>計算結果</h2>

          <h3>食材一覧</h3>

          <table>
            <tr>
              <th>食材</th>
              <th>総重量</th>
              <th>総カロリー</th>
              <th>たんぱく質</th>
              <th>脂質</th>
              <th>炭水化物</th>
            </tr>
            {showAdditionalFoodRows(ingredients)}
          </table>

          <h3>総カロリー</h3>
          <div>
            <span>{totalCalorie.toFixed(1)}</span>
            <span>kcal</span>
          </div>

          <h3>栄養素内訳</h3>
          <div>
            たんぱく質 {totalProtein.toFixed(1)}g (
            {((100 * 4 * totalProtein) / this.state.targetCalorie).toFixed(1)}%)
          </div>
          <div>
            脂質 {totalFat.toFixed(1)}g (
            {((100 * 4 * totalFat) / this.state.targetCalorie).toFixed(1)}%)
          </div>
          <div>
            炭水化物 {totalCarbo.toFixed(1)}g (
            {((100 * 4 * totalCarbo) / this.state.targetCalorie).toFixed(1)}%)
          </div>

          <div>脂質が{remainingFat.toFixed(1)}g不足しています！</div>
        </div>
      </div>
    );
  }
}

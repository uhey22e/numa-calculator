import React from "react";
import "./App.css";
import foodsData from "./foodsData";
import { Nutritients } from "./calcNutrients";

type Props = {};
type State = {
  // 目標摂取カロリー
  targetCalorie: number;
  // PFCバランス - タンパク質[%]
  proteinPct: number;
  // PFCバランス - 脂質[%]
  fatPct: number;
  // PFCバランス - 炭水化物[%]
  carboPct: number;
  // 追加食材・サプリメント
  additionalIngredients: {
    [key: string]: {
      protein: number;
      fat: number;
      carbo: number;
    };
  };
};

const calcFoodCalorie = (gram: number, food: Nutritients): number => {
  return (
    (gram / food.unitGram) * (food.protein * 4 + food.fat * 9 + food.carbo * 4)
  );
};

const proteinPctToGram = (totalCalorie: number, pct: number): number => {
  return (totalCalorie * (pct / 100)) / 4;
};

const fatPctToGram = (totalCalorie: number, pct: number): number => {
  return (totalCalorie * (pct / 100)) / 9;
};

const carboPctToGram = (totalCalorie: number, pct: number): number => {
  return (totalCalorie * (pct / 100)) / 4;
};

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      targetCalorie: 1500,
      proteinPct: 30,
      fatPct: 20,
      carboPct: 50,
      additionalIngredients: {},
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

  private handleChangeProteinPct = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    /**
     * 目標タンパク質割合を更新する
     */
    this.setState({
      proteinPct: event.target.valueAsNumber,
    });
  };

  private handleChangeFatPct = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    /**
     * 目標脂質割合を更新する
     */
    this.setState({
      fatPct: event.target.valueAsNumber,
    });
  };

  private handleChangeCarboPct = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    /**
     * 目標炭水化物割合を更新する
     */
    this.setState({
      carboPct: event.target.valueAsNumber,
    });
  };

  private validatePfcBalance = (): boolean => {
    /**
     * PFCバランスのバリデーション
     */
    return (
      this.state.proteinPct + this.state.fatPct + this.state.carboPct === 100
    );
  };

  private calcRiceGram = (): number => {
    const targetCarboGram = carboPctToGram(
      this.state.targetCalorie,
      this.state.carboPct
    );
    const riceGram =
      (targetCarboGram / foodsData.rice.carbo) * foodsData.rice.unitGram;
    return Math.floor(riceGram);
  };

  private calcChickenGram = (): number => {
    const targetProteinGram =
      proteinPctToGram(this.state.targetCalorie, this.state.proteinPct) -
      (this.calcRiceGram() / foodsData.rice.unitGram) * foodsData.rice.protein;
    const chickenGram =
      (targetProteinGram / foodsData.chicken.protein) *
      foodsData.chicken.unitGram;
    return Math.floor(chickenGram);
  };

  private calcTotalProteinGram = (): number => {
    return (
      (this.calcRiceGram() / foodsData.rice.unitGram) * foodsData.rice.protein +
      (this.calcChickenGram() / foodsData.chicken.unitGram) *
        foodsData.chicken.protein
    );
  };

  private calcTotalFatGram = (): number => {
    return (
      (this.calcRiceGram() / foodsData.rice.unitGram) * foodsData.rice.fat +
      (this.calcChickenGram() / foodsData.chicken.unitGram) *
        foodsData.chicken.fat
    );
  };

  private calcTotalCarboGram = (): number => {
    return (
      (this.calcRiceGram() / foodsData.rice.unitGram) * foodsData.rice.carbo +
      (this.calcChickenGram() / foodsData.chicken.unitGram) *
        foodsData.chicken.carbo
    );
  };

  private calcTotalCalorie = (): number => {
    return (
      calcFoodCalorie(this.calcRiceGram(), foodsData.rice) +
      calcFoodCalorie(this.calcChickenGram(), foodsData.chicken)
    );
  };

  private handleChangeEgg = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const egg = {
      protein:
        ((event.target.valueAsNumber * 60) / foodsData.egg.unitGram) *
        foodsData.egg.protein,
      fat:
        ((event.target.valueAsNumber * 60) / foodsData.egg.unitGram) *
        foodsData.egg.fat,
      carbo:
        ((event.target.valueAsNumber * 60) / foodsData.egg.unitGram) *
        foodsData.egg.carbo,
    };
    this.setState({
      additionalIngredients: Object.assign(this.state.additionalIngredients, {
        egg,
      }),
    });
  };

  public render() {
    // 計算結果
    const totalCalorie = this.calcTotalCalorie();
    const totalProtein = this.calcTotalProteinGram();
    const totalFat = this.calcTotalFatGram();
    const totalCarbo = this.calcTotalCarboGram();

    const remainingFat =
      (this.state.targetCalorie * (this.state.fatPct / 100)) / 9 - totalFat;
    const recalcedCalorie = totalCalorie + remainingFat * 9;

    return (
      <div className="App">
        <h1>かんたん沼計算機</h1>

        <div>
          <h2>Step 1</h2>
          <p>1日の目標摂取カロリーを入力してください</p>
          <div>
            <input
              type="number"
              value={this.state.targetCalorie}
              onChange={this.handleChangeTargetCalorie}
            />
            <span>kcal</span>
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
            <span>タンパク質</span>
            <input
              type="number"
              value={this.state.proteinPct}
              onChange={this.handleChangeProteinPct}
            />
            <span>%</span>
          </div>
          <div>
            <span>脂質</span>
            <input
              type="number"
              value={this.state.fatPct}
              onChange={this.handleChangeFatPct}
            />
            <span>%</span>
          </div>
          <div>
            <span>炭水化物</span>
            <input
              type="number"
              value={this.state.carboPct}
              onChange={this.handleChangeCarboPct}
            />
            <span>%</span>
          </div>
          <p>
            {this.validatePfcBalance()
              ? ""
              : "合計が100%になるように入力してください"}
          </p>
        </div>

        <div>
          <h2>オプション</h2>

          <div>
            <input type="checkbox" />
            <span>卵を食べる</span>
          </div>
          <div>
            <span>卵</span>
            <input type="number" onChange={this.handleChangeEgg} />
            <span>個</span>
          </div>

          <div>
            <input type="checkbox" />
            <span>プロテインを飲む</span>
          </div>
          <div>
            <span>プロテイン</span>
            <input type="number" />
            <span>g</span>
          </div>
        </div>

        <div>
          <h2>計算結果</h2>

          <h3>食材</h3>
          <div>
            <span>米</span>
            <span>{this.calcRiceGram()}</span>
            <span>g</span>
          </div>
          <div>
            <span>鶏むね肉（皮無し）</span>
            <span>{this.calcChickenGram()}</span>
            <span>g</span>
          </div>

          <h3>総カロリー</h3>
          <div>
            <span>{Math.floor(totalCalorie)}</span>
            <span>kcal</span>
          </div>

          <h3>栄養素内訳</h3>
          <div>
            <span>
              タンパク質 {Math.round(((totalProtein * 4) / totalCalorie) * 100)}
              % :{" "}
            </span>
            <span>
              {Math.round(totalProtein)}g / {Math.round(totalProtein * 4)}kcal
            </span>
          </div>
          <div>
            <span>
              脂質 {Math.round(((totalFat * 9) / totalCalorie) * 100)}% :{" "}
            </span>
            <span>
              {Math.round(totalFat)}g / {Math.round(totalFat * 9)}
              kcal
            </span>
          </div>
          <div>
            <span>
              炭水化物 {Math.round(((totalCarbo * 4) / totalCalorie) * 100)}% :{" "}
            </span>
            <span>
              {Math.round(totalCarbo)}g / {Math.round(totalCarbo * 4)}kcal
            </span>
          </div>

          <p>このままだと脂質が不足しています！</p>
          <p>
            {Math.round(remainingFat)}
            gの脂質を追加で摂取してください
          </p>

          <h3>栄養素内訳（再計算）</h3>
          <div>
            <span>
              タンパク質{" "}
              {Math.round(((totalProtein * 4) / recalcedCalorie) * 100)}% :{" "}
            </span>
            <span>
              {Math.round(totalProtein)}g / {Math.round(totalProtein * 4)}kcal
            </span>
          </div>
          <div>
            <span>
              脂質{" "}
              {Math.round(
                (((totalFat + remainingFat) * 9) / recalcedCalorie) * 100
              )}
              % :{" "}
            </span>
            <span>
              {Math.round(totalFat + remainingFat)}g /{" "}
              {Math.round((totalFat + remainingFat) * 9)}kcal
            </span>
          </div>
          <div>
            <span>
              炭水化物 {Math.round(((totalCarbo * 4) / recalcedCalorie) * 100)}%
              :{" "}
            </span>
            <span>
              {Math.round(totalCarbo)}g / {Math.round(totalCarbo * 4)}kcal
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

import React, { Fragment } from "react";
import classes from "./GoalItem.module.css";

import { useSelector } from "react-redux";

const GoalItem = ({ item }) => {
  const { goalValue, goal } = item;

  const value = useSelector((state) => state.value.money);
  const storage = localStorage.getItem("initialBalance");
  const initialBalance = value === 0 ? storage : value;

  const goalValueInt = parseInt(
    goalValue.replace("R$", "").replace(/\s/g, "").replace(/\./g, "")
  );

  const initialBalanceInt = parseInt(
    initialBalance.replace("R$", "").replace(/\s/g, "").replace(/\./g, "")
  );

  const calc = (initialBalanceInt / goalValueInt) * 100;
  let percentage;

  if (initialBalanceInt >= goalValueInt) {
    percentage = "100%";
  } else {
    percentage = calc.toFixed(0) + "%";
  }

  const congratsCalc = calc >= 100;
  const congrats = congratsCalc;

  return (
    <Fragment>
      {!congrats && (
        <div className={classes.item}>
          <div className={classes.itemContainer}>
            <h3>Objetivo:</h3>
            <p className={classes.itemValue}>{goal}</p>
            <h3>Valor:</h3>
            <p className={classes.itemValue}>{goalValue}</p>
          </div>
          <p className={classes.itemParagraph}>
            Faltam {percentage} para você alcançar sua meta!
          </p>
        </div>
      )}
      {congrats && (
        <div className={classes.goalAchievedItem}>
          <div className={classes.goalAchievedContainer}>
            <h3>Objetivo:</h3>
            <p className={classes.goalAchievedValue}>{goal}</p>
            <h3>Valor:</h3>
            <p className={classes.goalAchievedValue}>{goalValue}</p>
          </div>
          <p className={classes.goalAchievedParagraph}>
            {`Parabéns, você concluiu sua meta de: ${goalValue}, seu saldo atual é de: ${initialBalance}`}
          </p>
        </div>
      )}
    </Fragment>
  );
};

export default GoalItem;

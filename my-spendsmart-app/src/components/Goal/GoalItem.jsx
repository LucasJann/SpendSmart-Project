import React, { Fragment } from "react";
import classes from "./GoalItem.module.css";

import { useSelector } from "react-redux";

const GoalItem = ({ item }) => {
  const { goalText, goal } = item;

  const congrats = true;

  const value = useSelector((state) => state.value.money);

  // const goalValueInt = parseInt(
  //   goalValue.replace("R$", "").replace(/\s/g, "").replace(/\./g, "")
  // );

  // const initialBalanceInt = parseInt(
  //   initialBalance.replace("R$", "").replace(/\s/g, "").replace(/\./g, "")
  // );

  // const calc = (initialBalanceInt / goalValueInt) * 100;
  // let percentage;

  // if (initialBalanceInt >= goalValueInt) {
  //   percentage = "100%";
  // } else {
  //   percentage = calc.toFixed(0) + "%";
  // }

  // const congratsCalc = calc >= 100;
  // const congrats = congratsCalc;

  return (
    <Fragment>
      {!congrats && (
        <div className={classes.item}>
          <div className={classes.itemContainer}>
            <h3>Objetivo:</h3>
            <p className={classes.itemValue}>{goalText}</p>
            <h3>Valor:</h3>
            <p className={classes.itemValue}>{goal}</p>
          </div>
          <p className={classes.itemParagraph}>
            Faltam para você alcançar sua meta!
          </p>
        </div>
      )}
      {congrats && (
        <div className={classes.goalAchievedItem}>
          <div className={classes.goalAchievedContainer}>
            <h3>Objetivo:</h3>
            <p className={classes.goalAchievedValue}>{goalText}</p>
            <h3>Valor:</h3>
            <p className={classes.goalAchievedValue}>{goal}</p>
          </div>
          <p className={classes.goalAchievedParagraph}>
            {`Parabéns, você concluiu sua meta de: ${goal}, seu saldo atual é de: ${value}`}
          </p>
        </div>
      )}
    </Fragment>
  );
};

export default GoalItem;

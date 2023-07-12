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
        <div className={classes.goalItem}>
          <h3 className={classes.saveMoneyText}>Objetivo:</h3>
          <ul className={classes.saveMoneyValue}>{goal}</ul>
          <h3 className={classes.saveMoneyText}>Valor:</h3>
          <ul className={classes.saveMoneyValue}>{goalValue}</ul>
          <div className={classes.saveMoneyPercentage}>{percentage}</div>
          <p className={classes.saveMoneyMessage}>
            Faltam {percentage} para você alcançar sua meta!
          </p>
        </div>
      )}
      {congrats && (
        <div className={classes.goalItem}>
          <h3 className={classes.spendMoneyText}>Valor:</h3>
          <ul className={classes.spendMoneyValue}>{goalValue}</ul>
          <h3 className={classes.spendMoneyText}>Objetivo:</h3>
          <ul className={classes.spendMoneyValue}>{goal}</ul>
          <p className={classes.spendMoneyMessage}>
            Parabéns! Você concluiu sua meta!
          </p>
          <div className={classes.spendMoneyPercentage}>{percentage}</div>
        </div>
      )}
    </Fragment>
  );
};

export default GoalItem;

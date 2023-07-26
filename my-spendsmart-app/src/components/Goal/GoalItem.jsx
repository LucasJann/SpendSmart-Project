import React, { Fragment } from "react";
import classes from "./GoalItem.module.css";

import { useSelector, useDispatch } from "react-redux";
import goalSlice from "../../store/goal-slice";

const GoalItem = ({ item }) => {
  const { id, goalText, goal } = item;

  const balance = useSelector((state) => state.value.balance);
  const dispatch = useDispatch();

  const goalValue = parseInt(
    goal.replace("R$", "").replace(/\s/g, "").replace(/\./g, "")
  );

  const balanceValue = parseInt(
    balance.replace("R$", "").replace(/\s/g, "").replace(/\./g, "")
  );

  const calc = (balanceValue / goalValue) * 100;
  let percentage;

  if (balanceValue >= goalValue) {
    percentage = "100%";
  } else {
    percentage = calc.toFixed(0) + "%";
  }

  const congratsCalc = calc >= 100;
  const congrats = congratsCalc;

  const getPercentageColor = (percentage) => {
    let redValue, greenValue;
    if (percentage < 30) {
      redValue = 255;
      greenValue = Math.round(255 * (percentage / 30));
    } else if (percentage < 72) {
      redValue = Math.round(255 * ((72 - percentage) / 42));
      greenValue = 255;
    } else {
      redValue = 0;
      greenValue = 255;
    }
    return `rgb(${redValue}, ${greenValue}, 0)`;
  };

  const percentageColor = getPercentageColor(calc);

  const itemPercentageStyle = {
    backgroundColor: percentageColor,
    width: calc >= 10 ? calc + "%" : "10%",
  };

  const deleteHandler = () => {
    const userConfirmed = window.confirm(
      "Clique em OK para confirmar a exclusão"
    );

    if (userConfirmed) {
      dispatch(goalSlice.actions.removeItem(id));
    }
  };

  return (
    <Fragment>
      {!congrats && (
        <>
          <div className={classes.item}>
            <button className={classes.itemDelete} onClick={deleteHandler}>
              X
            </button>
            <div className={classes.itemContainer}>
              <h2>Objetivo:</h2>
              <p className={classes.itemText}>{goalText}</p>
              <h2>Valor:</h2>
              <p className={classes.itemValue}>{goal}</p>
              <h2>Progresso:</h2>
            </div>
            <div className={classes.itemPercentage} style={itemPercentageStyle}>
              <div>{percentage}</div>
            </div>
          </div>
        </>
      )}
      {congrats && (
        <>
        <div className={classes.item}>
          <button className={classes.goalDelete} onClick={deleteHandler}>
            X
          </button>
          <div className={classes.goalContainer}>
            <h2>Objetivo:</h2>
            <p className={classes.goalText}>{goalText}</p>
            <h2>Valor:</h2>
            <p className={classes.goalValue}>{goal}</p>
            <h2>Progresso:</h2>
          </div>
          <div className={classes.goalPercentage} >
            <div>{percentage}</div>
          </div>
        </div>
      </>
      )}
    </Fragment>
  );
};

export default GoalItem;

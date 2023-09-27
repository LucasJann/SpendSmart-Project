import classes from "./GoalItem.module.css";

import { callerActions } from "../../store/caller-slice";
import { useDispatch } from "react-redux";
import { Fragment, useEffect, useState } from "react";

const GoalItem = ({ item }) => {
  const { id, goalText, goal } = item;

  const dispatch = useDispatch();

  const loggedUserJSON = localStorage.getItem('foundUser');
  const loggedUser = JSON.parse(loggedUserJSON);

  const [congrats, setCongrats] = useState(false);
  const [percentage, setPercentage] = useState("");
  const [itemPercentageStyle, setItemPercentageStyle] = useState();

  useEffect(() => {
    const balance = loggedUser.balance;

    const goalValue = goal.replace(/\D/g, "");
    const balanceValue = balance.replace(/\D/g, "");

    let calc;

    if (balance[0] === "-") {
      calc = 0;
    } else {
      calc = (parseInt(balanceValue) / parseInt(goalValue)) * 100;
    }

    let calculatedPercentage;

    if (calc > 100) {
      calculatedPercentage = "100%";
    } else {
      calculatedPercentage = calc.toFixed(0) + "%";
      const percentageColor = getPercentageColor(calc);

      const itemPercentageStyle = {
        backgroundColor: percentageColor,
        width: calc >= 10 ? calc + "%" : "10%",
      };
      setItemPercentageStyle(itemPercentageStyle);
    }

    setPercentage(calculatedPercentage);
    setCongrats(calc >= 100);
  }, [id, goalText, goal]);

  const getPercentageColor = (percentage) => {
    const minHue = 0; // Red hue
    const maxHue = 120; // Green hue

    const hue = (percentage * (maxHue - minHue)) / 100 + minHue;
    const saturation = 100;
    const lightness = 50;

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  const onDeleteHandler = async () => {
    const userConfirmed = window.confirm(
      "Clique em OK para confirmar a exclusão"
    );

    if (userConfirmed) {
      try {
        const response = await fetch(
          "https://react-http-f8211-default-rtdb.firebaseio.com/logins.json"
        );

        if (!response.ok) {
          console.log("Algo deu errado");
        }

        const responseData = await response.json();

        const user = Object.values(responseData).find(
          (item) => item.email === loggedUser.email
        );

        const goalItem = user.goals.filter((item) => item.id !== id);

        const newItem = goalItem[0] === undefined ? [""] : goalItem;

        const updatedGoalItems = {
          email: loggedUser.email,
          id: loggedUser.id,
          lastName: loggedUser.lastName,
          name: loggedUser.name,
          password: loggedUser.password,
          image: loggedUser.image,
          balance: loggedUser.balance,
          expenseItems: loggedUser.expenseItems,
          incomeItems: loggedUser.incomeItems,
          goals: newItem,
        };

        const userKeys = Object.keys(responseData).find(
          (key) => responseData[key].email === loggedUser.email
        );

        await fetch(
          `https://react-http-f8211-default-rtdb.firebaseio.com/logins/${userKeys}.json`,
          {
            method: "PUT",
            body: JSON.stringify(updatedGoalItems),
          }
        );

        const updatedGoalItemsJSON = JSON.stringify(updatedGoalItems);
        localStorage.setItem('foundUser', updatedGoalItemsJSON);
        dispatch(callerActions.update());
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Fragment>
      {!congrats && (
        <>
          <div className={classes.div}>
            <section className={classes.item}>
              <button className={classes.delete} onClick={onDeleteHandler}>
                X
              </button>
              <div className={classes.itemContainer}>
                <h2 className={classes.header}>Objetivo:</h2>
                <p className={classes.itemText}>{goalText}</p>
                <h2 className={classes.header}>Valor:</h2>
                <p className={classes.itemValue}>{goal}</p>
                <h2 className={classes.itemProgress}>Progresso:</h2>
              </div>
              <div
                className={classes.itemPercentage}
                style={itemPercentageStyle}
              >
                <div>{percentage}</div>
              </div>
            </section>
          </div>
        </>
      )}
      {congrats && (
        <>
          <div className={classes.div}>
            <section className={classes.item}>
              <button className={classes.delete} onClick={onDeleteHandler}>
                X
              </button>
              <div className={classes.successContainer}>
                <h2>Objetivos:</h2>
                <p className={classes.successText}>{goalText}</p>
                <h2>Valor:</h2>
                <p className={classes.successValue}>{goal}</p>
                <h2 className={classes.success}>Progresso:</h2>
                <h3 className={classes.congrats}>Parabéns!</h3>
              </div>
              <div className={classes.successPercentage}>
                <div>{percentage}</div>
              </div>
            </section>
          </div>
        </>
      )}
    </Fragment>
  );
};

export default GoalItem;

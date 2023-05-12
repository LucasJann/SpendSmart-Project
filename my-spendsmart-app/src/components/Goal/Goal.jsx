import classes from "./Goal.module.css";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import GoalItem from "./GoalItem";

import { goalActions } from "../../store/goal-slice";

const formatMoney = (value) => {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });

  return formatter.format((value / 100).toFixed(2));
};

const Goal = () => {
  const goal = useSelector((state) => state.goal.text);
  const goalValue = useSelector((state) => state.goal.goal);
  const balance = useSelector((state) => state.value.value);

  const [localStorageGoals, setLocalStorageGoals] = useState([]);
  const [isGoalFilled, setIsGoalFilled] = useState(false);
  const [isTextFilled, setIsTextFilled] = useState(false);

  const storedValue = localStorage.getItem("initialBalance");
  const storage = balance === 0 ? storedValue : balance;

  const dispatch = useDispatch();
  const navigation = useNavigate();

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("goals")) || [];
    setLocalStorageGoals(storedItems);
  }, []);

  const goalInputChange = (event) => {
    let value = event.target.value.replace(/\D/g, "");
    const formattedBalance = formatMoney(value);
    dispatch(goalActions.addGoal(formattedBalance));

    if (event.target.value.length > 0) {
      setIsGoalFilled(true);
    } else {
      setIsGoalFilled(false);
    }
  };

  const textInputChange = (event) => {
    dispatch(goalActions.addText(event.target.value));
    if (event.target.value.length > 0) {
      setIsTextFilled(true);
    } else {
      setIsTextFilled(false);
    }
  };

  const inputGoalHandler = () => {
    const expenseItem = {
      goalValue: goalValue,
      goal: goal,
    };

    const updatedItems = [...localStorageGoals, expenseItem];
    
    localStorage.setItem("goals", JSON.stringify(updatedItems));
    setLocalStorageGoals(updatedItems);

    dispatch(goalActions.addGoal(""));
    dispatch(goalActions.addText(""));

    setIsGoalFilled(false);
    setIsTextFilled(false);
  };

  const getBackButtonHandler = () => {
    navigation("/landingPage");
  };

  return (
    <div className={classes.goalsDiv}>
      <button className={classes.getBackButton} onClick={getBackButtonHandler}>
        Voltar
      </button>
      <h3 className={classes.h3}>Seu Saldo:</h3>
      <input
        type="text"
        id="input1"
        value={storage}
        disabled={true}
        className={classes.input}
      />
      <h3 className={classes.h3}>Insira o valor do seu Objetivo</h3>
      <input
        type="text"
        id="input2"
        value={goalValue}
        className={classes.input}
        onChange={goalInputChange}
      />
      <h3 className={classes.h3}>Objetivo</h3>
      <input
        type="text"
        id="input3"
        value={goal}
        className={classes.input}
        onChange={textInputChange}
      />

      <p className={classes.paragraph}>
        Insira o seu objetivo com uma palavra, exemplo: viajar
      </p>
      {isGoalFilled && isTextFilled && (
        <button className={classes.inputButton} onClick={inputGoalHandler}>
          Inserir
        </button>
      )}
      {localStorageGoals.map((item, index) => (
        <GoalItem key={index} item={item} />
      ))}
    </div>
  );
};

export default Goal;

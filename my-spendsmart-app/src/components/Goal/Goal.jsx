import classes from "./Goal.module.css";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import GoalItem from "./GoalItem";

import { goalActions } from "../../store/goal-slice";
import { v4 as uuidv4 } from "uuid";

const formatMoney = (value) => {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });

  return formatter.format((value / 100).toFixed(2));
};

const Goal = () => {
  const balance = useSelector((state) => state.value.balance);
  console.log(balance)
  const goalItem = useSelector((state) => state.goal.items);

  const [goal, setGoal] = useState("");
  const [message, setMessage] = useState(false);
  const [goalText, setGoalText] = useState("");
  const [isGoalFilled, setIsGoalFilled] = useState(false);
  const [isTextFilled, setIsTextFilled] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigate();

  const formattedBalance = formatMoney(balance);

  const goalValueChange = (event) => {
    let value = event.target.value.replace(/\D/g, "");
    const formattedBalance = formatMoney(value);

    setGoal(formattedBalance);

    let validateValue = event.target.value.length;

    if (validateValue > 0 && validateValue <= 21) {
      setMessage(false);
      setIsGoalFilled(true);
    } else {
      setMessage(true);
      setIsGoalFilled(false);
    }
  };

  const textInputChange = (event) => {
    const validateText = event.target.value;
    if (validateText.length >= 0) {
      setGoalText(validateText);
      setIsTextFilled(true);
    } else {
      setIsTextFilled(false);
    }
  };

  const inputGoalHandler = () => {
    const id = uuidv4();
    const item = {
      id,
      goalText: goalText,
      goal: goal,
    };

    dispatch(goalActions.addItem(item));

    setGoal("");
    setGoalText("");
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
      <h3 className={classes.h3}>Seu Saldo Atual:</h3>
      <input
        type="text"
        id="input1"
        value={formattedBalance}
        disabled={true}
        className={classes.input}
      />
      <h3 className={classes.h3}>Escreva abaixo o seu objetivo</h3>
      <input
        type="text"
        id="input3"
        value={goalText}
        className={classes.input}
        onChange={textInputChange}
      />
      <h3 className={classes.h3}>Insira o valor do seu objetivo</h3>
      <input
        type="text"
        id="input2"
        value={goal}
        className={classes.goal}
        onChange={goalValueChange}
      />
      {message && (
        <p className={classes.warning}>
          Número digitado não pode ser igual ou superior que 1 trilhão
        </p>
      )}

      {isGoalFilled && isTextFilled && (
        <button className={classes.inputButton} onClick={inputGoalHandler}>
          Inserir
        </button>
      )}
      {goalItem.map((item, index) => (
        <GoalItem key={index} item={item} />
      ))}
    </div>
  );
};

export default Goal;

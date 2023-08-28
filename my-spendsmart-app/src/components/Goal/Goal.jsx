import { useState, useEffect } from "react";
import classes from "./Goal.module.css";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import GoalItem from "./GoalItem";

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
  const loggedUserJSON = localStorage.getItem("foundUser");
  const loggedUser = JSON.parse(loggedUserJSON);

  const storedGoals = loggedUser.goals;

  const [items, setItems] = useState([]);
  const [goal, setGoal] = useState("");
  const [render, setRender] = useState(false);
  const [message, setMessage] = useState(false);
  const [goalText, setGoalText] = useState("");
  const [isGoalFilled, setIsGoalFilled] = useState(false);
  const [isTextFilled, setIsTextFilled] = useState(false);
  const [callerEffect, setCallerEffect] = useState(false);

  const itemsUpdated = useSelector((state) => state.call.caller);

  const navigation = useNavigate();

  useEffect(() => {
    if (storedGoals === "") {
      setItems([""]);
    } else {
      const storedItems = storedGoals;
      setItems(storedItems);
    }
  }, [itemsUpdated, callerEffect]);

  useEffect(() => {
    storedGoals[0] === "" ? setRender(false) : setRender(true);
  }, [storedGoals]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://react-http-f8211-default-rtdb.firebaseio.com/logins.json"
        );

        if (!response.ok) {
          throw new Error("Algo deu errado!");
        }

        const responseData = await response.json();

        const storedUser = Object.values(responseData).find(
          (user) => user.email === loggedUser.email
        );

        const updatedUserBalance = {
          email: storedUser.email,
          id: storedUser.id,
          lastName: storedUser.lastName,
          name: storedUser.name,
          password: storedUser.password,
          image: storedUser.image,
          balance: storedUser.balance,
          expenseItems: storedUser.expenseItems,
          incomeItems: storedUser.incomeItems,
          goals: loggedUser.goals,
        };

        const userKey = Object.keys(responseData).find(
          (key) => responseData[key].email === storedUser.email
        );

        try {
          await fetch(
            `https://react-http-f8211-default-rtdb.firebaseio.com/logins/${userKey}.json`,
            {
              method: "PUT",
              body: JSON.stringify(updatedUserBalance),
            }
          );
        } catch {}
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [callerEffect]);

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

  const inputGoalHandler = async () => {
    if (storedGoals[0] === "") {
      storedGoals.shift();
    }

    const id = uuidv4();
    const item = [
      {
        id: id,
        goalText: goalText,
        goal: goal,
      },
    ];

    storedGoals.push(item[0]);

    const newItem = storedGoals;

    const updatedUser = {
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

    const updatedUserJSON = JSON.stringify(updatedUser);

    localStorage.setItem("foundUser", updatedUserJSON);
    setCallerEffect(!callerEffect);

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
        value={loggedUser.balance}
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
      {render &&
        items.map((item, index) => <GoalItem key={index} item={item} />)}
    </div>
  );
};

export default Goal;

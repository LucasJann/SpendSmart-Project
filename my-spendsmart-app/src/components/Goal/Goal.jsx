import classes from "./Goal.module.css";
import GoalItem from "./GoalItem";

import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const formatMoney = (value) => {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });

  return formatter.format((value / 100).toFixed(2));
};

const Goal = () => {

  const loggedUserJSON = localStorage.getItem('foundUser');
  const loggedUser = JSON.parse(loggedUserJSON);

  const storedGoals = loggedUser.goals;
  const storedBalance = loggedUser.balance;

  const [goal, setGoal] = useState("");
  const [items, setItems] = useState([]);
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

  const goalChange = (event) => {
    let goalValue = event.target.value.replace(/\D/g, "");
    const formattedBalance = formatMoney(goalValue);

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

  const textChange = (event) => {
    const textValue = event.target.value;

    if (textValue.length >= 0) {
      setGoalText(textValue);
      setIsTextFilled(true);
    } else {
      setIsTextFilled(false);
    }
  };

  const onInputGoalHandler = async () => {
    if (storedGoals[0] === "") {
      storedGoals.shift();
    }

    const id = uuidv4();
    const item = [
      {
        id: id,
        goal: goal,
        goalText: goalText,
      },
    ];

    storedGoals.unshift(item[0]);
    const newItem = storedGoals;

    const updatedUser = {
      id: loggedUser.id,
      name: loggedUser.name,
      email: loggedUser.email,
      image: loggedUser.image,
      goals: newItem,
      balance: loggedUser.balance,
      lastName: loggedUser.lastName,
      password: loggedUser.password,
      expenseItems: loggedUser.expenseItems,
      incomeItems: loggedUser.incomeItems,
    };
    const updatedUserJSON = JSON.stringify(updatedUser);
    localStorage.setItem('foundUser', updatedUserJSON);

    setGoal("");
    setGoalText("");
    setIsGoalFilled(false);
    setIsTextFilled(false);
    setCallerEffect(!callerEffect);
  };

  const onGetBackHandler = () => {
    navigation("/landingPage");
  };

  return (
    <section className={classes.section}>
      <button className={classes.getBackButton} onClick={onGetBackHandler}>
        Voltar
      </button>
      <h3>Seu Saldo Atual:</h3>
      <input
        className={classes.input}
        id="balance"
        type="text"
        value={storedBalance}
        disabled={true}
      />
      <h3>Escreva abaixo o seu objetivo</h3>
      <input
        className={classes.input}
        id="goal"
        type="text"
        value={goalText}
        onChange={textChange}
      />
      <h3>Insira o valor do seu objetivo</h3>
      <input
        id="goalValue"
        type="text"
        value={goal}
        onChange={goalChange}
        className={message ? classes.inputError : classes.input}
      />
      {message && (
        <p className={classes.warning}>
          Número digitado não pode ser igual ou superior que 1 trilhão
        </p>
      )}

      {isGoalFilled && isTextFilled && (
        <button className={classes.inputButton} onClick={onInputGoalHandler}>
          Inserir
        </button>
      )}
      {render &&
        items.map((item, index) => <GoalItem key={index} item={item} />)}
    </section>
  );
};

export default Goal;

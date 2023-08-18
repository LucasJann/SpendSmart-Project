import React, { Fragment, useEffect, useState } from "react";

import classes from "./Expense.module.css";

import health from "../../Icons/checklist.png";
import college from "../../Icons/college.png";
import leisure from "../../Icons/rocket.png";
import homeIcon from "../../Icons/home.png";
import nutrition from "../../Icons/clock.png";
import transportation from "../../Icons/location.png";

import Card from "../Layout/Card";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { format, addMinutes } from "date-fns";

import { v4 as uuidv4 } from "uuid";

import { expenseActions } from "../../store/expense-slice";


const formatMoney = (value) => {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
  return formatter.format((value / 100).toFixed(2));
};

const Expense = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const storedUserJSON = localStorage.getItem("foundUser");
  const storedUser = JSON.parse(storedUserJSON);

  const [date, setDate] = useState();
  const [input, setInput] = useState(false);
  const [message, setMessage] = useState(true);
  const [warning, setWarning] = useState(false);
  const [isDateFilled, setIsDateFilled] = useState(false);
  const [callerEffect, setCallerEffect] = useState(false);

  const [expense, setExpense] = useState("");
  const [newExpense, setNewExpense] = useState(storedUser.balance);
  const [isExpenseFilled, setIsExpenseFilled] = useState(false);

  const [category, setCategory] = useState();
  const [isCategoryFilled, setIsCategoryFilled] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [userItems, setUserItems] = useState([]);

  useEffect(() => {
    const fetchNewData = async () => {
      try {
        const response = await fetch(
          "https://react-http-f8211-default-rtdb.firebaseio.com/logins.json"
        );

        if (!response.ok) {
          throw new Error("Algo deu errado!");
        }

        const responseData = await response.json();

        const loggedUser = Object.values(responseData).find(
          (user) => user.email === storedUser.email
        );

        setUserItems(loggedUser.items);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNewData();
  }, [userItems]);

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

        const loggedUser = Object.values(responseData).find(
          (user) => user.email === storedUser.email
        );

        const updatedUserBalance = {
          email: loggedUser.email,
          id: loggedUser.id,
          lastName: loggedUser.lastName,
          name: loggedUser.name,
          password: loggedUser.password,
          image: loggedUser.image,
          balance: newExpense,
          items: storedUser.items,
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
  }, [newExpense, callerEffect]);

  const dateChange = (event) => {
    const selectedDate = new Date(event.target.value);

    if (isNaN(selectedDate)) {
      return;
    }

    const adjustedDate = addMinutes(
      selectedDate,
      selectedDate.getTimezoneOffset()
    );

    const dateString = format(adjustedDate, "yyyy-MM-dd");

    setDate(dateString);
    setMessage(false);
    setIsDateFilled(true);
  };

  const expenseChange = (event) => {
    const value = event.target.value;
    const numericValue = value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos

    if (numericValue.length > 14) {
      setWarning(true);
      setIsExpenseFilled(false);
      setExpense(formatMoney(numericValue));
    } else {
      setWarning(false);
      setIsExpenseFilled(true);
      setExpense(formatMoney(numericValue));
    }
  };

  const categoryClickHandler = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
      setIsCategoryFilled(false);
    } else {
      setSelectedCategory(category);
      setIsCategoryFilled(true);
    }
    setCategory(category);
  };

  const onInputHandler = () => {
    const convertedExpense = expense.replace(/\D/g, "");

    const userBalance = storedUser.balance;
    const convertedUserBalance = userBalance.replace(/\D/g, "");

    if (userBalance[0] === "-") {
      const negativeConvertedExpense = convertedExpense * -1;
      const negativeBalance = negativeConvertedExpense - convertedUserBalance;

      const id = uuidv4();

      const expenseItem = [
        {
          id: id,
          value: expense,
          date: date,
          category: category,
        },
      ];

      setUserItems(expenseItem);

      const formattedUserBalance = formatMoney(negativeBalance);

      const storedItems = storedUser.items;
      storedItems.push(expenseItem[0]);
      const storedNewItem = storedItems;

      const userUpdated = {
        email: storedUser.email,
        id: storedUser.id,
        lastName: storedUser.lastName,
        name: storedUser.name,
        password: storedUser.password,
        image: storedUser.image,
        balance: formattedUserBalance,
        items: storedNewItem,
      };

      console.log(userUpdated);

      const userUpdatedJSON = JSON.stringify(userUpdated);

      localStorage.setItem("foundUser", userUpdatedJSON);
      dispatch(expenseActions.addItem(expenseItem));
      setNewExpense(formatMoney(negativeBalance));
      setCallerEffect(!callerEffect);
    } else {
      const newBalance = convertedUserBalance - convertedExpense;

      const id = uuidv4();
      const expenseItem = [
        {
          id: id,
          value: expense,
          date: date,
          category: category,
        },
      ];

      const formattedUserBalance = formatMoney(newBalance);
      const storedItems = storedUser.items;

      console.log(storedUser.items[0])
      console.log(storedItems)
      console.log(expenseItem)
      console.log(expenseItem[0])

      storedItems.push(expenseItem[0]);
      const storedNewItem = storedItems;

      console.log(storedUser)

      const userUpdated = {
        email: storedUser.email,
        id: storedUser.id,
        lastName: storedUser.lastName,
        name: storedUser.name,
        password: storedUser.password,
        image: storedUser.image,
        balance: formattedUserBalance,
        items: storedNewItem,
      };

      console.log(userUpdated);

      const userUpdatedJSON = JSON.stringify(userUpdated);

      localStorage.setItem("foundUser", userUpdatedJSON);
      setNewExpense(formatMoney(newBalance));
      dispatch(expenseActions.addItem(expenseItem));
      setCallerEffect(!callerEffect);
    }

    //Outro erro que ocorre quando colocamos dois valores iguais que vão ficar negativos, os valores negativos se anulam
    //Verificar toda a lógica de cálculos.

    setInput(true);
    setTimeout(function () {
      setInput(false);
    }, 3000);

    setExpense("");
    setMessage(true);
    setIsDateFilled(false);
    setIsExpenseFilled(false);
  };

  const onGetBackHandler = () => {
    navigation("/landingPage");
  };

  const onIncomeHandler = () => {
    navigation("/incomePage");
  };

  const onHistoryHandler = () => {
    navigation("/expenseHistoryPage");
  };

  return (
    <>
      {input && (
        <div className={classes.success}>Despesa inserida com sucesso</div>
      )}
      <section className={classes.section}>
        <button className={classes.getBack} onClick={onGetBackHandler}>
          Voltar
        </button>
        <div className={classes.alternativeBtnsDiv}>
          <button className={classes.expenseBtn}>Despesa</button>
          <button className={classes.incomeBtn} onClick={onIncomeHandler}>
            Renda
          </button>
        </div>
        <h2 className={classes.date}>
          Data:
          <input
            type="date"
            id="date"
            onChange={dateChange}
            onClick={dateChange}
            className={classes.inputDate}
          />
        </h2>
        {message && (
          <p className={classes.paragraph}>
            Click no calendário para iniciar um registro
          </p>
        )}
        {isDateFilled && (
          <Fragment>
            <div>
              <h2 className={classes.expense}>
                Despesa:
                <input
                  type="text"
                  id="text"
                  value={expense}
                  onChange={expenseChange}
                  className={classes.inputExpense}
                />
              </h2>
            </div>
            {warning && (
              <p className={classes.warning}>
                Número digitado não pode ser igual ou superior que 1 trilhão
              </p>
            )}
            <div>
              <h2 className={classes.category}>Categoria:</h2>
              <Card>
                <ul className={classes.categories}>
                  <li
                    className={`${classes.list} ${
                      selectedCategory === "casa" ? classes.selected : ""
                    }`}
                    onClick={() => categoryClickHandler("casa")}
                  >
                    <div>
                      <img
                        src={homeIcon}
                        alt="Icone de uma casa"
                        className={classes.icon}
                      />
                      <p className={classes.text}>Casa</p>
                    </div>
                  </li>
                  <li
                    className={`${classes.list} ${
                      selectedCategory === "lazer" ? classes.selected : ""
                    }`}
                    onClick={() => categoryClickHandler("lazer")}
                  >
                    <div>
                      <img
                        src={leisure}
                        alt="Icone de um Foguete"
                        className={classes.icon}
                      />
                      <p className={classes.text}>Lazer</p>
                    </div>
                  </li>
                  <li
                    className={`${classes.list} ${
                      selectedCategory === "saúde" ? classes.selected : ""
                    }`}
                    onClick={() => categoryClickHandler("saúde")}
                  >
                    <div>
                      <img
                        src={health}
                        alt="Icone de uma planilha"
                        className={classes.icon}
                      />
                      <p className={classes.text}>Saúde</p>
                    </div>
                  </li>
                  <li
                    className={`${classes.list} ${
                      selectedCategory === "educação" ? classes.selected : ""
                    }`}
                    onClick={() => categoryClickHandler("educação")}
                  >
                    <div>
                      <img
                        src={college}
                        alt="Icone de formatura"
                        className={classes.icon}
                      />
                      <p className={classes.text}>Educação</p>
                    </div>
                  </li>
                  <li
                    className={`${classes.list} ${
                      selectedCategory === "comida" ? classes.selected : ""
                    }`}
                    onClick={() => categoryClickHandler("comida")}
                  >
                    <div>
                      <img
                        src={nutrition}
                        alt="Icone de um relógio"
                        className={classes.icon}
                      />
                      <p className={classes.text}>Alimentação</p>
                    </div>
                  </li>
                  <li
                    className={`${classes.list} ${
                      selectedCategory === "transporte" ? classes.selected : ""
                    }`}
                    onClick={() => categoryClickHandler("transporte")}
                  >
                    <div>
                      <img
                        src={transportation}
                        alt="Icone de um relógio"
                        className={classes.icon}
                      />
                      <p className={classes.text}>Transporte</p>
                    </div>
                  </li>
                </ul>
              </Card>
            </div>
          </Fragment>
        )}
        {isExpenseFilled && isCategoryFilled && (
          <button className={classes.btn} onClick={onInputHandler}>
            Inserir Despesa
          </button>
        )}
        <div>
          <button className={classes.btn} onClick={onHistoryHandler}>
            Visualizar Despesa
          </button>
        </div>
      </section>
    </>
  );
};

export default Expense;

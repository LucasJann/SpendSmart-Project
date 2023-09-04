import { v4 as uuidv4 } from "uuid";

import { useNavigate } from "react-router-dom";
import { format, addMinutes } from "date-fns";
import { Fragment, useEffect, useState } from "react";

import Card from "../Layout/Card";
import classes from "./Income.module.css";

import money from "../../Icons/moneyBag.png";
import finance from "../../Icons/finance.png";
import identifier from "../../Icons/id.png";

const formatMoney = (value) => {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
  return formatter.format((value / 100).toFixed(2));
};

const Income = () => {
  const navigation = useNavigate();

  const storedUserJSON = localStorage.getItem("foundUser");
  const storedUser = JSON.parse(storedUserJSON);

  const [date, setDate] = useState();
  const [income, setIncome] = useState("");
  const [category, setCategory] = useState();
  const [isCategoryFilled, setIsCategoryFilled] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [input, setInput] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(true);
  const [warning, setWarning] = useState(false);
  const [isDateFilled, setIsDateFilled] = useState(false);
  const [callerEffect, setCallerEffect] = useState(false);
  const [isIncomeFilled, setIsIncomeFilled] = useState(false);

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

        const updatedUser = {
          id: loggedUser.id,
          name: loggedUser.name,
          email: loggedUser.email,
          goals: loggedUser.goals,
          image: loggedUser.image,
          balance: storedUser.balance,
          lastName: loggedUser.lastName,
          password: loggedUser.password,
          incomeItems: storedUser.incomeItems,
          expenseItems: loggedUser.expenseItems,
        };

        const userKey = Object.keys(responseData).find(
          (key) => responseData[key].email === storedUser.email
        );

        try {
          await fetch(
            `https://react-http-f8211-default-rtdb.firebaseio.com/logins/${userKey}.json`,
            {
              method: "PUT",
              body: JSON.stringify(updatedUser),
            }
          );
        } catch {}
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [callerEffect]);

  const dateChangeHandler = (event) => {
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

  const incomeChange = (event) => {
    const value = event.target.value;
    const numericValue = value.replace(/\D/g, "");

    if (numericValue.length > 14) {
      setError(true);
      setWarning(true);
      setIsIncomeFilled(false);
      setIncome(formatMoney(numericValue));
    } else {
      setError(false);
      setWarning(false);
      setIsIncomeFilled(true);
      setIncome(formatMoney(numericValue));
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
    const userBalance = storedUser.balance;
    const convertedUserBalance = userBalance.replace(/\D/g, "");
    const convertedIncome = income.replace(/\D/g, "");

    if (userBalance[0] === "-") {
      const negativeBalance = convertedUserBalance * -1;
      const calc = parseInt(convertedIncome) + negativeBalance;
      const newBalance = formatMoney(calc);

      const storedIncomeItems = storedUser.incomeItems;
      if (storedIncomeItems[0] === "") {
        storedIncomeItems.shift();
      }

      const id = uuidv4();
      const incomeItem = [
        {
          id: id,
          value: income,
          date: date,
          category: category,
        },
      ];

      storedIncomeItems.unshift(incomeItem[0]);
      const newIncomeItems = storedIncomeItems;

      const userUpdated = {
        id: storedUser.id,
        name: storedUser.name,
        image: storedUser.image,
        email: storedUser.email,
        goals: storedUser.goals,
        balance: newBalance,
        lastName: storedUser.lastName,
        password: storedUser.password,
        incomeItems: newIncomeItems,
        expenseItems: storedUser.expenseItems,
      };
      const userUpdatedJSON = JSON.stringify(userUpdated);
      localStorage.setItem("foundUser", userUpdatedJSON);

      setCallerEffect(!callerEffect);
    } else {
      const calc = parseInt(convertedUserBalance )+ parseInt(convertedIncome);
      const newBalance = formatMoney(calc);

      const storedIncomeItems = storedUser.incomeItems;
      if (storedIncomeItems[0] === "") {
        storedIncomeItems.shift();
      }

      const id = uuidv4();
      const incomeItem = [
        {
          id: id,
          value: income,
          date: date,
          category: category,
        },
      ];

      storedIncomeItems.unshift(incomeItem[0]);
      const newIncomeItems = storedIncomeItems;

      const userUpdated = {
        id: storedUser.id,
        name: storedUser.name,
        image: storedUser.image,
        email: storedUser.email,
        goals: storedUser.goals,
        balance: newBalance,
        lastName: storedUser.lastName,
        password: storedUser.password,
        incomeItems: newIncomeItems,
        expenseItems: storedUser.expenseItems,
      };
      const userUpdatedJSON = JSON.stringify(userUpdated);
      localStorage.setItem("foundUser", userUpdatedJSON);

      setCallerEffect(!callerEffect);
    }

    setInput(true);
    setTimeout(function () {
      setInput(false);
    }, 3000);

    setIncome("");
    setMessage(true);
    setIsDateFilled(false);
    setIsIncomeFilled(false);
  };

  const onHistoryHandler = () => {
    navigation("/incomeHistoryPage");
  };

  const onExpenseHandler = () => {
    navigation("/expensePage");
  };

  const onGetBackHandler = () => {
    navigation("/landingPage");
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
          <button className={classes.expenseBtn} onClick={onExpenseHandler}>
            Despesa
          </button>
          <button className={classes.incomeBtn}>Renda</button>
        </div>
        <h2>
          Data:
          <input
            type="date"
            id="date"
            onChange={dateChangeHandler}
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
              <h2>
                Despesa:
                <input
                  type="text"
                  id="text"
                  value={income}
                  onChange={incomeChange}
                  className={error ? classes.inputError : classes.inputIncome}
                />
              </h2>
            </div>
            {warning && (
              <p className={classes.warning}>
                Número digitado não pode ser igual ou superior que 1 trilhão
              </p>
            )}
            <div>
              <h2 className={classes.caterogyHeader}>Categoria:</h2>
              <Card>
                <ul className={classes.categories}>
                  <li
                    className={`${classes.list} ${
                      selectedCategory === "moradia" ? classes.selected : ""
                    }`}
                    onClick={() => categoryClickHandler("moradia")}
                  >
                    <div>
                      <img
                        src={money}
                        alt="Icone de um saco de dinheiro"
                        className={classes.icon}
                      />
                      <p className={classes.text}>Renda Extra</p>
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
                        src={identifier}
                        alt="Icone de um cracha"
                        className={classes.icon}
                      />
                      <p className={classes.text}>Salário</p>
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
                        src={finance}
                        alt="Icone de um laptop com uma projeção positiva de um gráfico de linha"
                        className={classes.icon}
                      />
                      <p className={classes.text}>Aplicações</p>
                    </div>
                  </li>         
                </ul>
              </Card>
            </div>
          </Fragment>
        )}
        {isIncomeFilled && isCategoryFilled && (
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

export default Income;

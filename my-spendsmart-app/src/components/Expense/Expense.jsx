import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { format, addMinutes } from "date-fns";
import { Fragment, useEffect, useState } from "react";

import Card from "../Layout/Card";
import classes from "./Expense.module.css";

import health from "../../Icons/checklist.png";
import college from "../../Icons/college.png";
import leisure from "../../Icons/rocket.png";
import homeIcon from "../../Icons/home.png";
import location from "../../Icons/location.png";
import nutrition from "../../Icons/clock.png";

const formatMoney = (value) => {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
  return formatter.format((value / 100).toFixed(2));
};

const Expense = () => {
  const navigation = useNavigate();

  const storedUserJSON = localStorage.getItem('foundUser');
  const storedUser = JSON.parse(storedUserJSON);

  const [date, setDate] = useState();
  const [expense, setExpense] = useState("");
  const [category, setCategory] = useState();
  const [isCategoryFilled, setIsCategoryFilled] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [input, setInput] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(true);
  const [warning, setWarning] = useState(false);
  const [isDateFilled, setIsDateFilled] = useState(false);
  const [callerEffect, setCallerEffect] = useState(false);
  const [isExpenseFilled, setIsExpenseFilled] = useState(false);

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
          incomeItems: loggedUser.incomeItems,
          expenseItems: storedUser.expenseItems,
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

  const expenseChange = (event) => {
    const value = event.target.value;
    const numericValue = value.replace(/\D/g, "");

    if (numericValue.length > 14) {
      setError(true);
      setWarning(true);
      setIsExpenseFilled(false);
      setExpense(formatMoney(numericValue));
    } else {
      setError(false);
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
    const userBalance = storedUser.balance;
    const convertedUserBalance = userBalance.replace(/\D/g, "");
    const convertedExpense = expense.replace(/\D/g, "");

    if (userBalance[0] === "-") {
      const expenseValue = convertedExpense * -1;
      const calc = expenseValue - convertedUserBalance;
      const newBalance = formatMoney(calc);

      const storedExpenseItems = storedUser.expenseItems;
      if (storedExpenseItems[0] === "") {
        storedExpenseItems.shift();
      }

      const id = uuidv4();
      const expenseItem = [
        {
          id: id,
          value: expense,
          date: date,
          category: category,
        },
      ];

      storedExpenseItems.unshift(expenseItem[0]);
      const newExpenseItems = storedExpenseItems;

      const userUpdated = {
        id: storedUser.id,
        name: storedUser.name,
        image: storedUser.image,
        email: storedUser.email,
        goals: storedUser.goals,
        balance: newBalance,
        lastName: storedUser.lastName,
        password: storedUser.password,
        incomeItems: storedUser.incomeItems,
        expenseItems: newExpenseItems,
      };
      const userUpdatedJSON = JSON.stringify(userUpdated);
      localStorage.setItem('foundUser', userUpdatedJSON);

      setCallerEffect(!callerEffect);
    } else {
      const calc = convertedUserBalance - convertedExpense;
      const newBalance = formatMoney(calc);

      const storedExpenseItems = storedUser.expenseItems;
      if (storedExpenseItems[0] === "") {
        storedExpenseItems.shift();
      }

      const id = uuidv4();
      const expenseItem = [
        {
          id: id,
          value: expense,
          date: date,
          category: category,
        },
      ];

      storedExpenseItems.unshift(expenseItem[0]);
      const newExpenseItems = storedExpenseItems;

      const userUpdated = {
        id: storedUser.id,
        name: storedUser.name,
        image: storedUser.image,
        email: storedUser.email,
        goals: storedUser.goals,
        balance: newBalance,
        lastName: storedUser.lastName,
        password: storedUser.password,
        expenseItems: newExpenseItems,
        incomeItems: storedUser.incomeItems,
      };
      const userUpdatedJSON = JSON.stringify(userUpdated);
      localStorage.setItem('foundUser', userUpdatedJSON);

      setCallerEffect(!callerEffect);
    }

    setInput(true);
    setTimeout(function () {
      setInput(false);
    }, 3000);

    setExpense("");
    setMessage(true);
    setIsDateFilled(false);
    setIsExpenseFilled(false);
  };

  const onHistoryHandler = () => {
    navigation("/expenseHistoryPage");
  };

  const onIncomeHandler = () => {
    navigation("/incomePage");
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
          <button className={classes.expenseBtn}>Despesa</button>
          <button className={classes.incomeBtn} onClick={onIncomeHandler}>
            Renda
          </button>
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
                  value={expense}
                  onChange={expenseChange}
                  className={error ? classes.inputError : classes.inputExpense}
                />
              </h2>
            </div>
            {warning && (
              <p className={classes.warning}>
                Número digitado não pode ser igual ou superior que 1 trilhão
              </p>
            )}
            <div>
              <h2>Categoria:</h2>
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
                      selectedCategory === "alimentação" ? classes.selected : ""
                    }`}
                    onClick={() => categoryClickHandler("alimentação")}
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
                        src={location}
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

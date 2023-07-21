import React, { Fragment, useState } from "react";
import classes from "./Expense.module.css";

import health from "../../Icons/checklist.png";
import college from "../../Icons/college.png";
import leisure from "../../Icons/rocket.png";
import homeIcon from "../../Icons/home.png";
import nutrition from "../../Icons/clock.png";
import transportation from "../../Icons/location.png";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { format, addMinutes } from "date-fns";

import Card from "../Layout/Card";

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

  const [date, setDate] = useState();
  const [input, setInput] = useState(false);
  const [message, setMessage] = useState(true);
  const [warning, setWarning] = useState(false);
  const [isDateFilled, setIsDateFilled] = useState(false);

  const [expense, setExpense] = useState("");
  const [isExpenseFilled, setIsExpenseFilled] = useState(false);

  const [category, setCategory] = useState();
  const [isCategoryFilled, setIsCategoryFilled] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

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
    const newExpenseItem = {
      value: expense,
      date: date,
      category: category,
    };

    dispatch(expenseActions.addItem(newExpenseItem));

    setInput(true);
    setTimeout(function() {
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
      {input && <div className={classes.success}>Despesa inserida com sucesso</div>}
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

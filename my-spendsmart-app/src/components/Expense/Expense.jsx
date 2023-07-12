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
  const [isDateFilled, setIsDateFilled] = useState(false);

  const [inputExpense, setInputExpense] = useState("");
  const [isExpenseFilled, setIsExpenseFilled] = useState(false);

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
    setIsDateFilled(true);
  };

  const expenseChange = (event) => {
    let value = event.target.value.replace(/\D/g, "");
    setInputExpense(formatMoney(value));
    setIsExpenseFilled(true);
  };

  const categoryClickHandler = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  const onInputHandler = () => {
    const newExpenseItem = {
      value: inputExpense,
      date: date,
    };

    dispatch(expenseActions.addInput(newExpenseItem));

    setInputExpense("");
    setIsDateFilled(false);
    setIsExpenseFilled(false)
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
      <div className={classes.expenseDiv}>
        <button className={classes.getBackButton} onClick={onGetBackHandler}>
          Voltar
        </button>
        <div className={classes.alternativeDiv}>
          <button className={classes.expenseBtn}>Custo</button>
          <button className={classes.incomeBtn} onClick={onIncomeHandler}>
            Renda
          </button>
        </div>
        <div>
          <h2 className={classes.date}>
            Data:
            <input
              type="date"
              id="date"
              onChange={dateChange}
              onClick={dateChange}
              className={`${classes.inputDate}`}
            />
          </h2>
        </div>
        {isDateFilled && (
          <Fragment>
            <div>
              <h2>
                Custo:
                <input
                  type="text"
                  id="text"
                  value={inputExpense}
                  onChange={expenseChange}
                  className={`${classes.inputExpense}`}
                />
              </h2>
            </div>
            <div>
              <h2>Categoria:</h2>
              <Card>
                <ul className={classes.unorderedList}>
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
                      <p className={classes.paragraph}>Casa</p>
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
                      <p className={classes.paragraph}>Lazer</p>
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
                      <p className={classes.paragraph}>Saúde</p>
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
                      <p className={classes.paragraph}>Educação</p>
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
                      <p className={classes.paragraph}>Alimentação</p>
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
                      <p className={classes.paragraph}>Transporte</p>
                    </div>
                  </li>
                </ul>
              </Card>
            </div>
          </Fragment>
        )}
        {isExpenseFilled && (
          <button className={classes.lastButtons} onClick={onInputHandler}>
            Inserir Despesa
          </button>
        )}
        <div>
          <button className={classes.lastButtons} onClick={onHistoryHandler}>
            Visualizar Despesa
          </button>
        </div>
      </div>
    </>
  );
};

export default Expense;

import React, { useState, useEffect } from "react";

import { expenseActions } from "../store/expense-slice";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { format, addMinutes } from "date-fns";

import Card from "../UI/Card";

import classes from "./Expense.module.css";

import health from "../Icons/checklist.png";
import college from "../Icons/college.png";
import leisure from "../Icons/rocket.png";
import homeIcon from "../Icons/home.png";
import nutrition from "../Icons/clock.png";
import transportation from "../Icons/location.png";

const formatMoney = (value) => {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
  return formatter.format((value / 100).toFixed(2));
};

const Expense = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [data, setData] = useState();
  const [inputExpense, setInputExpense] = useState("");
  const [isIncomeClicked, setIsIncomeClicked] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [localStorageItems, setLocalStorageItems] = useState([]);

  const navigation = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("expenses")) || [];
    setLocalStorageItems(storedItems);
  }, []);

  const handleDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    const adjustedDate = addMinutes(
      selectedDate,
      selectedDate.getTimezoneOffset()
    );
    setSelectedDate(adjustedDate);

    const dateString = format(adjustedDate, "yyyy-MM-dd");

    dispatch(expenseActions.addData(dateString));
    setData(dateString);
  };

  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      dispatch(expenseActions.addCategory(category));
      setSelectedCategory(category);
    }
  };

  const onInputExpenseHandler = (event) => {
    let value = event.target.value.replace(/\D/g, "");
    setInputExpense(formatMoney(value));
    dispatch(expenseActions.addValue(value));
  };

  const onInputHandler = () => {
    // Salvar no localStorage
    const newItem = {
      value: inputExpense,
      data: data,
    };

    const updatedItems = [...localStorageItems, newItem];
    localStorage.setItem("expenses", JSON.stringify(updatedItems));

    // Atualizar o estado
    setLocalStorageItems(updatedItems);

    // Limpar o campo de despesa
    setInputExpense("");
  };

  const onExpenseHandler = () => {
    setIsIncomeClicked(true);
  };

  const onIncomeHandler = () => {
    setIsIncomeClicked(false);
  };

  const onGetBackHandler = () => {
    navigation("/landingPage");
  };

  const onHistoryHandler = () => {
    navigation("/history");
  };

  return (
    <>
      {isIncomeClicked && (
        <div className={classes.financesDiv}>
          <button className={classes.buttonDiv} onClick={onGetBackHandler}>
            Voltar
          </button>
          <div className={classes.alternativeDiv}>
            <button className={classes.expenseBtn}>Custo</button>
            <button className={classes.incomeBtn} onClick={onIncomeHandler}>
              Renda
            </button>
          </div>
          <div>
            <h2 className={classes.data}>
              Data:
              <input
                type="date"
                id="date"
                value={format(selectedDate, "yyyy-MM-dd")}
                onChange={handleDateChange}
                className={`${classes.inputDate}`}
              />
            </h2>
            <h2>
              Custo:
              <input
                type="text"
                id="text"
                value={inputExpense}
                onChange={onInputExpenseHandler}
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
                  onClick={() => handleCategoryClick("casa")}
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
                  onClick={() => handleCategoryClick("lazer")}
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
                  onClick={() => handleCategoryClick("saúde")}
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
                  onClick={() => handleCategoryClick("educação")}
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
                  onClick={() => handleCategoryClick("comida")}
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
                  onClick={() => handleCategoryClick("transporte")}
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
            <div>
              <button className={classes.lastButtons} onClick={onInputHandler}>
                Inserir Despesa
              </button>
              <button
                className={classes.lastButtons}
                onClick={onHistoryHandler}
              >
                Visualizar Despesa
              </button>
            </div>
          </div>
        </div>
      )}
      {!isIncomeClicked && (
        <div className={classes.financesDiv}>
        <button className={classes.buttonDiv} onClick={onGetBackHandler}>
          Voltar
        </button>
        <div className={classes.alternativeDiv}>
          <button className={classes.expenseReverseColorBtn} onClick={onExpenseHandler}>Custo</button>
          <button className={classes.incomeReverseColorBtn} >
            Renda
          </button>
        </div>
        <div>
          <h2 className={classes.data}>
            Data:
            <input
              type="date"
              id="date"
              value={format(selectedDate, "yyyy-MM-dd")}
              onChange={handleDateChange}
              className={`${classes.inputDate}`}
            />
          </h2>
          <h2>
            Custo:
            <input
              type="text"
              id="text"
              value={inputExpense}
              onChange={onInputExpenseHandler}
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
                onClick={() => handleCategoryClick("casa")}
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
                onClick={() => handleCategoryClick("lazer")}
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
                onClick={() => handleCategoryClick("saúde")}
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
                onClick={() => handleCategoryClick("educação")}
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
                onClick={() => handleCategoryClick("comida")}
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
                onClick={() => handleCategoryClick("transporte")}
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
          <div>
            <button className={classes.lastButtons} onClick={onInputHandler}>
              Inserir Despesa
            </button>
            <button
              className={classes.lastButtons}
              onClick={onHistoryHandler}
            >
              Visualizar Despesa
            </button>
          </div>
        </div>
      </div>
      )}
    </>
  );
};

export default Expense;

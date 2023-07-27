import React, { useState, Fragment } from "react";
import classes from "./Income.module.css";

import Card from "../Layout/Card";

import money from "../../Icons/moneyBag.png";
import finance from "../../Icons/finance.png";
import identifier from "../../Icons/id.png";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { format, addMinutes } from "date-fns";

import { incomeActions } from "../../store/income-slice";
import { valueActions } from "../../store/value-slice";

const formatMoney = (value) => {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
  return formatter.format((value / 100).toFixed(2));
};

const Income = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const [date, setDate] = useState("");
  const [input, setInput] = useState(false);
  const [message, setMessage] = useState(true);
  const [isDateFilled, setIsDateFilled] = useState(false);

  const [income, setIncome] = useState("");
  const [warning, setWarning] = useState(false);
  const [isIncomeFilled, setIsIncomeFilled] = useState(false);

  const [category, setCategory] = useState();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isCategoryFilled, setIsCategoryFilled] = useState(false);

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

  const incomeChange = (event) => {
    const value = event.target.value;
    const numericValue = value.replace(/\D/g, "");
    /* 
    / - A barra inicial indica o início da expressão regular.
    \D é um atalho para qualquer caractere que não seja um dígito numérico. Em outras palavras, ele corresponde a qualquer caractere que não seja de 0 a 9.
    / - A barra final indica o fim da expressão regular.
    g - A flag g após a barra final indica uma correspondência global. Ela permite que a expressão regular procure por todas as ocorrências em uma string, em vez de parar na primeira correspondência encontrada.
*/

    if (numericValue.length > 14) {
      setWarning(true);
      setIsIncomeFilled(false);
      setIncome(formatMoney(numericValue));
    } else {
      setWarning(false);
      setIsIncomeFilled(true);
      setIncome(formatMoney(numericValue));
    }
  };

  const onCategoryHandler = (category) => {
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
    const newIncomeItem = {
      value: income,
      date: date,
      category: category,
    };
    const convertedIncome = income.replace(/\D/g, "");

    dispatch(incomeActions.addItem(newIncomeItem));
    dispatch(valueActions.addBalance(convertedIncome));

    setInput(true);
    setTimeout(function () {
      setInput(false);
    }, 3000);

    setIncome("");
    setMessage(true);
    setIsDateFilled(false);
    setIsIncomeFilled(false);
  };

  const onGetBackHandler = () => {
    navigation("/landingPage");
  };

  const onExpenseHandler = () => {
    navigation("/expensePage");
  };

  const onHistoryHandler = () => {
    navigation("/incomeHistoryPage");
  };

  return (
    <>
      {input && (
        <div className={classes.success}>Renda inserida com sucesso</div>
      )}
      <div className={classes.section}>
        <button className={classes.getBack} onClick={onGetBackHandler}>
          Voltar
        </button>
        <div className={classes.alternativeBtnsDiv}>
          <button className={classes.expenseBtn} onClick={onExpenseHandler}>
            Despesa
          </button>
          <button className={classes.incomeBtn}>Renda</button>
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
              <h2 className={classes.income}>
                Renda:
                <input
                  type="text"
                  id="text"
                  value={income}
                  onChange={incomeChange}
                  className={classes.inputIncome}
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
                      selectedCategory === "money" ? classes.selected : ""
                    }`}
                    onClick={() => onCategoryHandler("money")}
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
                      selectedCategory === "id" ? classes.selected : ""
                    }`}
                    onClick={() => onCategoryHandler("id")}
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
                      selectedCategory === "finance" ? classes.selected : ""
                    }`}
                    onClick={() => onCategoryHandler("finance")}
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
        {isCategoryFilled && isIncomeFilled && (
          <button className={classes.btn} onClick={onInputHandler}>
            Inserir Renda
          </button>
        )}
        <div>
          <button className={classes.btn} onClick={onHistoryHandler}>
            Visualizar Despesa
          </button>
        </div>
      </div>
    </>
  );
};

export default Income;

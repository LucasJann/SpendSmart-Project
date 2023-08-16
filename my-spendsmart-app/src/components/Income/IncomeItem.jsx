import React from "react";

import { useDispatch } from "react-redux";

import incomeActions from "../../store/income-slice";
import balanceSlice from "../../store/balance-slice";

import classes from "./IncomeItem.module.css";

import money from "../../Icons/moneyBag.png";
import finance from "../../Icons/finance.png";
import identifier from "../../Icons/id.png";

const ExpenseItem = ({ item }) => {
  const dispatch = useDispatch();

  const { id, value, date, category } = item;
  let image = "";

  const deleteHandler = () => {
    const userConfirmed = window.confirm(
      "Clique em OK para confirmar a exclusão"
    );

    const convertedValue = value.replace(/\D/g, '')


    if (userConfirmed) {
      dispatch(incomeActions.actions.removeItem(id));
      dispatch(balanceSlice.actions.removeBalance(convertedValue))
    }
  };

  switch (category) {
    case "finance":
      image = (
        <>
          <img
            src={finance}
            alt="Icone de um laptop com uma projeção positiva de um gráfico de linha"
            className={classes.img}
          />
        </>
      );
      break;
    case "money":
      image = (
        <>
          <img
            src={money}
            alt="Icone de um saco de dinheiro"
            className={classes.img}
          />
        </>
      );
      break;
    case "id":
      image = (
        <>
          <img src={identifier} alt="Icone de um cracha" className={classes.img} />
        </>
      );
      break;

    default:
      image = <p>Não foi possível encontrar esta categoria</p>;
      break;
  }

  const formattedDate = date.split("-").reverse().join("-");

  return (
    <section className={classes.container}>
      <button className={classes.delete} onClick={deleteHandler}>
        X
      </button>
      <section className={classes.section}>
        <div className={classes.image}>
          <p>{image}</p>
        </div>
        <div className={classes.text}>
          <p>Data:</p>
          <p>Valor:</p>
        </div>
        <div className={classes.values}>
          <p>{formattedDate}</p>
          <p>{value}</p>
        </div>
      </section>
    </section>
  );
};

export default ExpenseItem;

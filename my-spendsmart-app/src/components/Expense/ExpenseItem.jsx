import React from "react";

import { useDispatch } from "react-redux";
import expenseAction from "../../store/expense-slice";

import classes from "./ExpenseItem.module.css";

import health from "../../Icons/checklist.png";
import college from "../../Icons/college.png";
import leisure from "../../Icons/rocket.png";
import homeIcon from "../../Icons/home.png";
import nutrition from "../../Icons/clock.png";
import transportation from "../../Icons/location.png";

const ExpenseItem = ({ item }) => {
  const dispatch = useDispatch();

  const { id, value, date, category } = item;
  let image = "";

  const deleteHandler = () => {
    const userConfirmed = window.confirm(
      "Clique em OK para confirmar a exclusão"
    );

    if (userConfirmed) {
      dispatch(expenseAction.actions.removeItem(id));
    }
  };

  switch (category) {
    case "casa":
      image = (
        <>
          <img src={homeIcon} alt="Icone de uma Casa" className={classes.img} />
        </>
      );
      break;
    case "lazer":
      image = (
        <>
          <img
            src={leisure}
            alt="Icone de um Foguete"
            className={classes.img}
          />
        </>
      );
      break;
    case "saúde":
      image = (
        <>
          <img
            src={health}
            alt="Icone de planilhas médicas"
            className={classes.img}
          />
        </>
      );
      break;
    case "comida":
      image = (
        <>
          <img
            src={nutrition}
            alt="Icone de um Relógio marcando 12:15"
            className={classes.img}
          />
        </>
      );
      break;
    case "educação":
      image = (
        <>
          <img src={college} alt="Icone de um Capelo" className={classes.img} />
        </>
      );
      break;
    case "transporte":
      image = (
        <>
          <img
            src={transportation}
            alt="Icone de um marcador de GPS"
            className={classes.img}
          />
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

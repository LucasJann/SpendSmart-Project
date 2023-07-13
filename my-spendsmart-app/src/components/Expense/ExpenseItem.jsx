import React from "react";

import health from "../../Icons/checklist.png";
import college from "../../Icons/college.png";
import leisure from "../../Icons/rocket.png";
import homeIcon from "../../Icons/home.png";
import nutrition from "../../Icons/clock.png";
import transportation from "../../Icons/location.png";
import classes from "./ExpenseItem.module.css";

const ExpenseItem = ({ item }) => {
  const { value, date, category } = item;
  let image = "";

  switch (category) {
    case "casa":
      image = (
        <>
          <img
            src={homeIcon}
            alt="Icone de uma Casa"
            className={classes.img}
          />
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
          <img
            src={college}
            alt="Icone de um Capelo"
            className={classes.img}
          />
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
  }

  return (
    <div className={classes.div}>
      <div className={classes.category}>
        <p>{image}</p>
      </div>
      <div className={classes.text}>
        <p>Data:</p>
        <p>Valor:</p>
      </div>
      <div className={classes.values}>
        <p>{date}</p>
        <p>{value}</p>
      </div>
    </div>
  );
};

export default ExpenseItem;

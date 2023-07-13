import React from "react";

import classes from "./IncomeItem.module.css";

const IncomeItem = ({ item }) => {
  const { value, date, category } = item;

  return (
    <div className={classes.item}>
      <p>Valor:</p>
      <ul>
        <li>{value}</li>
      </ul>
      <p>Data:</p>
      <ul>
        <li>{date}</li>
      </ul>
      <p>Categoria:</p>
      <ul>
        <li>{category}</li>
      </ul>
    </div>
  );
};

export default IncomeItem;

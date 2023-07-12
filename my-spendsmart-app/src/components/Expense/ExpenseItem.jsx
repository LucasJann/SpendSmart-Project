import React from "react";

import classes from "./ExpenseItem.module.css";

const ExpenseItem = ({ item }) => {
  const { value, date } = item;

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
    </div>
  );
};

export default ExpenseItem;

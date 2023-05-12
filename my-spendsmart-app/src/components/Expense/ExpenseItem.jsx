import React from "react";

import classes from "./ExpenseItem.module.css";

const ExpenseItem = ({ item }) => {
  const { value, date } = item;


  return (
    <div className={classes.itemDiv}>
      <p>Valores:</p>
      <ul>{value}</ul>
      <p>Data:</p>
      <ul>{date}</ul>
    </div>
  );
};

export default ExpenseItem;

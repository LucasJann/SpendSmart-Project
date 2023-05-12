import React from "react";

import classes from "./IncomeItem.module.css";

const IncomeItem = ({ item }) => {
  const { value, date } = item;

  return (
    <div className={classes.item}>
      <p>Valores:</p>
      <ul>{value}</ul>
      <p>Datas:</p>
      <ul>{date}</ul>
    </div>
  );
};

export default IncomeItem;

import React from "react";

import classes from "./Item.module.css";

const Item = ({ item }) => {
  const { value, data } = item;

  console.log(value, data);

  return (
    <div className={classes.item}>
      <p>Valores:</p>
      <ul className={classes.unorderedValue}>{value}</ul>
      <p>Datas:</p>
      <ul className={classes.unorderedValue}>{data}</ul>
    </div>
  );
};

export default Item;

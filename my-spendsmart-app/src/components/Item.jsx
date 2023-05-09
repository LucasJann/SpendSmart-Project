import React, {useState} from "react";

import classes from "./Item.module.css";


const Item = (props) => {
  const [finalValue, setFinalValue] = useState();
  const [finalData, setFinalData] = useState();

  const { value, data } = props;

  console.log(value, data);

  if (value.length > 0) {
    for (let i = 0; i < value.length; i++) {
      let inputValue = value[i];
      setFinalValue(inputValue)
    }
  }

  if (data.length > 0) {
    for (let i = 0; i < data.length; i++) {
      let inputData = data[i];
      setFinalData(inputData);
    }
  }


  return (
    <div className={classes.item}>
      <div className={classes.value}>{finalValue}</div>
      <div className={classes.data}>{finalData}</div>
    </div>
  );
};

export default Item;

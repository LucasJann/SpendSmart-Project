import React, { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { format, addMinutes } from "date-fns";

import Item from "./Item";

import { expenseActions } from "../store/expense-slice";
import classes from "./History.module.css";

const History = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [localStorageItems, setLocalStorageItems] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("expenses")) || [];
    setLocalStorageItems(storedItems);
  }, []);

  const onClickHandler = () => {
    navigation("/myfinances");
  };

  const handleDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    const adjustedDate = addMinutes(
      selectedDate,
      selectedDate.getTimezoneOffset()
    );
    setSelectedDate(adjustedDate);

    const dateString = format(adjustedDate, "yyyy-MM-dd");
    dispatch(expenseActions.addData(dateString));
  };

  return (
    <div className={classes.historyDiv}>
      <button className={classes.buttonDiv} onClick={onClickHandler}>
        Voltar
      </button>
      <h2>
        Data Inicial:
        <input
          type="date"
          id="date"
          value={format(selectedDate, "yyyy-MM-dd")}
          onChange={handleDateChange}
          className={`${classes.inputDate}`}
        />
      </h2>
      <h2>
        Data Final:
        <input
          type="date"
          id="date"
          value={format(selectedDate, "yyyy-MM-dd")}
          onChange={handleDateChange}
          className={`${classes.inputDate}`}
        />
      </h2>

      <h3>Lançamentos Recentes:</h3>
      {localStorageItems.length > 0 ? (
        localStorageItems.map((item, index) => <Item key={index} item={item} />)
      ) : (
        <p>Nenhum item disponível.</p>
      )}
    </div>
  );
};

export default History;

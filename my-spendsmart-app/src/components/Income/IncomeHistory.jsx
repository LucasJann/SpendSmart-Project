import React, { useState, useEffect } from "react";
import classes from "./IncomeHistory.module.css";

import IncomeItem from "./IncomeItem";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { format, addMinutes } from "date-fns";

import { incomeActions } from "../../store/income-slice";

const IncomeHistory = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [localStorageIncomeItems, setLocalStorageIncomeItems] = useState([]);

  const navigation = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("incomes")) || [];
    setLocalStorageIncomeItems(storedItems);
  }, []);

  const handleDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    const adjustedDate = addMinutes(selectedDate, selectedDate.getTimezoneOffset());
    const dateString = format(adjustedDate, "yyyy-MM-dd");
    dispatch(incomeActions.addDate(dateString));
    setSelectedDate(adjustedDate);  
  };

  const onGetBackHandler = () => {
    navigation("/incomePage");
  };

  return (
    <div className={classes.incomeHistoryDiv}>
      <button className={classes.getBackButton} onClick={onGetBackHandler}>
        Voltar
      </button>
      <h2>
        Data Inicial:
        <input
          type="date"
          id="date"
          value={selectedDate.toISOString().split("T")[0]}
          onChange={handleDateChange}
          className={`${classes.inputDate}`}
        />
      </h2>
      <h2>
        Data Final:
        <input
          type="date"
          id="date"
          value={selectedDate.toISOString().split("T")[0]}
          onChange={handleDateChange}
          className={`${classes.inputDate}`}
        />
      </h2>

      <h3>Lançamentos Recentes:</h3>
      {localStorageIncomeItems.length > 0 ? (
        localStorageIncomeItems.map((item, index) => (
          <IncomeItem key={index} item={item} />
        ))
      ) : (
        <p className={classes.message}>Nenhum item disponível.</p>
      )}
    </div>
  );
};

export default IncomeHistory;

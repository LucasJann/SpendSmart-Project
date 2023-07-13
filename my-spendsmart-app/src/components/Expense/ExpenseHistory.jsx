import React, { useState } from "react";
import classes from "./ExpenseHistory.module.css";

import ExpenseItem from "./ExpenseItem";

import { addMinutes } from "date-fns";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ExpenseHistory = () => {
  const navigation = useNavigate();

  const [selectedStartDate, setSelectedFirstDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());

  const releases = useSelector((state) => state.expense.items);

  const handleStartDateChange = (event) => {
    const selectedStartDate = new Date(event.target.value);

    if (isNaN(selectedStartDate)) {
      return;
    }

    const adjustedDate = addMinutes(
      selectedStartDate,
      selectedStartDate.getTimezoneOffset()
    );
    setSelectedFirstDate(adjustedDate);
  };

  const handleEndDateChange = (event) => {
    const selectedEndDate = new Date(event.target.value);

    if (isNaN(selectedEndDate)) {
      return;
    }

    const adjustedDate = addMinutes(
      selectedEndDate,
      selectedEndDate.getTimezoneOffset()
    );

    setSelectedEndDate(adjustedDate);
  };

  const onGetBackHandler = () => {
    navigation("/expensePage");
  };

  return (
    <section className={classes.section}>
      <button className={classes.getBack} onClick={onGetBackHandler}>
        Voltar
      </button>
      <h2>
        Data Inicial:
        <input
          type="date"
          id="date"
          value={selectedStartDate.toISOString().split("T")[0]}
          onChange={handleStartDateChange}
          className={classes.inputDate}
        />
      </h2>
      <h2>
        Data Final:
        <input
          type="date"
          id="date"
          value={selectedEndDate.toISOString().split("T")[0]}
          onChange={handleEndDateChange}
          className={classes.inputDate}
        />
      </h2>
      <h3>Lançamentos Recentes:</h3>
      {releases.length > 0 ? (
        releases.map((item, index) => <ExpenseItem key={index} item={item} />)
      ) : (
        <p className={classes.message}>Nenhum item disponível.</p>
      )}
    </section>
  );
};

export default ExpenseHistory;

import React, { useState } from "react";

import classes from "./Calendar.module.css";

import { useDispatch } from "react-redux";
import { dataActions } from "../store/inputData-slice";
import { expenseActions } from "../store/expense-slice";
import { format, addMinutes } from "date-fns"; 

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const dispatch = useDispatch();

  const handleDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    // Ajuste a data adicionando o deslocamento de fuso horário
    const adjustedDate = addMinutes(selectedDate, selectedDate.getTimezoneOffset());
    setSelectedDate(adjustedDate);

    const dateString = format(adjustedDate, "yyyy-MM-dd");
    
    dispatch(expenseActions.addData(dateString));
    dispatch(dataActions.addData(dateString));
  };

  return (
    <input
      type="date"
      id="date"
      value={format(selectedDate, "yyyy-MM-dd")}
      onChange={handleDateChange}
      className={`${classes.inputDate}`}
    />
  );
};

export default Calendar;
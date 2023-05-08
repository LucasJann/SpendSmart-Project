import React, { useState } from "react";
import { format } from "date-fns";

import classes from "./Calendar.module.css";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    setSelectedDate(selectedDate);
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

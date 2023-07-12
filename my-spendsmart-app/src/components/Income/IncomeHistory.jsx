import classes from "./IncomeHistory.module.css";
import IncomeItem from "./IncomeItem";

import { addMinutes } from "date-fns";

import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const IncomeHistory = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const release = useSelector((state) => state.income.items)
  
  const navigation = useNavigate();

  const handleDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    const adjustedDate = addMinutes(selectedDate, selectedDate.getTimezoneOffset());
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
      {release.length > 0 ? (
        release.map((item, index) => (
          <IncomeItem key={index} item={item} />
        ))
      ) : (
        <p className={classes.message}>Nenhum item disponível.</p>
      )}
    </div>
  );
};

export default IncomeHistory;

import classes from "./IncomeHistory.module.css";
import IncomeItem from "./IncomeItem";

import { addMinutes } from "date-fns";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { incomeActions } from "../../store/income-slice";

const IncomeHistory = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());

  const releases = useSelector((state) => state.income.items);
  const filteredReleases = useSelector((state) => state.income.filteredItems);
  const isFiltering = useSelector((state) => state.income.isFiltering);

  const startDateChange = (event) => {
    const selectedStartDate = new Date(event.target.value);

    if (isNaN(selectedStartDate)) {
      return;
    }

    const adjustedDate = addMinutes(
      selectedStartDate,
      selectedStartDate.getTimezoneOffset()
    );
    setSelectedStartDate(adjustedDate);
  };

  const endDateChange = (event) => {
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

  const searchHandler = () => {
    const formattedStartDate = selectedStartDate.toISOString().split("T")[0];
    const formattedEndDate = selectedEndDate.toISOString().split("T")[0];
  
    console.log("formattedStartDate:", formattedStartDate);
    console.log("formattedEndDate:", formattedEndDate);
  
    const newDate = {
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    };
  
    dispatch(incomeActions.dataFilter(newDate));
  };

  const onGetBackHandler = () => {
    navigation("/incomePage");
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
          onChange={startDateChange}
          className={classes.inputDate}
        />
      </h2>
      <h2>
        Data Final:
        <input
          type="date"
          id="date2"
          value={selectedEndDate.toISOString().split("T")[0]}
          onChange={endDateChange}
          className={classes.inputDate}
        />
      </h2>
      <button onClick={searchHandler}>Procurar</button>
      <h3>Lançamentos Recentes:</h3>
      {isFiltering && filteredReleases.length > 0
        ? filteredReleases.map((item, index) => (
            <IncomeItem key={index} item={item} />
          ))
        : releases.map((item, index) => <IncomeItem key={index} item={item} />)}
    </section>
  );
};

export default IncomeHistory;

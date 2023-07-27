import classes from "./ExpenseHistory.module.css";
import ExpenseItem from "./ExpenseItem";

import { addMinutes } from "date-fns";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ExpenseHistory = () => {


  const navigation = useNavigate();

  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());

  const [itemsFiltered, setItems] = useState([]);
  const [isItemsFiltered, setIsItemsFiltered] = useState(false);

  const [message, setMessage] = useState(false);
  const [isSearch, setIsSearch] = useState(false);

  const releases = useSelector((state) => state.expense.items);

  useEffect(() => {
    const formattedStartDate = selectedStartDate.toISOString().split("T")[0];
    const formattedEndDate = selectedEndDate.toISOString().split("T")[0];

    const filteredItems = releases.filter((items) => {
      const date = items.date;

      if (date >= formattedStartDate && date <= formattedEndDate) {
        return true;
      } else {
        return false;
      }
    });
    setItems(filteredItems)
  }, [releases]);

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

    const filteredItems = releases.filter((items) => {
      const date = items.date;

      if (date >= formattedStartDate && date <= formattedEndDate) {
        return true;
      } else {
        return false;
      }
    });

    if (filteredItems.length >= 0) {
      filteredItems.length === 0 ? setMessage(true) : setMessage(false);
      setItems(filteredItems);
      setIsItemsFiltered(true);
    } else {
      setIsItemsFiltered(false);
    }
    setIsSearch(true);
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
      <button className={classes.searchBtn} onClick={searchHandler}>
        Procurar
      </button>
      {isSearch && (
        <h3 className={classes.releases}> Histórico de Lançamentos por Data</h3>
      )}
      {message && (
        <p className={classes.message}>
          Não há registros inseridos na data específicada
        </p>
      )}
      {!isSearch && <h3 className={classes.allReleasesText}>Todos Lançamentos</h3>}
      {isItemsFiltered
        ? itemsFiltered.map((item, index) => <ExpenseItem key={index} item={item} />)
        : releases.map((item, index) => (
            <ExpenseItem key={index} item={item} />
          ))}
      {releases.length === 0 && !message && (
        <p className={classes.releaseMessage}>Não há lançamentos registrados</p>
      )}
    </section>
  );
};

export default ExpenseHistory;

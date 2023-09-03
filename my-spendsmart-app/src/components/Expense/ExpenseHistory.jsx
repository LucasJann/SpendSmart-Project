import classes from "./ExpenseHistory.module.css";

import { useSelector } from 'react-redux'
import { addMinutes } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import ExpenseItem from "./ExpenseItem";

const ExpenseHistory = () => {
  const navigation = useNavigate();

  const itemsUpdated = useSelector((state) => state.call.caller);

  const storedUser = localStorage.getItem('foundUser');
  const storedUserJSON = JSON.parse(storedUser);

  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());

  const [noItems, setNoItems] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [resetStates, setResetStates] = useState(true);
  const [isFilteredItems, setIsFilteredItems] = useState(false);
  const [filteredItemsUpdated, setFilteredItemsUpdated] = useState(false);

  useEffect(() => {
    const expenseJSON = localStorage.getItem('foundUser');
    const expenseStorage = JSON.parse(expenseJSON);

    const newFilteredItems = expenseStorage.expenseItems;

    const formattedStartDate = selectedStartDate.toISOString().split("T")[0];
    const formattedEndDate = selectedEndDate.toISOString().split("T")[0];

    const filteredItems = newFilteredItems.filter((items) => {
      const date = items.date;

      if (date >= formattedStartDate && date <= formattedEndDate) {
        return true;
      } else {
        return false;
      }
    });

    if (isSearch) {
      if (filteredItems.length === 0) {
        setIsSearch(true);
        setNoItems(true);
        setFilteredItems(filteredItems);
      } else {
        setIsSearch(true);
        setNoItems(false);
        setFilteredItems(filteredItems);
      }
    }
  }, [filteredItemsUpdated]);

  useEffect(() => {
    if (items.length === 0) {
      setIsSearch(false);
      setItems(items);
    } else {
      setIsSearch(true);
      setItems(items);
    }
  }, [resetStates]);

  useEffect(() => {
    if (storedUserJSON.expenseItems[0] === "") {
      setItems([]);
      setFilteredItems([]);
      setIsFilteredItems(false);
      setResetStates(!resetStates);
    } else {
      setItems(storedUserJSON.expenseItems);
      setFilteredItemsUpdated(!filteredItemsUpdated);
    }
  }, [itemsUpdated]);

  const startDateChange = (event) => {
    const selectedStartDateValue = new Date(event.target.value);

    if (isNaN(selectedStartDateValue)) {
      return;
    }

    const adjustedDate = addMinutes(
      selectedStartDateValue,
      selectedStartDateValue.getTimezoneOffset()
    );
    setSelectedStartDate(adjustedDate);
  };

  const endDateChange = (event) => {
    const selectedEndDateValue = new Date(event.target.value);

    if (isNaN(selectedEndDateValue)) {
      return;
    }

    const adjustedDate = addMinutes(
      selectedEndDateValue,
      selectedEndDateValue.getTimezoneOffset()
    );
    setSelectedEndDate(adjustedDate);
  };

  const onSearchHandler = () => {
    const formattedStartDate = selectedStartDate.toISOString().split("T")[0];
    const formattedEndDate = selectedEndDate.toISOString().split("T")[0];

    const filteredItems = items.filter((items) => {
      const date = items.date;

      if (date >= formattedStartDate && date <= formattedEndDate) {
        return true;
      } else {
        return false;
      }
    });

    if (filteredItems.length >= 0) {
      if (filteredItems.length === 0) {
        setNoItems(true);
      } else {
        setNoItems(false);
      }
      setFilteredItems(filteredItems);
      setIsFilteredItems(true);
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
      <button className={classes.searchBtn} onClick={onSearchHandler}>
        Procurar
      </button>
      {isSearch && (
        <h3 className={classes.filteredReleases}>
          Histórico de Lançamentos por Data
        </h3>
      )}
      {!isSearch && <h3 className={classes.allReleases}>Todos Lançamentos</h3>}
      {isSearch && noItems && (
        <p className={classes.message}>
          Não há registros inseridos na data específicada
        </p>
      )}

      {isFilteredItems
        ? filteredItems.map((item, index) => (
            <ExpenseItem key={index} item={item} />
          ))
        : items.map((item, index) => <ExpenseItem key={index} item={item} />)}
      {items.length === 0 && !isSearch && (
        <p className={classes.releasesHistory}>
          Não há lançamentos registrados
        </p>
      )}
    </section>
  );
};

export default ExpenseHistory;

import { addMinutes } from "date-fns";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import classes from "./IncomeHistory.module.css";

import IncomeItem from "./IncomeItem";

const IncomeHistory = () => {
  const navigation = useNavigate();

  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());

  const [noItems, setNoItems] = useState(false);
  const [resetStates, setResetStates] = useState(true);
  const [isSearch, setIsSearch] = useState(false);
  const [isFilteredItems, setIsFilteredItems] = useState(false);
  const [filteredItemsUpdated, setFilteredItemsUpdated] = useState(false);


  const storedUser = localStorage.getItem('foundUser');
  const storedUserJSON = JSON.parse(storedUser);

  const itemsUpdated = useSelector((state) => state.call.caller);

  useEffect(() => {
    const incomeJSON = localStorage.getItem('foundUser');
    const incomeStorage = JSON.parse(incomeJSON);

    const newFilteredItems = incomeStorage.incomeItems;

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
    if (storedUserJSON.incomeItems[0] === "") {
      setItems([]);
      setFilteredItems([]);
      setIsFilteredItems(false);
      setResetStates(!resetStates);
    } else {
      setItems(storedUserJSON.incomeItems);
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
            <IncomeItem key={index} item={item} />
          ))
        : items.map((item, index) => <IncomeItem key={index} item={item} />)}
      {items.length === 0 && !isSearch && (
        <p className={classes.releasesHistory}>
          Não há lançamentos registrados
        </p>
      )}
    </section>
  );
};

export default IncomeHistory;

import classes from "./IncomeHistory.module.css";
import IncomeItem from "./IncomeItem";

import { addMinutes } from "date-fns";

import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const IncomeHistory = () => {
  const navigation = useNavigate();

  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());

  const [items, setItems] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [message, setMessage] = useState(false)
  const [isItemsFiltered, setIsItemsFiltered] = useState(false);


  const releases = useSelector((state) => state.income.items);

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
      }
      return false;
    });

    if (filteredItems.length >= 0) {
      filteredItems.length === 0 ? setMessage(true) : setMessage(false)
      setItems(filteredItems);
      setIsItemsFiltered(true);
    } else {
      setIsItemsFiltered(false);
    }
    setIsSearch(true)
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
      <button onClick={searchHandler} className={classes.searchBtn}>Procurar</button>
      {isSearch && <h3 className={classes.releases}> Histórico</h3>}
      {!isSearch && <h3 className={classes.historic}>Todos Lançamentos</h3>}
      {message && (
        <p className={classes.paragraph}>
          Não há registros inseridos na data específicada
        </p>
      )}
      {isItemsFiltered
        ? items.map((item, index) => <IncomeItem key={index} item={item} />)
        : releases.map((item, index) => <IncomeItem key={index} item={item} />)}
    </section>
  );
};

export default IncomeHistory;

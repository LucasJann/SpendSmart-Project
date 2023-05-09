import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Card from "../UI/Card";

import classes from "./History.module.css";

import Calendar from "./Calendar";

import Item from "./Item";

const History = () => {
  const navigation = useNavigate();

  const value = useSelector((state) => state.inputValue.items);
  const data = useSelector((state) => state.inputData.items);

  const onClickHandler = () => {
    navigation("/myfinances");
  };


  const items = [
    {
      id: null,
      value: value,
      data: data,
    },
  ]

  console.log(items)
  return (
    <div className={classes.historyDiv}>
      <button className={classes.buttonDiv} onClick={onClickHandler}>
        Voltar
      </button>
      <h2>
        Data Inicial: <Calendar />
      </h2>
      <h2>
        Data Final: <Calendar />
      </h2>

      <h3>Lançamentos Recentes:</h3>
      <Card>
        {items.map((item, index) => (
          <Item key={index} value={item.value} data={item.data} />
        ))}
      </Card>
    </div>
  );
};

export default History;







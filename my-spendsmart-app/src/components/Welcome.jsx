import React, { useState } from "react";

import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { valueAction } from "../store/value-slice";

import classes from "./Welcome.module.css";
import image from "../Imgs/logo.png";

const formatMoney = (value) => {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });

  return formatter.format((value / 100).toFixed(2));
};

const Welcome = () => {
  const [inputValue, setInputValue] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    let value = event.target.value.replace(/\D/g, "");
    setInputValue(formatMoney(value));
  };

  const onClickHandler = () => {
    dispatch(valueAction.number(inputValue))
    localStorage.setItem('initialBalance', inputValue);
    navigate("/profile");
  };

  return (
    <div className={classes.welcomeDiv}>
      <h1 className={classes.title}>SpendSmart</h1>
      <img src={image} className={classes.logo} alt="A logo" />
      <h2 className={classes.welcome}>Bem-vindo</h2>
      <h3 className={classes.balance}>Informe o seu saldo inicial</h3>
      <input
        type="text"
        value={inputValue}
        onChange={onChangeHandler}
        className={classes.input}
      />
      <button className={classes.welcomeButton} onClick={onClickHandler}>
        Entrar
      </button>
    </div>
  );
};

export default Welcome;

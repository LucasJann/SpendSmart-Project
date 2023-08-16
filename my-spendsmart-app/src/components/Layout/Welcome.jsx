import React, { useState } from "react";

import image from "../../Imgs/logo.png";
import classes from "./Welcome.module.css";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { balanceActions } from "../../store/balance-slice";

const formatMoney = (value) => {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });

  return formatter.format((value / 100).toFixed(2));
};

const Welcome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [initialBalance, setInitialBalance] = useState("");

  const onChangeHandler = (event) => {
    let value = event.target.value.replace(/\D/g, ""); 
    setInitialBalance(formatMoney(value));
  };
  
  const onClickHandler = () => {
    const convertedValue = initialBalance.replace(/\D/g, "")
    dispatch(balanceActions.addBalance(convertedValue));
    navigate("/landingPage");
  };

  return (
    <div className={classes.welcomeDiv}>
      <h1 className={classes.welcometitle}>SpendSmart</h1>
      <img src={image} className={classes.welcomeLogo} alt="A logo" />
      <h2 className={classes.welcomeText}>Bem-vindo</h2>
      <h3 className={classes.welcomeInfo}>Informe o seu saldo inicial</h3>
      <input
        type="text"
        value={initialBalance}
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

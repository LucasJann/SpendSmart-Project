import React, { useState } from "react";

import pic from "../../Imgs/pic.png";
import classes from "./Profile.module.css";

import { valueActions } from "../../store/value-slice";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const formatMoney = (value) => {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });

  return formatter.format((value / 100).toFixed(2));
};

const Profile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const valueState = useSelector((state) => state.value.balance);
  const convertedValue = formatMoney(valueState);

  const [newValue, setNewValue] = useState(convertedValue);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [isBalanceChanged, setIsBalanceChanged] = useState();

  const onValueChange = (event) => {
    const value = event.target.value;
    const numericValue = value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos

    if (numericValue.length > 14) {
      setNewValue(formatMoney(numericValue));
    } else {
      setNewValue(formatMoney(numericValue));
    }
  };

  const onEditButton = () => {
    setIsDisabled(false);
    setIsEditClicked(true);
    setIsBalanceChanged(true);
  };

  const onConfirmButton = () => {
    setIsDisabled(true);
    setIsEditClicked(false);
    dispatch(valueActions.upgrade(newValue.replace(/\D/g, "")));
  };

  const onGetBackHandler = () => {
    navigation("/landingPage");
  };

  return (
    <section className={classes.section}>
      <div className={classes.buttonDiv}>
        <button onClick={onGetBackHandler} className={classes.getBackButton}>
          Voltar
        </button>
      </div>
      <img src={pic} className={classes.profileImg} alt="A profile" />
      <h2 className={classes.profileName}>Lucas Jan </h2>
      <h3 className={classes.profileInfo}> Seu saldo bruto</h3>
      <input
        value={isBalanceChanged ? newValue : convertedValue}
        disabled={isDisabled}
        onChange={onValueChange}
      />
      {!isEditClicked && (
        <button onClick={onEditButton} className={classes.editButton}>
          Editar Saldo
        </button>
      )}
      {isEditClicked && (
        <button onClick={onConfirmButton} className={classes.editButton}>
          Confirmar
        </button>
      )}
    </section>
  );
};

export default Profile;

import React, { useState } from "react";

import pic from "../../Imgs/pic.png";
import classes from "./Profile.module.css";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { valueActions } from "../../store/value-slice";

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

  const [isDisabled, setIsDisabled] = useState(true);
  const [isEditClicked, setIsEditClicked] = useState(false);

  const valueState = useSelector((state) => state.value.money);
  
  const onValueChange = (event) => {
    const value = event.target.value.replace(/\D/g, ""); // Remove qualquer caractere que não seja um dígito
    const formattedBalance = formatMoney(value.replace(/\D/g, ""));
    dispatch(valueActions.addBalance(formattedBalance)); // Atualiza o Redux com o valor numérico
  };

  const onEditButton = () => {
    setIsDisabled(false);
    setIsEditClicked(true);
  };

  const onConfirmButton = () => {
    setIsDisabled(true);
    setIsEditClicked(false);
  };

  const onGetBackHandler = () => {
    navigation("/landingPage");
  };


  return (
    <div className={classes.div}>
      <div className={classes.buttonDiv}>
        <button onClick={onGetBackHandler} className={classes.getBackButton}>
          Voltar
        </button>
      </div>
      <img src={pic} className={classes.profileImg} alt="A profile" />
      <h2 className={classes.profileName}>Lucas Jan </h2>
      <h3 className={classes.balanceInfo}> Seu saldo bruto</h3>
      <input value={valueState} disabled={isDisabled} onChange={onValueChange} />
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
    </div>
  );
};

export default Profile;

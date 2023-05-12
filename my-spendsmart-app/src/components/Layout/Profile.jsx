import React, { useState, useEffect } from "react";
import classes from "./Profile.module.css";

import pic from "../../Imgs/pic.png";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const [isDisabled, setIsDisabled] = useState(true);
  const [editedBalance, setEditedBalance] = useState("");
  const [isEditClicked, setIsEditClicked] = useState(false);

  const storedValue = localStorage.getItem("initialBalance");
  const valueState = useSelector((state) => state.value.value);
  const storage = valueState === 0 ? storedValue : valueState;


  useEffect(() => {
    const formattedBalance = formatMoney(storage); // Formata o valor inicial antes de atribuí-lo ao estado
    setEditedBalance(formattedBalance);
  }, [storage]);

  const onClickHandler = () => {
    navigation("/landingPage");
  };

  const onEditButton = () => {
    setIsDisabled(false);
    setIsEditClicked(true);
  };

  const onConfirmButton = () => {
    setIsDisabled(true);
    setIsEditClicked(false);
  };

  const onValueChange = (event) => {
    const value = event.target.value.replace(/\D/g, ""); // Remove qualquer caractere que não seja um dígito
    const formattedBalance = formatMoney(value.replace(/\D/g, ""));
    setEditedBalance(formattedBalance);
    dispatch(valueActions.addBalance(formattedBalance)); // Atualiza o Redux com o valor numérico
    localStorage.setItem("initialBalance", formattedBalance); // Atualiza o localStorage com o valor numérico
  };

  return (
    <div className={classes.div}>
      <div className={classes.buttonDiv}>
        <button onClick={onClickHandler} className={classes.getBackButton}>
          Voltar
        </button>
      </div>
      <img src={pic} className={classes.profileImg} alt="A profile" />
      <h2 className={classes.profileName}>Lucas Jan</h2>
      <h3 className={classes.balanceInfo}> Seu saldo bruto</h3>
      <input value={storage} disabled={isDisabled} onChange={onValueChange} />
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

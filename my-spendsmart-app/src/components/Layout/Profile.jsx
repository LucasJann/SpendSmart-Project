import React, { useEffect, useState } from "react";

import axios from "axios";

import profileImage from "../../Imgs/profile_undefined.jpg";
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

  const loggedUserJSON = localStorage.getItem("foundUser");
  const loggedUser = JSON.parse(loggedUserJSON);

  const valueState = useSelector((state) => state.value.balance);
  const convertedValue = formatMoney(valueState);

  const [image, setImage] = useState('')
  const [isLogged, setIsLogged] = useState(false);
  const [newValue, setNewValue] = useState(convertedValue);
  const [isDisabled, setIsDisabled] = useState(true);
  const [responseData, setResponseData] = useState([]);
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [isBalanceChanged, setIsBalanceChanged] = useState();
  const [selectorIsNeeded, setSelectorIsNeeded] = useState(false);


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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://react-http-f8211-default-rtdb.firebaseio.com/logins.json"
        );

        if (!response.ok) {
          throw new Error("Algo deu errado!");
        }

        const responseData = await response.json();

        setResponseData(Object.values(responseData));
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();

    const isUserLogged = responseData.some(
      (item) => item.user.email === loggedUser.user.email
    );
    setIsLogged(isUserLogged);
  }, [loggedUser, responseData]);

  const onImageHandler = () => {
    setSelectorIsNeeded(true);
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("image", image);
  
    try {
      const response = await axios.post("http://localhost:5000/uploadImage", formData); // Altere a URL para a porta correta (5000)
      console.log(response.data); // Você pode lidar com a resposta do backend aqui
    } catch (error) {
      console.error("Erro ao enviar imagem:", error);
    }
  };

  return (
    <section className={classes.section}>
      <div className={classes.buttonDiv}>
        <button onClick={onGetBackHandler} className={classes.getBackButton}>
          Voltar
        </button>
      </div>
      <img
        src={profileImage}
        className={classes.profileImg}
        alt="profile pic"
        onClick={onImageHandler}
      />
     {selectorIsNeeded && (
        <form onSubmit={formSubmitHandler}>
          <input
            className={classes.profileSelector}
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <button>Ok</button>
        </form>
      )}
      <div>
        {isLogged && loggedUser && (
          <div>
            <h2 className={classes.profileUserName}>
              {loggedUser.user.name} {loggedUser.user.lastName}
            </h2>
          </div>
        )}
        <input
          value={isBalanceChanged ? newValue : convertedValue}
          disabled={isDisabled}
          onChange={onValueChange}
          className={classes.profileInput}
        />
      </div>
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

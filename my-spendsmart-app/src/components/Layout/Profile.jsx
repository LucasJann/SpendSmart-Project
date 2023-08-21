import React, { useEffect, useState } from "react";
import classes from "./Profile.module.css";

import axios from "axios";
import undefinedImage from "../../Imgs/profile_undefined.jpg";

import { balanceActions } from "../../store/balance-slice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

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

  const storedUser = localStorage.getItem("foundUser");
  const loggedUser = JSON.parse(storedUser); //JSON.parse <=== Converte JSON em um Objeto

  const [balance, setBalance] = useState("");

  const [key, setKey] = useState();
  const [image, setImage] = useState(loggedUser.image);
  const [storedImage, setStoredImage] = useState();
  const [selectedImage, setSelectedImage] = useState("");

  const [isChecked, setIsChecked] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [isBalanceChanged, setIsBalanceChanged] = useState(false);

  useEffect(() => {
    const fetchNewData = async () => {
      console.log("hey");
      const newResponse = await fetch(
        "https://react-http-f8211-default-rtdb.firebaseio.com/logins.json"
      );

      if (!newResponse.ok) {
        throw new Error("Algo deu errado!");
      }

      const newResponseData = await newResponse.json();

      const storedUserJSON = localStorage.getItem("foundUser");
      const storedUser = JSON.parse(storedUserJSON);

      const user = Object.values(newResponseData).find(
        (user) => user.email === storedUser.email
      );

      const loggedUserJSON = JSON.stringify(user);
      localStorage.setItem("foundUser", loggedUserJSON);

      const updatedJSON = localStorage.getItem("foundUser");
      const updated = JSON.parse(updatedJSON);

      setBalance(updated.balance);
      // dispatch(balanceActions.upgrade(storedUser.balance));
    };
    fetchNewData();
  }, [isBalanceChanged, dispatch]);

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

        const user = Object.values(responseData).find(
          (user) => user.email === loggedUser.email
        );

        if (loggedUser && loggedUser.hasOwnProperty("image")) {
          setStoredImage(user.image);
          setIsChecked(true);
        } else {
          setIsChecked(false);
        }

        if (user) {
          const userKey = Object.keys(responseData).find(
            (key) => responseData[key].email === loggedUser.email
          );
          setKey(userKey);
        } else {
          console.log("Usuário não encontrado");
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [loggedUser]);

  const onGetBackHandler = () => {
    navigation("/landingPage");
  };

  const onImageHandler = () => {
    setIsImageChanged(true);
  };

  const onImageSubmitHandler = async (e) => {
    e.preventDefault();
    setIsImageChanged(false);

    if (!selectedImage) {
      console.error("Nenhuma imagem selecionada");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const response = await axios.post(
        "http://localhost:5000/uploadImage",
        formData
      );

      const image = response.data.message.path;
      setImage(image);

      const updatedUserData = {
        email: loggedUser.email,
        id: loggedUser.id,
        lastName: loggedUser.lastName,
        name: loggedUser.name,
        password: loggedUser.password,
        image: image,
        balance: balance,
        expenseItems: loggedUser.expenseItems,
        incomeItems: loggedUser.incomeItems,
      };

      try {
        await fetch(
          `https://react-http-f8211-default-rtdb.firebaseio.com/logins/${key}.json`,
          {
            method: "PUT",
            body: JSON.stringify(updatedUserData),
          }
        );

        const newResponse = await fetch(
          "https://react-http-f8211-default-rtdb.firebaseio.com/logins.json"
        );

        if (!newResponse.ok) {
          throw new Error("Algo deu errado!");
        }

        const newResponseData = await newResponse.json();

        const user = Object.values(newResponseData).find(
          (user) => user.email === loggedUser.email
        );

        const loggedUserJSON = JSON.stringify(user);
        localStorage.setItem("foundUser", loggedUserJSON);
      } catch {}
    } catch (error) {
      console.error("Erro ao enviar imagem:", error);
    }
    setIsChecked(true);
  };

  const inputChange = (e) => {
    const event = e.target.files[0]; // Acessa a imagem selecionada
    setSelectedImage(event);
  };

  const balanceHandler = (event) => {
    const value = event.target.value;
    const numericValue = value.replace(/\D/g, ""); 

    if (numericValue.length > 14) {
      setBalance(formatMoney(numericValue));
    } else {
      setBalance(formatMoney(numericValue));
    }
  };

  const onEditButton = () => {
    setIsDisabled(false);
    setIsEditClicked(true);
  };

  const onConfirmButton = () => {
    setIsDisabled(true);
    setIsEditClicked(false);

    const unformattedBalance = balance.replace(/\D/g, "");
    dispatch(balanceActions.upgrade(unformattedBalance));

    const newBalance = async () => {
      const updatedUserData = {
        email: loggedUser.email,
        id: loggedUser.id,
        lastName: loggedUser.lastName,
        name: loggedUser.name,
        password: loggedUser.password,
        image: image,
        expenseItems: loggedUser.expenseItems,
        incomeItems: loggedUser.incomeItems,
        balance: balance,
      };

      try {
        await fetch(
          `https://react-http-f8211-default-rtdb.firebaseio.com/logins/${key}.json`,
          {
            method: "PUT",
            body: JSON.stringify(updatedUserData),
          }
        );
      } catch (error) {
        console.error(error);
      }
      setIsBalanceChanged(true);
    };

    newBalance();
  };

  return (
    <section className={classes.section}>
      <div className={classes.buttonDiv}>
        <button onClick={onGetBackHandler} className={classes.getBackButton}>
          Voltar
        </button>
      </div>
      {isChecked && (
        <div className={classes.profileContainer}>
          <img
            src={`http://localhost:5000/uploads/${image || storedImage}`}
            className={classes.profileImg}
            alt="profile"
            onClick={onImageHandler}
          />
        </div>
      )}
      {!isChecked && (
        <div className={classes.profileContainer}>
          <img
            src={undefinedImage}
            className={classes.profileImg}
            alt="profile undefined"
            onClick={onImageHandler}
          />
        </div>
      )}
      {isImageChanged && (
        <form onSubmit={onImageSubmitHandler}>
          <input
            className={classes.profileSelector}
            type="file"
            onChange={inputChange}
          />
          <button className={classes.okButton}>Ok</button>
        </form>
      )}
      <div>
        {loggedUser && (
          <div>
            <h2 className={classes.profileUserName}>
              {loggedUser.name} {loggedUser.lastName}
            </h2>
          </div>
        )}
        <input
          value={balance === "0" ? "R$0,00" : balance}
          disabled={isDisabled}
          onChange={balanceHandler}
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

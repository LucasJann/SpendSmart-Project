import React, { useEffect, useState } from "react";
import classes from "./Profile.module.css";

import axios from "axios";
import undefinedImage from "../../Imgs/profile_undefined.jpg";

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

  const storedUserJSON = localStorage.getItem('foundUser');
  const loggedUser = JSON.parse(storedUserJSON);

  const [balance, setBalance] = useState("");

  const [key, setKey] = useState();
  const [image, setImage] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  const [isDisabled, setIsDisabled] = useState(true);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [styleDisabled, setStyleDisabled] = useState(true);
  const [inputDisabled, setInputDisabled] = useState(true);

  const [isChecked, setIsChecked] = useState(false);
  const [imageChanged, setImageChanged] = useState(false);
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [balanceChanged, setBalanceChanged] = useState(false);
  const [isSwitchClicked, setIsSwitchClicked] = useState(false);
  const [isBalanceChanged, setIsBalanceChanged] = useState(false);
  const [convertBtnDisabled, setConvertBtnDisabled] = useState(false);

  useEffect(() => {
    if (loggedUser.balance[0] === "-") {
      setIsSwitchClicked(true);
    } else {
      setIsSwitchClicked(false);
    }
  }, [isBalanceChanged]);

  useEffect(() => {
    if (loggedUser.hasOwnProperty("image")) {
      setIsChecked(true);
      setImage(loggedUser.image);
    } else {
      setIsChecked(false);
    }

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
  }, [isBalanceChanged]);

  useEffect(() => {
    const fetchNewData = async () => {
      const response = await fetch(
        "https://react-http-f8211-default-rtdb.firebaseio.com/logins.json"
      );

      if (!response.ok) {
        throw new Error("Algo deu errado!");
      }

      const responseData = await response.json();
      const userlogged = Object.values(responseData).find(
        (user) => user.email === loggedUser.email
      );

      setBalance(userlogged.balance);
      const loggedUserJSON = JSON.stringify(userlogged);
      localStorage.setItem('foundUser', loggedUserJSON);
      setIsBalanceChanged(!isBalanceChanged);
    };
    fetchNewData();
  }, [balanceChanged, dispatch]);

  const onImageHandler = () => {
    setImageChanged(true);
  };

  const onImageSubmitHandler = async (e) => {
    e.preventDefault();
    setImageChanged(false);

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

      const updatedUserData = {
        id: loggedUser.id,
        name: loggedUser.name,
        image: image,
        email: loggedUser.email,
        goals: loggedUser.goals,
        balance: loggedUser.balance,
        lastName: loggedUser.lastName,
        password: loggedUser.password,
        incomeItems: loggedUser.incomeItems,
        expenseItems: loggedUser.expenseItems,
      };

      try {
        await fetch(
          `https://react-http-f8211-default-rtdb.firebaseio.com/logins/${key}.json`,
          {
            method: "PUT",
            body: JSON.stringify(updatedUserData),
          }
        );

        const loggedUserJSON = JSON.stringify(updatedUserData);
        localStorage.setItem('foundUser', loggedUserJSON);

        setImage(image);
      } catch {}
    } catch (error) {
      console.error("Erro ao enviar imagem:", error);
    }
    setIsChecked(true);
  };

  const inputChange = (e) => {
    const image = e.target.files[0];
    setSelectedImage(image);
  };

  const balanceHandler = (event) => {
    const value = event.target.value;
    const numericValue = value.replace(/\D/g, "");

    if (numericValue.length < 14) {
      setBalance(formatMoney(numericValue));
      setBtnDisabled(false);
      setStyleDisabled(true);
      setIsDisabled(true);
    } else {
      setBalance(formatMoney(numericValue));
      setBtnDisabled(true);
      setStyleDisabled(false);
      setIsDisabled(false);
    }
  };

  const convertButton = async () => {
    if (balance[0] === "R") {
      const convertedBalance = balance.replace(/\D/g, "");
      const negativeBalance = convertedBalance * -1;

      const formattedNegativeBalance = formatMoney(negativeBalance);
      setBalance(formattedNegativeBalance);

      const updatedUserData = {
        id: loggedUser.id,
        name: loggedUser.name,
        image: loggedUser.image,
        email: loggedUser.email,
        goals: loggedUser.goals,
        balance: formattedNegativeBalance,
        lastName: loggedUser.lastName,
        password: loggedUser.password,
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
      } catch (error) {
        console.error(error);
      }

      const updatedUserDataJSON = JSON.stringify(updatedUserData);
      localStorage.setItem('foundUser', updatedUserDataJSON);
    } else {
      const convertedBalance = balance.replace(/\D/g, "");
      const positiveBalance = convertedBalance * 1;

      const formattedPositiveBalance = formatMoney(positiveBalance);
      setBalance(formattedPositiveBalance);

      const updatedUserData = {
        id: loggedUser.id,
        name: loggedUser.name,
        image: loggedUser.image,
        email: loggedUser.email,
        goals: loggedUser.goals,
        balance: formattedPositiveBalance,
        lastName: loggedUser.lastName,
        password: loggedUser.password,
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
      } catch (error) {
        console.error(error);
      }

      const updatedUserDataJSON = JSON.stringify(updatedUserData);
      localStorage.setItem('foundUser', updatedUserDataJSON);
    }

    setIsSwitchClicked(!isSwitchClicked);
  };

  const onEditButton = () => {
    setInputDisabled(false);
    setIsEditClicked(true);
    setConvertBtnDisabled(true);
  };

  const onConfirmButton = () => {
    setIsEditClicked(false);

    setIsDisabled(true);
    setInputDisabled(true);
    setConvertBtnDisabled(false);

    const newBalance = async () => {
      const updatedUserData = {
        id: loggedUser.id,
        name: loggedUser.name,
        email: loggedUser.email,
        goals: loggedUser.goals,
        image: loggedUser.image,
        balance: balance,
        lastName: loggedUser.lastName,
        password: loggedUser.password,
        incomeItems: loggedUser.incomeItems,
        expenseItems: loggedUser.expenseItems,
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
      setBalanceChanged(!balanceChanged);
    };

    newBalance();
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
      {isChecked && (
        <div>
          <img
            src={`http://localhost:5000/uploads/${image}`}
            className={classes.profileImg}
            alt="profile"
            onClick={onImageHandler}
          />
        </div>
      )}
      {!isChecked && (
        <div>
          <img
            src={undefinedImage}
            className={classes.profileImg}
            alt="profile undefined"
            onClick={onImageHandler}
          />
        </div>
      )}
      {imageChanged && (
        <form onSubmit={onImageSubmitHandler}>
          <input
            className={classes.profileInput}
            type="file"
            onChange={inputChange}
          />
          <button className={classes.confirmBtn}>Ok</button>
        </form>
      )}
      <div className={classes.container}>
        <div>
          <h2 className={classes.profileUserName}>
            {loggedUser.name} {loggedUser.lastName}
          </h2>
        </div>
        <div className={classes.div}>
          <input
            value={balance === "0" ? "R$0,00" : balance}
            disabled={inputDisabled}
            onChange={balanceHandler}
            className={styleDisabled ? classes.input : classes.inputError}
          />
          <button
            onClick={convertButton}
            className={
              convertBtnDisabled ? classes.disabled : classes.convertButton
            }
            disabled={convertBtnDisabled}
          >
            {!isSwitchClicked ? "-" : "+"}
          </button>
          {!styleDisabled && (
            <p className={classes.errorMessage}>
              Não é possível inserir um valor igual ou acima de 100 bilhões
            </p>
          )}
        </div>
      </div>
      {isEditClicked && (
        <button
          onClick={onConfirmButton}
          className={!isDisabled ? classes.disabledBtn : classes.editBtn}
          disabled={btnDisabled}
        >
          Confirmar
        </button>
      )}
      {!isEditClicked && (
        <button onClick={onEditButton} className={classes.editBtn}>
          Editar Saldo
        </button>
      )}
    </section>
  );
};

export default Profile;

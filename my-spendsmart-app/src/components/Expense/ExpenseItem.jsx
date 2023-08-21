import { useState } from "react";
import { useDispatch } from "react-redux";

import classes from "./ExpenseItem.module.css";

import health from "../../Icons/checklist.png";
import college from "../../Icons/college.png";
import leisure from "../../Icons/rocket.png";
import homeIcon from "../../Icons/home.png";
import nutrition from "../../Icons/clock.png";
import transportation from "../../Icons/location.png";

import expenseAction from "../../store/expense-slice";

const formatMoney = (value) => {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });

  return formatter.format((value / 100).toFixed(2));
};

const ExpenseItem = ({ item }) => {
  const dispatch = useDispatch();

  const storedUserJSON = localStorage.getItem("foundUser");
  const storedUser = JSON.parse(storedUserJSON);

  const { id, value, date, category } = item;

  let image = "";

  const deleteHandler = () => {
    const userConfirmed = window.confirm(
      "Clique em OK para confirmar a exclusão"
    );

    if (userConfirmed) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            "https://react-http-f8211-default-rtdb.firebaseio.com/logins.json"
          );

          if (!response.ok) {
            console.log("Algo deu errado");
          }

          const responseData = await response.json();

          const loggedUser = Object.values(responseData).find(
            (user) => user.email === storedUser.email
          );

          const newItems = loggedUser.items.filter((item) => item.id !== id);
          const storedBalance = storedUser;
          console.log(storedBalance);

          if (storedBalance.balance[0] === "-") {
            const convertedValue = value.replace(/\D/g, "");
            const convertedBalance = storedBalance.balance.replace(/\D/g, "");
            const negativeBalance = convertedBalance * -1;
            console.log(negativeBalance);

            const cashBack =
              parseInt(negativeBalance) + parseInt(convertedValue);
            console.log(cashBack);

            const formattedCashBack = formatMoney(cashBack);

            if (newItems.length > 0) {
              console.log(newItems.length);
              console.log("NEGATIVO, maior que zero");
              const updatedUserItems = {
                email: loggedUser.email,
                id: loggedUser.id,
                lastName: loggedUser.lastName,
                name: loggedUser.name,
                password: loggedUser.password,
                image: loggedUser.image,
                balance: formattedCashBack,
                items: newItems,
              };

              const userKey = Object.keys(responseData).find(
                (key) => responseData[key].email === storedUser.email
              );

              await fetch(
                `https://react-http-f8211-default-rtdb.firebaseio.com/logins/${userKey}.json`,
                {
                  method: "PUT",
                  body: JSON.stringify(updatedUserItems),
                }
              );
            } else {
              console.log("NEGATIVO = zero items");
              const newItems = [""];

              const updatedUserItems = {
                email: loggedUser.email,
                id: loggedUser.id,
                lastName: loggedUser.lastName,
                name: loggedUser.name,
                password: loggedUser.password,
                image: loggedUser.image,
                balance: formattedCashBack,
                items: newItems,
              };

              const userKey = Object.keys(responseData).find(
                (key) => responseData[key].email === storedUser.email
              );

              await fetch(
                `https://react-http-f8211-default-rtdb.firebaseio.com/logins/${userKey}.json`,
                {
                  method: "PUT",
                  body: JSON.stringify(updatedUserItems),
                }
              );
            }
          } else {
            const convertedValue = value.replace(/\D/g, "");
            const convertedBalance = storedBalance.balance.replace(/\D/g, "");

            console.log(convertedValue);
            console.log(convertedBalance);

            const cashBack =
              parseInt(convertedBalance) + parseInt(convertedValue);

            const formattedCashBack = formatMoney(cashBack);

            if (newItems.length > 0) {
              console.log("POSITIVO, maior que zero");
              const updatedUserItems = {
                email: loggedUser.email,
                id: loggedUser.id,
                lastName: loggedUser.lastName,
                name: loggedUser.name,
                password: loggedUser.password,
                image: loggedUser.image,
                balance: formattedCashBack,
                items: newItems,
              };

              console.log(updatedUserItems);

              const userKey = Object.keys(responseData).find(
                (key) => responseData[key].email === storedUser.email
              );

              await fetch(
                `https://react-http-f8211-default-rtdb.firebaseio.com/logins/${userKey}.json`,
                {
                  method: "PUT",
                  body: JSON.stringify(updatedUserItems),
                }
              );
            } else {
              console.log("POSITIVO = zero items");
              const newItems = [""];

              const updatedUserItems = {
                email: loggedUser.email,
                id: loggedUser.id,
                lastName: loggedUser.lastName,
                name: loggedUser.name,
                password: loggedUser.password,
                image: loggedUser.image,
                balance: formattedCashBack,
                items: newItems,
              };

              console.log(updatedUserItems);

              const userKey = Object.keys(responseData).find(
                (key) => responseData[key].email === storedUser.email
              );

              await fetch(
                `https://react-http-f8211-default-rtdb.firebaseio.com/logins/${userKey}.json`,
                {
                  method: "PUT",
                  body: JSON.stringify(updatedUserItems),
                }
              );
            }
          }

          const newResponse = await fetch(
            "https://react-http-f8211-default-rtdb.firebaseio.com/logins.json"
          );

          if (!newResponse.ok) {
            console.log("Algo deu errado");
          }

          const responseNewData = await newResponse.json();

          const user = Object.values(responseNewData).find(
            (user) => user.email === storedUser.email
          );

          const loggedUserJSON = JSON.stringify(user);

          localStorage.setItem("foundUser", loggedUserJSON);
          dispatch(expenseAction.actions.update());
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  };

  switch (category) {
    case "casa":
      image = (
        <>
          <img src={homeIcon} alt="Icone de uma Casa" className={classes.img} />
        </>
      );
      break;
    case "lazer":
      image = (
        <>
          <img
            src={leisure}
            alt="Icone de um Foguete"
            className={classes.img}
          />
        </>
      );
      break;
    case "saúde":
      image = (
        <>
          <img
            src={health}
            alt="Icone de planilhas médicas"
            className={classes.img}
          />
        </>
      );
      break;
    case "comida":
      image = (
        <>
          <img
            src={nutrition}
            alt="Icone de um Relógio marcando 12:15"
            className={classes.img}
          />
        </>
      );
      break;
    case "educação":
      image = (
        <>
          <img src={college} alt="Icone de um Capelo" className={classes.img} />
        </>
      );
      break;
    case "transporte":
      image = (
        <>
          <img
            src={transportation}
            alt="Icone de um marcador de GPS"
            className={classes.img}
          />
        </>
      );
      break;
    default:
      image = <p>Não foi possível encontrar esta categoria</p>;
      break;
  }

  return (
    <section className={classes.container}>
      <button className={classes.delete} onClick={deleteHandler}>
        X
      </button>
      <section className={classes.section}>
        <div className={classes.image}>
          <p>{image}</p>
        </div>
        <div className={classes.text}>
          <p>Data:</p>
          <p>Valor:</p>
        </div>
        <div className={classes.values}>
          <p>{date}</p>
          <p>{value}</p>
        </div>
      </section>
    </section>
  );
};

export default ExpenseItem;

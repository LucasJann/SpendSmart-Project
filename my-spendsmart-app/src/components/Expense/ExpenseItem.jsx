// import React, { useState } from "react";

import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import expenseAction from "../../store/expense-slice";
// import balanceSlice from "../../store/balance-slice";

import classes from "./ExpenseItem.module.css";

import health from "../../Icons/checklist.png";
import college from "../../Icons/college.png";
import leisure from "../../Icons/rocket.png";
import homeIcon from "../../Icons/home.png";
import nutrition from "../../Icons/clock.png";
import transportation from "../../Icons/location.png";

const ExpenseItem = ({ item }) => {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const storedUserJSON = localStorage.getItem("foundUser");
  const storedUser = JSON.parse(storedUserJSON);

  // const [deleted, setDeleted] = useState(false);

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

          console.log("loggedUser: ", loggedUser);

          const newItems = loggedUser.items.filter((item) => item.id !== id);

          if (newItems.length > 0) {
            const updatedUserItems = {
              email: loggedUser.email,
              id: loggedUser.id,
              lastName: loggedUser.lastName,
              name: loggedUser.name,
              password: loggedUser.password,
              image: loggedUser.image,
              balance: loggedUser.balance,
              items: newItems,
            };

            console.log("updatedUserItems: ", updatedUserItems);

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
            const newItems = [""];
            const updatedUserItems = {
              email: loggedUser.email,
              id: loggedUser.id,
              lastName: loggedUser.lastName,
              name: loggedUser.name,
              password: loggedUser.password,
              image: loggedUser.image,
              balance: loggedUser.balance,
              items: newItems,
            };

            console.log("updatedUserItems: ", updatedUserItems);

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

          const newResponse = await fetch(
            "https://react-http-f8211-default-rtdb.firebaseio.com/logins.json"
          );

          if (!newResponse.ok) {
            console.log("Algo deu errado");
          }

          const responseNewData = await newResponse.json();

          console.log("loggedUserJSON: ", responseNewData);

          const user = Object.values(responseNewData).find(
            (user) => user.email === storedUser.email
          );

          console.log("user: ", user);

          const loggedUserJSON = JSON.stringify(user);

          console.log("loggedUserJSON: ", loggedUserJSON);
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

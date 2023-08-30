
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import classes from "./ExpenseItem.module.css";

import health from "../../Icons/checklist.png";
import college from "../../Icons/college.png";
import leisure from "../../Icons/rocket.png";
import homeIcon from "../../Icons/home.png";
import nutrition from "../../Icons/clock.png";
import transportation from "../../Icons/location.png";

import { callerActions } from "../../store/caller-slice";

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
  const [image, setImage] = useState(null);

  useEffect(() => {
    switch (category) {
      case "moradia":
        setImage(homeIcon);
        break;
      case "lazer":
        setImage(leisure);
        break;
      case "saúde":
        setImage(health);
        break;
      case "comida":
        setImage(nutrition);
        break;
      case "educação":
        setImage(college);
        break;
      case "transporte":
        setImage(transportation);
        break;
      default:
        setImage(null);
        break;
    }
  }, [category]);

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
  
          const newItems = loggedUser.expenseItems.filter((item) => item.id !== id);
  
          const convertedValue = value.replace(/\D/g, "");
          const convertedBalance = storedUser.balance.replace(/\D/g, "");
  
          const cashBack =
            parseInt(convertedBalance) + parseInt(convertedValue);
  
          const formattedCashBack = formatMoney(cashBack);
  
          const updatedUserItems = {
            email: loggedUser.email,
            id: loggedUser.id,
            lastName: loggedUser.lastName,
            name: loggedUser.name,
            password: loggedUser.password,
            image: loggedUser.image,
            balance: formattedCashBack,
            expenseItems: newItems.length > 0 ? newItems : [""],
            incomeItems: loggedUser.incomeItems,
            goals: loggedUser.goals,
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
          dispatch(callerActions.update());
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  };

  return (
    <section className={classes.container}>
      <button className={classes.delete} onClick={deleteHandler}>
        X
      </button>
      <section className={classes.section}>
        <div>
          {image && (
            <img
              src={image}
              alt={`Icone de ${category}`}
              className={classes.img}
            />
          )}
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

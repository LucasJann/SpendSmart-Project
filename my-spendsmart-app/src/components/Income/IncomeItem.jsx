import { useDispatch } from "react-redux";

import classes from "./IncomeItem.module.css";

import money from "../../Icons/moneyBag.png";
import finance from "../../Icons/finance.png";
import identifier from "../../Icons/id.png";

import incomeAction from "../../store/income-slice";

const formatMoney = (value) => {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });

  return formatter.format((value / 100).toFixed(2));
};

const IncomeItem = ({ item }) => {
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

          const newItems = loggedUser.incomeItems.filter(
            (item) => item.id !== id
          );

          const storedBalance = storedUser;

          if (storedBalance.balance[0] === "-") {
            const convertedValue = value.replace(/\D/g, "");
            const convertedBalance = storedBalance.balance.replace(/\D/g, "");

            const negativeBalance = convertedBalance * -1;

            const cashBack =
              parseInt(negativeBalance) - parseInt(convertedValue);

            const formattedCashBack = formatMoney(cashBack);

            if (newItems.length > 0) {
              const updatedUserItems = {
                email: loggedUser.email,
                id: loggedUser.id,
                lastName: loggedUser.lastName,
                name: loggedUser.name,
                password: loggedUser.password,
                image: loggedUser.image,
                balance: formattedCashBack,
                expenseItems: loggedUser.expenseItems,
                incomeItems: newItems,
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
              const newItems = [""];

              const updatedUserItems = {
                email: loggedUser.email,
                id: loggedUser.id,
                lastName: loggedUser.lastName,
                name: loggedUser.name,
                password: loggedUser.password,
                image: loggedUser.image,
                balance: formattedCashBack,
                expenseItems: loggedUser.expenseItems,
                incomeItems: newItems,
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

            const cashBack =
              parseInt(convertedBalance) - parseInt(convertedValue);

            const formattedCashBack = formatMoney(cashBack);

            if (newItems.length > 0) {
              const updatedUserItems = {
                email: loggedUser.email,
                id: loggedUser.id,
                lastName: loggedUser.lastName,
                name: loggedUser.name,
                password: loggedUser.password,
                image: loggedUser.image,
                balance: formattedCashBack,
                expenseItems: loggedUser.expenseItems,
                incomeItems: newItems,
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
              const newItems = [""];

              const updatedUserItems = {
                email: loggedUser.email,
                id: loggedUser.id,
                lastName: loggedUser.lastName,
                name: loggedUser.name,
                password: loggedUser.password,
                image: loggedUser.image,
                balance: formattedCashBack,
                expenseItems: loggedUser.expenseItems,
                incomeItems: newItems,
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
          dispatch(incomeAction.actions.update());
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  };

  console.log(category);

  switch (category) {
    case "finance":
      image = (
        <>
          <img
            src={finance}
            alt="Icone de um laptop com uma projeção positiva de um gráfico de linha"
            className={classes.img}
          />
        </>
      );
      break;
    case "money":
      image = (
        <>
          <img
            src={money}
            alt="Icone de um saco de dinheiro"
            className={classes.img}
          />
        </>
      );
      break;
    case "id":
      image = (
        <>
          <img
            src={identifier}
            alt="Icone de um cracha"
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

export default IncomeItem;

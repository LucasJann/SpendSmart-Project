import React, { useState } from "react";
import classes from "./Login.module.css";

import image from "../../Imgs/logo.png";

import { Form } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigation = useNavigate();

  const [email, setEmail] = useState("");

  const emailChange = (event) => {
    const emailValue = event.target.value;
    setEmail(emailValue);
  };

  const onRegister = () => {
    navigation("/registerPage");
  };

  const onButton = async () => {
    const response = await fetch(
      "https://react-http-f8211-default-rtdb.firebaseio.com/logins.json"
    );

    const responseData = await response.json();

    const foundUser = Object.values(responseData).find(
      (data) => data.email === email
    );

    if (foundUser) {
      const foundUserJSON = JSON.stringify(foundUser);
      localStorage.setItem("foundUser", foundUserJSON);
      navigation("/landingPage");
    } else {
      console.log("User not found");
    }
  };

  return (
    <Form className={classes.form}>
      <img
        src={image}
        alt="Pessoa sentada em uma pilha de dinheiro com as pernas cruzadas"
        className={classes.image}
      />
      <div className={classes.container}>
        <h2>Email</h2>
        <input onChange={emailChange} />
        <h2>Senha</h2>
        <input type="password" />
        <p className={classes.paragraph} onClick={onRegister}>
          Clique aqui para se registrar
        </p>
      <button className={classes.login} onClick={onButton}>
        Entrar
      </button>
      </div>

    </Form>
  );
};

export default Login;

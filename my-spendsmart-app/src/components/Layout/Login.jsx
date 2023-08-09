import React, { useState } from "react";
import image from "../../Imgs/logo.png";
import classes from "./Login.module.css";
import { Form } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const navigation = useNavigate();

  const registerHandler = () => {
    navigation("/");
  };

  const inputHandlerButton = async () => {
    const response = await fetch(
      "https://react-http-f8211-default-rtdb.firebaseio.com/logins.json"
    );

    const responseData = await response.json();

    const foundUser = Object.values(responseData).find(
      (data) => data.user.email === email
    );

    if (foundUser) {
      const foundUserJSON = JSON.stringify(foundUser);
      localStorage.setItem("foundUser", foundUserJSON);
      navigation("/landingPage");
    } else {
      console.log("User not found");
    }
  };

  const onEmailChanged = (event) => {
    const emailValue = event.target.value;
    setEmail(emailValue);
  };

  const onSubmitHandler = () => {
    // You can dispatch email data here if needed
  };

  return (
    <Form className={classes.container} onSubmit={onSubmitHandler}>
      <img src={image} alt="Carteira com dinheiro" className={classes.image} />
      <div>
        <h2>Email</h2>
        <input onChange={onEmailChanged} />
        <h2>Senha</h2>
        <input type='password' />
        <p className={classes.paragraph} onClick={registerHandler}>
          Clique aqui para se registrar
        </p>
      </div>
      <button
        className={classes.register}
        onClick={() => inputHandlerButton(email)}
      >
        Entrar
      </button>
    </Form>
  );
};

export default Login;

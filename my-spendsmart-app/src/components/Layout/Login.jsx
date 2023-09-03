import image from "../../Imgs/logo.png";
import classes from "./Login.module.css";

import { Form } from "react-router-dom";
import { useState } from "react";
// import { keyActions } from "../../store/key-slice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState();

  const onButton = async () => {
    const response = await fetch(
      "https://react-http-f8211-default-rtdb.firebaseio.com/logins.json"
    );

    const responseData = await response.json();

    console.log(email);

    const foundUser = Object.values(responseData).find(
      (data) => data.email === email
    );

    // const localStorageData = localStorage.key(foundUser.id);
    // dispatch(keyActions.storeKey(localStorageData));

    if (foundUser) {
      const foundUserJSON = JSON.stringify(foundUser);
      localStorage.setItem('foundUser', foundUserJSON);
      navigation("/landingPage");
    } else {
      console.log("O usuário não foi encontrado");
    }
  };

  const emailChangeHandler = (event) => {
    const emailValue = event.target.value;
    setEmail(emailValue);
  };

  const onRegisterHandler = () => {
    navigation("/registerPage");
  };

  return (
    <Form className={classes.form} onSubmit={onButton}>
      <img
        src={image}
        alt="Pessoa sentada em uma pilha de dinheiro com as pernas cruzadas"
        className={classes.image}
      />
      <div className={classes.container}>
        <h2>Email</h2>
        <input type="email" onChange={emailChangeHandler} />
        <h2>Senha</h2>
        <input type="password" />
        <p className={classes.paragraph} onClick={onRegisterHandler}>
          Clique aqui para se registrar
        </p>
        <button className={classes.loginBtn}>Entrar</button>
      </div>
    </Form>
  );
};

export default Login;

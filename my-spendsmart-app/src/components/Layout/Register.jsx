import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Form, useNavigate } from "react-router-dom";

import image from "../../Imgs/finances.jpg";
import classes from "./Register.module.css";

const Register = () => {
  const navigation = useNavigate();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [lastName, setLastName] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const onSubmit = async () => {
    if (password === confirmPassword) {
      const id = uuidv4();
      const newLogin = {
        id,
        name: name,
        lastName: lastName,
        email: email,
        password: password,
        expenseItems: [""],
        imcomeItems: [""],
        balance: "0",
      };

      await fetch(
        "https://react-http-f8211-default-rtdb.firebaseio.com/logins.json",
        {
          method: "POST",
          body: JSON.stringify(newLogin),
        }
      );

      localStorage.setItem("foundUser", JSON.stringify(newLogin));

      navigation("/");
    } else {
      return console.log(
        "os campos [Confirmar Senha] e [Senha] precisam conter os mesmos valores."
      );
    }
  };

  const onLogin = () => {
    navigation("/registerPage");
  };

  const nameChange = (event) => {
    const name = event.target.value;
    setName(name);
  };

  const lastNameChange = (event) => {
    const lastName = event.target.value;
    setLastName(lastName);
  };

  const emailChange = (event) => {
    const email = event.target.value;
    setEmail(email);
  };

  const passwordChange = (event) => {
    const password = event.target.value;
    setPassword(password);
  };

  const confirmPasswordChange = (event) => {
    const confirmPassword = event.target.value;
    setConfirmPassword(confirmPassword);
  };

  return (
    <>
      <div className={classes.container}>
        <Form className={classes.form} onSubmit={onSubmit}>
          <button className={classes.login} onClick={onLogin}>
            Login
          </button>
          <img
            src={image}
            alt="Carteira com dinheiro"
            className={classes.image}
          />
          <div>
            <h2>Nome</h2>
            <input onChange={nameChange} />
            <h2>Sobrenome</h2>
            <input onChange={lastNameChange} />
            <h2>Email</h2>
            <input onChange={emailChange} />
            <h2>Senha</h2>
            <input type="password" onChange={passwordChange} />
            <h2>Confirmar Senha</h2>
            <input type="password" onChange={confirmPasswordChange} />
          </div>
          <button className={classes.register}>Registrar</button>
        </Form>
      </div>
    </>
  );
};

export default Register;

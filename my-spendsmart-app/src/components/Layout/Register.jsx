import { useState } from "react";
// import { useDispatch } from "react-redux";
import image from "../../Imgs/finances.jpg";
import { Form, useNavigate } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";
// import { valueActions } from "../../store/value-slice";

import classes from "./Register.module.css";

const Register = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [lastName, setLastName] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const navigation = useNavigate();
  // const dispatch = useDispatch();

  const onNameChanged = (event) => {
    const nameValue = event.target.value;
    setName(nameValue);
  };

  const onLastNameChanged = (event) => {
    const lastNameValue = event.target.value;
    setLastName(lastNameValue);
  };

  const onEmailChanged = (event) => {
    const emailValue = event.target.value;
    setEmail(emailValue);
  };

  const onPasswordChanged = (event) => {
    const passwordValue = event.target.value;
    setPassword(passwordValue);
  };

  const onConfirmPasswordChanged = (event) => {
    const confirmPasswordValue = event.target.value;
    setConfirmPassword(confirmPasswordValue);
  };

  const onSubmitHandler = async () => {
    if (password === confirmPassword) {
      console.log("ok");
      const id = uuidv4();
      const newLogin = {
        id,
        name: name,
        lastName: lastName,
        email: email,
        password: password,
      };

      await fetch(
        "https://react-http-f8211-default-rtdb.firebaseio.com/logins.json",
        {
          method: "POST",
          body: JSON.stringify({
            user: newLogin,
          }),
        }
      );
      navigation("/loginPage");
    } else {
      return console.log("not ok");
    }
  };

  // const loginHandler = () => {
  //   dispatch(valueActions.login('ribeiro@hotmail.com'));
  //   navigation("/profilePage");
  // };

  const onLoginHandler = () => {
    navigation("/loginPage");
  };

  return (
    <>
      <Form className={classes.form} onSubmit={onSubmitHandler}>
        <button className={classes.login} onClick={onLoginHandler}>
          Login
        </button>
        <img
          src={image}
          alt="Carteira com dinheiro"
          className={classes.image}
        />
        <div>
          <h2>Nome</h2>
          <input onChange={onNameChanged} />
          <h2>Sobrenome</h2>
          <input onChange={onLastNameChanged} />
          <h2>Email</h2>
          <input onChange={onEmailChanged} />
          <h2>Senha</h2>
          <input type="password" onChange={onPasswordChanged} />
          <h2>Confirmar Senha</h2>
          <input type="password" onChange={onConfirmPasswordChanged} />
        </div>
        <button className={classes.register}>Registrar</button>
      </Form>
      {/* <div>
        <button onClick={loginHandler}>Login</button>
      </div> */}
    </>
  );
};

export default Register;

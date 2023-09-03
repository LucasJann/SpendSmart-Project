import image from "../../Imgs/finances.jpg";
import classes from "./Register.module.css";

import { v4 as uuidv4 } from "uuid";
import { Form, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Register = () => {
  const navigation = useNavigate();

  const [caller, setCaller] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameError, setNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [lastNameError, setLastNameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const [isNameValid, setIsNameValid] = useState(null);
  const [isEmailValid, setIsEmailValid] = useState(null);
  const [isLastNameValid, setIsLastNameValid] = useState(null);
  const [isPasswordValid, setIsPasswordValid] = useState(null);

  const [hasNameValue, setHasNameValue] = useState(false);
  const [hasEmailValue, setHasEmailValue] = useState(false);
  const [hasLastNameValue, setHasLastNameValue] = useState(false);
  const [hasPasswordValue, setHasPasswordValue] = useState(false);
  const [hasConfirmPasswordValue, setHasConfirmPasswordValue] = useState(false);

  useEffect(() => {
    if (
      hasNameValue &&
      hasLastNameValue &&
      hasEmailValue &&
      hasPasswordValue &&
      hasConfirmPasswordValue
    ) {
      const validator =
        name.length &&
        lastName.length &&
        email.length &&
        password.length &&
        confirmPassword.length > 0
          ? true
          : false;

      setIsValid(validator);
    } else {
      setIsValid(false);
    }
  }, [
    hasNameValue,
    hasLastNameValue,
    hasEmailValue,
    hasPasswordValue,
    hasConfirmPasswordValue,
  ]);

  useEffect(() => {
    if (nameError !== null) {
      nameError ? setIsNameValid(false) : setIsNameValid(true);
    }

    if (lastNameError !== null) {
      lastNameError ? setIsLastNameValid(false) : setIsLastNameValid(true);
    }

    if (emailError !== null) {
      emailError ? setIsEmailValid(false) : setIsEmailValid(true);
    }

    if (passwordError !== null) {
      passwordError ? setIsPasswordValid(false) : setIsPasswordValid(true);
    }
  }, [nameError, lastNameError, emailError, passwordError]);

  useEffect(() => {
    const postData = async () => {
      if (isPasswordValid && isEmailValid && isLastNameValid && isNameValid) {
        const id = uuidv4();
        const newLogin = {
          id,
          name: name,
          email: email,
          goals: [""],
          balance: "0",
          lastName: lastName,
          password: password,
          incomeItems: [""],
          expenseItems: [""],
        };

        await fetch(
          "https://react-http-f8211-default-rtdb.firebaseio.com/logins.json",
          {
            method: "POST",
            body: JSON.stringify(newLogin),
          }
        );

        localStorage.setItem('foundUser', JSON.stringify(newLogin));
        navigation("/");
      }
    };
    postData();
  }, [caller]);

  useEffect(() => {
    isPasswordValid && isEmailValid && isLastNameValid && isNameValid
      ? setCaller(true)
      : setCaller(false);
  }, [isPasswordValid, isEmailValid, isLastNameValid, isNameValid]);

  const onSubmit = async (event) => {
    event.preventDefault();
    const nameValidator = /[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\\/\-="']/.test(name);
    const lastNameValidator = /[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\\/\-="']/.test(
      lastName
    );

    if (nameValidator) {
      setNameError(true);
    } else {
      setNameError(false);
    }

    if (lastNameValidator) {
      setLastNameError(true);
    } else {
      setLastNameError(false);
    }

    const hotmail = email.indexOf("@hotmail.com");

    if (hotmail > 0) {
      setEmailError(false);
    } else {
      const gmail = email.indexOf("@gmail.com");
      if (gmail > 0) {
        setEmailError(false);
      } else {
        setEmailError(true);
      }
    }

    if (password === confirmPassword) {
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const nameChangeHandler = (event) => {
    const name = event.target.value;
    setName(name);

    name.length > 0 ? setHasNameValue(true) : setHasNameValue(false);
  };

  const lastNameChangeHandler = (event) => {
    const lastName = event.target.value;
    setLastName(lastName);

    lastName.length > 0
      ? setHasLastNameValue(true)
      : setHasLastNameValue(false);
  };

  const emailChangeHandler = (event) => {
    const email = event.target.value;
    setEmail(email);
    email.length > 0 ? setHasEmailValue(true) : setHasEmailValue(false);
  };

  const passwordChangeHandler = (event) => {
    const password = event.target.value;
    setPassword(password);

    password.length > 0
      ? setHasPasswordValue(true)
      : setHasPasswordValue(false);
  };

  const confirmPasswordChangeHandler = (event) => {
    const confirmPassword = event.target.value;
    setConfirmPassword(confirmPassword);

    confirmPassword.length > 0
      ? setHasConfirmPasswordValue(true)
      : setHasConfirmPasswordValue(false);
  };

  const nameStyle = () => {
    if (isNameValid !== false) {
      return;
    } else {
      return classes.inputError;
    }
  };

  const lastNameStyle = () => {
    if (isLastNameValid !== false) {
      return;
    } else {
      return classes.inputError;
    }
  };

  const emailStyle = () => {
    if (isEmailValid !== false) {
      return;
    } else {
      return classes.inputError;
    }
  };

  const passwordStyle = () => {
    if (isPasswordValid !== false) {
      return;
    } else {
      return classes.inputError;
    }
  };

  const onLoginHandler = () => {
    navigation("/");
  };

  return (
    <div className={classes.container}>
      <Form className={classes.form} onSubmit={onSubmit}>
        <button className={classes.loginBtn} onClick={onLoginHandler}>
          Login
        </button>
        <img
          src={image}
          alt="Carteira com dinheiro"
          className={classes.image}
        />
        <div>
          <h2>Nome</h2>
          <input onChange={nameChangeHandler} className={nameStyle()} />
          {nameError && (
            <p className={classes.errorMessage}>
              Preencha o campo nome sem utilizar números nem caractéres
              especiais, e clique novamente em Registrar
            </p>
          )}
          <h2>Sobrenome</h2>
          <input onChange={lastNameChangeHandler} className={lastNameStyle()} />
          {lastNameError && (
            <p className={classes.errorMessage}>
              Preencha o campo sobrenome sem utilizar números nem caractéres
              especiais, e clique novamente em Registrar
            </p>
          )}
          <h2>Email</h2>
          <input
            type="email"
            onChange={emailChangeHandler}
            className={emailStyle()}
          />
          {emailError && (
            <p className={classes.errorMessage}>
              Por favor, insira um email válido! E clique novamente em Registrar
            </p>
          )}
          <h2>Senha</h2>
          <input
            type="password"
            onChange={passwordChangeHandler}
            className={passwordStyle()}
          />
          <h2>Confirmar Senha</h2>
          <input
            type="password"
            onChange={confirmPasswordChangeHandler}
            className={passwordStyle()}
          />
          {passwordError && (
            <p className={classes.errorMessage}>
              O campo [Senha] e o campo [Confirmar Senha] devem ser idênticos
            </p>
          )}
        </div>
        {isValid && <button className={classes.registerBtn}>Registrar</button>}
      </Form>
    </div>
  );
};

export default Register;

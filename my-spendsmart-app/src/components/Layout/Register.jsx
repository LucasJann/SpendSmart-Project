import image from "../../Imgs/finances.jpg";
import classes from "./Register.module.css";

import { useEffect, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Register = () => {
  const navigation = useNavigate();

  const [name, setName] = useState("");
  const [isNameValid, setIsNameValid] = useState(null);

  const [lastName, setLastName] = useState("");
  const [isLastNameValid, setIsLastNameValid] = useState(null);

  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(null);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(null);

  const [hasNameValue, setHasNameValue] = useState(false);
  const [hasEmailValue, setHasEmailValue] = useState(false);
  const [hasLastNameValue, setHasLastNameValue] = useState(false);
  const [hasPasswordValue, setHasPasswordValue] = useState(false);
  const [hasConfirmPasswordValue, setHasConfirmPasswordValue] = useState(false);

  const [isNameError, setIsNameError] = useState(null);
  const [isEmailError, setIsEmailError] = useState(null);
  const [isLastNameError, setIsLastNameError] = useState(null);
  const [isPasswordError, setIsPasswordError] = useState(null);

  const [nameError, setNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [lastNameError, setLastNameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const [caller, setCaller] = useState(false);
  const [validation, setValidation] = useState(false);

  useEffect(() => {
    const postData = async () => {
      if (isPasswordValid && isEmailValid && isLastNameValid && isNameValid) {
        const id = uuidv4();
        const newLogin = {
          id,
          name: name,
          lastName: lastName,
          email: email,
          password: password,
          expenseItems: [""],
          incomeItems: [""],
          balance: "0",
          goals: [""],
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
      }
    };
    postData();
  }, [caller]);

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

      setValidation(validator);
    } else {
      setValidation(false);
    }
  }, [
    hasNameValue,
    hasLastNameValue,
    hasEmailValue,
    hasPasswordValue,
    hasConfirmPasswordValue,
  ]);

  useEffect(() => {
    if (isNameError !== null) {
      isNameError
        ? setNameError(true) && nameInitialState()
        : setNameError(false) && nameInitialState();
    }

    if (isLastNameError !== null) {
      isLastNameError
        ? setLastNameError(true) && lastNameInitialState()
        : setLastNameError(false) && lastNameInitialState();
    }

    if (isEmailError !== null) {
      isEmailError ? setEmailError(true) : setEmailError(false);
    }

    if (isPasswordError !== null) {
      isPasswordError ? setPasswordError(true) : setPasswordError(false);
    }
  }, [isNameError, isLastNameError, isEmailError, isPasswordError]);

  useEffect(() => {
    isPasswordValid && isEmailValid && isLastNameValid && isNameValid
      ? setCaller(true)
      : setCaller(false);
  }, [isPasswordValid, isEmailValid, isLastNameValid, isNameValid]);

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

  const onSubmit = async (event) => {
    event.preventDefault();
    const nameValidator = /[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\\/\-="']/.test(name);
    const lastNameValidator = /[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\\/\-="']/.test(
      lastName
    );

    if (nameValidator) {
      setIsNameError(true);
    } else {
      setIsNameError(false);
    }

    if (lastNameValidator) {
      setIsLastNameError(true);
    } else {
      setIsLastNameError(false);
    }

    const hotmail = email.indexOf("@hotmail.com");

    if (hotmail > 0) {
      setIsEmailError(false);
    } else {
      const gmail = email.indexOf("@gmail.com");
      if (gmail > 0) {
        setIsEmailError(false);
      } else {
        setIsEmailError(true);
      }
    }

    if (password === confirmPassword) {
      setIsPasswordError(false);
    } else {
      setIsPasswordError(true);
    }

    if (isPasswordValid && isEmailValid && isLastNameValid && isNameValid) {
      setCaller(true);
    }
  };

  const nameChange = (event) => {
    const name = event.target.value;
    setName(name);

    name.length > 0 ? setHasNameValue(true) : setHasNameValue(false);
  };

  const lastNameChange = (event) => {
    const lastName = event.target.value;
    setLastName(lastName);

    lastName.length > 0
      ? setHasLastNameValue(true)
      : setHasLastNameValue(false);
  };

  const emailChange = (event) => {
    const email = event.target.value;
    setEmail(email);
    email.length > 0 ? setHasEmailValue(true) : setHasEmailValue(false);
  };

  const passwordChange = (event) => {
    const password = event.target.value;
    setPassword(password);

    password.length > 0
      ? setHasPasswordValue(true)
      : setHasPasswordValue(false);
  };

  const confirmPasswordChange = (event) => {
    const confirmPassword = event.target.value;
    setConfirmPassword(confirmPassword);

    confirmPassword.length > 0
      ? setHasConfirmPasswordValue(true)
      : setHasConfirmPasswordValue(false);
  };

  const nameInitialState = () => {
    if (isNameValid === null) {
      return classes.input;
    } else if (isNameValid === false) {
      return classes.inputError;
    } else {
      return classes.input;
    }
  };

  const lastNameInitialState = () => {
    if (isLastNameValid === null) {
      return classes.input;
    } else if (isLastNameValid === false) {
      return classes.inputError;
    } else {
      return classes.input;
    }
  };

  const emailInitialState = () => {
    if (isEmailValid === null) {
      return classes.input;
    } else if (isEmailValid === false) {
      return classes.inputError;
    } else {
      return classes.input;
    }
  };

  const passwordInitialState = () => {
    if (isPasswordValid === null) {
      return classes.input;
    } else if (isPasswordValid === false) {
      return classes.inputError;
    } else {
      return classes.input;
    }
  };

  const onLogin = () => {
    navigation("/");
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
            <input onChange={nameChange} className={nameInitialState()} />
            {nameError && (
              <p className={classes.error}>
                Preencha o campo nome sem utilizar números nem caractéres
                especiais, e clique novamente em Registrar
              </p>
            )}
            <h2>Sobrenome</h2>
            <input
              onChange={lastNameChange}
              className={lastNameInitialState()}
            />
            {lastNameError && (
              <p className={classes.error}>
                Preencha o campo sobrenome sem utilizar números nem caractéres
                especiais, e clique novamente em Registrar
              </p>
            )}
            <h2>Email</h2>
            <input
              className={emailInitialState()}
              type="email"
              onChange={emailChange}
            />
            {emailError && (
              <p className={classes.error}>
                Por favor, insira um email válido! E clique novamente em
                Registrar
              </p>
            )}
            <h2>Senha</h2>
            <input
              type="password"
              onChange={passwordChange}
              className={passwordInitialState()}
            />
            <h2>Confirmar Senha</h2>
            <input
              type="password"
              onChange={confirmPasswordChange}
              className={passwordInitialState()}
            />
            {passwordError && (
              <p className={classes.error}>
                O campo [Senha] e o campo [Confirmar Senha] devem ser idênticos
              </p>
            )}
          </div>
          {validation && (
            <button className={classes.register}>Registrar</button>
          )}
        </Form>
      </div>
    </>
  );
};

export default Register;

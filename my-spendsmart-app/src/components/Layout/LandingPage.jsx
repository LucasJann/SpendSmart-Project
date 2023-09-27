import classes from "./LandingPage.module.css";
import landingPage from "../../Imgs/money.png";

import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigation = useNavigate();

  const profilePageHandler = () => {
    navigation("/profilePage");
  };

  const expensePageHandler = () => {
    navigation("/expensePage");
  };

  const goalPageHandler = () => {
    navigation("/goalPage");
  };

  return (
    <div className={classes.container}>
      <img src={landingPage} className={classes.image} alt="A landing page" />
      <ul>
        <li>
          <button onClick={profilePageHandler}>Perfil</button>
        </li>
        <li>
          <button onClick={expensePageHandler}>Minhas Finanças</button>
        </li>
        <li>
          <button onClick={goalPageHandler}>Objetivos</button>
        </li>
      </ul>
    </div>
  );
};

export default LandingPage;

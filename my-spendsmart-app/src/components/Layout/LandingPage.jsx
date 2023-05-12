import { useNavigate } from "react-router-dom";

import classes from "./LandingPage.module.css";
import landingPage from "../../Imgs/money.png";

const LandingPage = () => {
  const navigation = useNavigate();

  const profilePageWasClicked = () => {
    navigation("/profilePage");
  };

  const expensePageWasClicked = () => {
    navigation("/expensePage");
  };

  const goalPageWasClicked = () => {
    navigation("/goalPage");
  };

  return (
    <div className={classes.landingPageDiv}>
      <img
        src={landingPage}
        className={classes.landingPageImg}
        alt="A landing page"
      />
      <ul className={classes.unorderedList}>
        <li>
          <button className={classes.listButton} onClick={profilePageWasClicked}>
            Perfil
          </button>
        </li>
        <li>
          <button className={classes.listButton} onClick={expensePageWasClicked}>
            Minhas Finanças
          </button>
        </li>
        <li>
          <button className={classes.listButton} onClick={goalPageWasClicked}>
            Objetivo
          </button>
        </li>
      </ul>
    </div>
  );
};

export default LandingPage;

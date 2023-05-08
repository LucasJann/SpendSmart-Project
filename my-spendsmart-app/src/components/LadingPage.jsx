import { useNavigate } from "react-router-dom";

import classes from "./LandingPage.module.css";
import landingPage from "../Imgs/money.png";

const LandingPage = () => {
  const navigation = useNavigate();

  const profileWasClicked = () => {
    navigation("/profile");
  };

  const goalWasClicked = () => {
    navigation("/myfinances");
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
          <button className={classes.listButton} onClick={profileWasClicked}>
            Perfil
          </button>
        </li>
        <li>
          <button className={classes.listButton}>Objetivo</button>
        </li>
        <li>
          <button className={classes.listButton} onClick={goalWasClicked}>
            Minhas Finanças
          </button>
        </li>
        <li>
          <button className={classes.listButton}> Relatório</button>
        </li>
      </ul>
    </div>
  );
};

export default LandingPage;

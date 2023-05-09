import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import pic from "../Imgs/pic.png";
import classes from "./Profile.module.css";

const Profile = () => {
  const storedValue = localStorage.getItem("initialBalance");
  const valueState = useSelector((state) => state.value.value) || storedValue;
  const storage = valueState === 0 ? storedValue : valueState
  
  const navigation = useNavigate();
  
  const onClickHandler = () => {
    navigation("/landingPage");
  };
  

  return (
    <>
      <div className={classes.div}>
        <div className={classes.buttonDiv}>
          <button onClick={onClickHandler} className={classes.button}>
            Voltar
          </button>
        </div>
        <img src={pic} className={classes.profileImg} alt="A profile" />
        <h2 className={classes.profileName}>Lucas Jan</h2>
        <h3 className={classes.balanceInfo}> Seu saldo bruto</h3>
        <input value={storage} disabled={true} />
      </div>
    </>
  );
};

export default Profile;

import React from "react";
import classes from "./Nav.module.css";
import logo from "../../../assets/logo.png";
const NavBar = (props) => {
  return (
    <React.Fragment>
      <div className={classes["nav-bar"]}>
        <div className={classes["nav-bar-logo"]}>
          <img src={logo} alt="" />
        </div>
        <div className={classes["nav-bar-links"]}>
          <div className={classes["nav-teach"]} onClick={props.onTeachIt}>Teach It</div>
          <div className={classes["nav-ask"]} onClick={props.onAskIt}>Ask It</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NavBar;

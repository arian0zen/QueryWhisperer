import React from "react";
import classes from "./GoButton.module.css";
import goNext from "../../../assets/go-next.gif";
const GoButton = props =>{
    const clickHandler = ()=>{
        props.onClick();
    }
    // console.log(props.onClick());
    return(
        <div className={classes["go-button"]} onClick={clickHandler}>
            <img src={goNext} alt=""/>
          </div>
    )
}

export default GoButton;
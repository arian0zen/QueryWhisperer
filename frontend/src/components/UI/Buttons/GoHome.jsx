import React from "react";
import classes from "./GoHome.module.css";
import { AiFillHome } from "react-icons/ai";
const GoHomeButton = props =>{
    const clickHandler = ()=>{
        props.onClick();  
    }
    return(
        <div className={classes["go-home-btn"]} onClick={clickHandler}>
             <AiFillHome size={"20px"}></AiFillHome>Go Back to Home
          </div>
    )
}

export default GoHomeButton;
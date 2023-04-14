import React from "react";
import classes from "./Section.module.css";
import GoButton from "../UI/Buttons/GoButton";
const SectionComponent = (props) => {
  const sectionImageClass = classes["section-image"] + (props.flip ? " " + classes["flip-order"] : "");
  return (
    <div className={classes["section"]} id={props.id}>
      <div className={classes["section-heading"]}>
        {props.heading1}
        <br />
        <span>{props.heading2}</span>
      </div>
      <div className={classes["section-content"]}>
      {props.flip ? (
          <>
            <div className={classes["section-desc"]}>
              <div className={classes["section-text"]}>
                <p>{props.para1}</p>
                <p>{props.para2}</p>
                <p>{props.para3}</p>
              </div>
              <GoButton onClick={props.onButtonClick} />
            </div>
            <div className={sectionImageClass}>
              <img src={props.image} alt="" />
            </div>
          </>
        ) : (
          <>
            <div className={classes["section-image"]}>
              <img src={props.image} alt="" />
            </div>
            <div className={classes["section-desc"]}>
              <div className={classes["section-text"]}>
                <p>{props.para1}</p>
                <p>{props.para2}</p>
                <p>{props.para3}</p>
              </div>
              <GoButton onClick={props.onButtonClick}/>
            </div>
          </>
        )}
      </div>
      <div className={classes.divider}></div>
    </div>
  );
};

export default SectionComponent;

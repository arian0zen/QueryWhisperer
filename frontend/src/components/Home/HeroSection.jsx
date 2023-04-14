import React from "react";
import classes from "./HeroSection.module.css";
import heroImage from "../../assets/hero-png.png";;
const HeroSectionComponent = (props) => {
  return (
        <div className={classes.hero} id={props.id}>

          <div className={classes["hero-content"]}>
            <div className={classes["content-text"]}>
              Teach the bot and <br />
              <span>let it teach you !!</span>
            </div>
            <div className={classes["content-desc"]}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
              reiciendis eius eveniet temporibus velit{" "}
              <span>enim iusto sapiente</span> culpa inventore exercitationem
              quaerat a assumenda vel suscipit perferendis doloribus, adipisci
              quam et.
            </div>
            <a href="#qna-section">
              <div className={classes["content-button"]}>try it now..</div>
            </a>
          </div>
          <div className={classes["hero-image"]}>
            <img src={heroImage} alt="hero" />
          </div>
        </div>
  );
};

export default HeroSectionComponent;

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
            Unleash the power of AI with QueryWhisperer! Get instant answers to your questions about YouTube videos. Our advanced technology generates transcripts from video audio, enabling you to easily extract valuable insights. <span>Try QueryWhisperer today</span> and elevate your video exploration to a whole new level!
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

import React from "react";
import classes from "./HeroSection.module.css";
import heroImage from "../../assets/bot.png";;
const HeroSectionComponent = (props) => {
  return (
        <div className={classes.hero} id={props.id}>
          <div className={classes["hero-container"]}>
          <div className={classes.texts}>
              <h1>
                Join the AI revelution with Query<span className={classes["gradient-span"]}>Whisperer</span>
              </h1>
              <p>
                Discover the smarter way to explore Youtube videos with our advance transcription technology. You can teach and learn from your own bot and get instant answer to your video queries. Plus we are always working on new updates and features to make your video exploration even better. Stay tuned!
              </p>
              <button className={classes.buttons}>Try Now</button>
          </div>
          <div className={classes["image-container"]}>
          <img src={heroImage} alt="" />

          </div>

          </div>
          
        </div>
  );
};

export default HeroSectionComponent;

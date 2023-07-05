import React from "react";
import Card from "../UI/Card/Card";
import classes from "./HomePage.module.css";
import HeroSectionComponent from "./HeroSection";
import qnaImage from "../../assets/qna-png.png";
import uploadImage from "../../assets/upload-png.png";
import SectionComponent from "./Section";

const HomeComponent = (props) => {
    
  return (
      <Card>
        <div className={classes["home-page"]}>
            <HeroSectionComponent id="hero-section"/>

            {/* <SectionComponent id="uploader-section" heading1="Teach the bot, what" heading2="You want to learnn!" image={uploadImage} para1="Give it a youtube video" para2="Or maybe a PDF" para3="Train it now" onButtonClick={props.onTeachIt} />

            <SectionComponent id="qna-section" heading1="Ask anything.." heading2="I mean almost anything !!" image={qnaImage} para1="Have you trained it already ?" para2="well, now it's your own ChatGPT !!" para3="Try asking it something.." flip={true} onButtonClick={props.onAskIt} /> */}
        </div>
      </Card>
  );
};

export default HomeComponent;

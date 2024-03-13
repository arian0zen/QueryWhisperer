import React, { useState, useRef } from "react";
import Card from "../UI/Card/Card";
import classes from "./UploadComponent.module.css";
import GoHomeButton from "../UI/Buttons/GoHome";
import loadingGif from "../../assets/loading-crop.gif";
import axios from "axios";

const UploadComponent = (props) => {
  const [Error, setError] = useState(null);
  const [Loading, setLoading] = useState(null);
  const [Success, setSuccess] = useState(null);
  const linkRef = useRef("");

  const formInputClass = Error ? classes["form-error"] : "";

  const inputChangeHandler = (event) => {
    if (linkRef.current.value.trim().length > 0) {
      setError(null);
      setSuccess(null);
    }
    return;
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredLink = linkRef.current.value;
    if (
      enteredLink.trim().length === 0 ||
      (!enteredLink.includes("youtube.com") && !enteredLink.includes("youtu.be"))
    ) {
      setError("Please enter a valid YouTube URL");
      return;
    }
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      // Set the origin header to your server's domain
      const axiosConfig = {
        headers: {
          'origin': 'https://transcript-generation-ft-ai-react.vercel.app',
        }
      };
      const response = await axios.post(
        "https://transcript-generator-api.onrender.com/api/transcript",
        {
          url: enteredLink,
        },
        axiosConfig
      );
      setLoading(false);
      if (response.data.error) {
        if(response.data.error === `The "data" argument must be of type string or an instance of Buffer, TypedArray, or DataView. Received undefined`){
            setError("Ohh hoo! Probably my OpenAI trial is over, hey! would you sponsor me ? 🥺")
            setSuccess(null);
            return;
        }
        setError(response.data.error);
        setSuccess(null);
        return;
      }
      setSuccess(`Success: ${response.data.message}`);
      setError(null);
      return;
    } catch (error) {
      setLoading(false);
      setError(error.message);
      setSuccess(null);
      return;
    }
  };
  return (
    <Card>
      <div className={classes["upload-component"]}>
        <div className={classes["upload-component-content"]}>
          <p>Submit the Youtube Video Link</p>
          <small>
            Please make sure the video is no longer than 23 minutes.. <br />I am
            working on it to make the video limit longer
          </small>
          <form
            action=""
            className={classes["upload-form"]}
            onSubmit={submitHandler}
          >
            <input
              onChange={inputChangeHandler}
              ref={linkRef}
              className={formInputClass}
              type="text"
              placeholder="Enter the link here"
            />
            <button type="submit" disabled={Loading}>
              Submit
            </button>
          </form>
        </div>
        {Error && <p className={classes["error-message"]}>{Error}</p>}
        {Loading && (
          <div className={classes["loading-message"]}>
            <img className={classes["loading"]} src={loadingGif} alt="loading" />
            Loading... Please wait, this may take a while
          </div>
        )}
        {Success && <p className={classes["success-message"]}>{Success}</p>}
      </div>
      <div className={classes["go-back-btn"]}>
        <GoHomeButton onClick={props.onGoBack}></GoHomeButton>
      </div>
    </Card>
  );
};

export default UploadComponent;

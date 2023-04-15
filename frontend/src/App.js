import React, { useState } from "react";
import "./App.css";
import NavBar from "./components/UI/Nav/Nav";
import HomeComponent from "./components/Home/HomePage";
import UploadComponent from "./components/Upload/UploadComponent";
import QnaComponent from "./components/Qna/QnaComponent";
function App() {
  const [isUploadPage, setIsUploadPage] = useState(null);
  const [isQnaPage, setIsQnaPage] = useState(null);

  const teachItButtonHandler = () => {
    if (isUploadPage) {
      setIsUploadPage(false);
    } else {
      setIsUploadPage(true);
      setIsQnaPage(false);
    }
  };
  const askItButtonHandler = () => {
    if (isQnaPage) {
      setIsQnaPage(false);
    } else {
      setIsQnaPage(true);
      setIsUploadPage(false);
    }
  };

  return (
    <div className="app">
      <NavBar
        onTeachIt={teachItButtonHandler}
        onAskIt={askItButtonHandler}
      ></NavBar>
      {isUploadPage && (
        <UploadComponent onGoBack={teachItButtonHandler}></UploadComponent>
      )}
      {isQnaPage && <QnaComponent onGoBack={askItButtonHandler}></QnaComponent>}
      {!isUploadPage && !isQnaPage && (
        <HomeComponent
          onTeachIt={teachItButtonHandler}
          onAskIt={askItButtonHandler}
        ></HomeComponent>
      )}
    </div>
  );
}

export default App;

// isUploadPage ? (
//   <UploadComponent onGoBack={teachItButtonHandler}></UploadComponent>
// ) : isQnaPage ? (
//   <QnaComponent onGoBack={askItButtonHandler}></QnaComponent>
// ) : (
//   <HomeComponent onTeachIt={teachItButtonHandler} onAskIt={askItButtonHandler}></HomeComponent>
// )

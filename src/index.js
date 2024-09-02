import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Mainlist from "./Mainlist";
import cover from "./assets/cover.png";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <img
      src={cover}
      id="cover"
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        zIndex: 99999,
        height: window.innerHeight,
        width: window.innerWidth,
        animationName:"fadenum",
        animationFillMode:"forwards",
        animationDuration: "1s",
      }}
    />
    <Mainlist />
    {/* <App /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

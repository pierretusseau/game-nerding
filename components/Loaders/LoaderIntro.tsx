import React from "react";
import "./LoaderIntro.css";

function LoaderIntro() {
  return (
    <div className="loader-intro h-full">
      <p>Loading</p>
      <span className="loader"></span>
    </div>
  );
}

export default LoaderIntro;

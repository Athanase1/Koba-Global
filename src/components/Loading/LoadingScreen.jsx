import React from "react";
import "./LoadingScrren.css";
import Logo from "../../assets/images/Smash/Logo.png"

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="spinner">
        <img src={Logo} alt="logo" />
      </div>
      <p>Chargement en cours...</p>
    </div>
  );
};

export default LoadingScreen;

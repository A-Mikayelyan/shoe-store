// src/pages/Home.jsx
import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-wrapper">
      <img 
        src="/images/backgrimage.jpg" 
        alt="PELLÉ Collection" 
        className="hero-img"
        loading="eager"
      />
      
      <div className="hero-overlay">
        <h1 className="hero-title">PELLÉ</h1>
        <div className="hero-links">
          <a href="/mens" className="hero-link">MEN'S NEW IN</a>
          <a href="/womens" className="hero-link">WOMEN'S NEW IN</a>
        </div>
      </div>
    </div>
  );
};

export default Home;
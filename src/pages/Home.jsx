import React from "react";
import "./Home.css";
import { NavLink } from "react-router-dom";

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
        <div className="hero-text-container">
          <h1 className="hero-title">INTRODUCING PRE-FALL 2025</h1>
          <span className="hero-subtitle">Artisanal Heritage in Motion</span>
          <NavLink className="hero-link hero-discover" to="/men/all">
            DISCOVER MORE
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Home;

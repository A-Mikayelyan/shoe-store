import React, { useState, useEffect, useRef } from "react";
import { useParams, NavLink, Link } from "react-router-dom";
import { SHOE_API } from "../constants/api";
import Contact from "../pages/Contact"; // ✅ Reuse your existing Contact component
import "./ShoeCategoryPage.css";

const menCategories = [
  { label: "View All", path: "all" },
  { label: "Loafers", path: "loafers" },
  { label: "Sandals", path: "sandal" },
  { label: "Boots", path: "boots" },
  { label: "Sneakers", path: "sneakers" },
];

const categoryHeroImages = {
  loafers: "/images/loafers-hero.png",
  sneakers: "/images/sneakers-hero.png",
  boots: "/images/boots-hero.png",
  sandal: "/images/sandals-hero.png",
  all: "/images/all-men-hero.png",
};

const ShoeCategoryPage = () => {
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const sortRef = useRef(null);
  const { category } = useParams();
  const [sortOrder, setSortOrder] = useState("default");
  const normalizedCategory = category.toLowerCase().replace(/s$/, "");

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setShowSortDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredShoes =
    normalizedCategory === "all"
      ? SHOE_API
      : SHOE_API.filter((shoe) =>
          shoe.name.toLowerCase().includes(normalizedCategory)
        );

  const sortedShoes = [...filteredShoes].sort((a, b) => {
    if (sortOrder === "lowToHigh") return a.price - b.price;
    if (sortOrder === "highToLow") return b.price - a.price;
    return 0;
  });

  return (
    <div className="men-page">
      {/* Title */}
      <h2 className="page-title">
        {normalizedCategory === "all"
          ? "MEN'S SHOES"
          : "MEN'S " + normalizedCategory.toUpperCase() + "S"}
      </h2>

      {/* Nav + Sort */}
      <div className="category-top-row">
        <div className="category-row-inner">
          <div className="category-nav-bar">
            {menCategories.map((cat) => (
              <NavLink
                key={cat.path}
                to={`/men/${cat.path}`}
                className={({ isActive }) =>
                  isActive ? "category-link active" : "category-link"
                }
              >
                {cat.label}
              </NavLink>
            ))}
          </div>

          <div className="custom-sort-wrapper" ref={sortRef}>
            <button
              className="sort-toggle-btn"
              onClick={() => setShowSortDropdown((prev) => !prev)}
            >
              Sort By <span className="arrow">{showSortDropdown ? "▲" : "▼"}</span>
            </button>
            {showSortDropdown && (
              <ul className="sort-dropdown">
                <li
                  className={sortOrder === "default" ? "active-sort" : ""}
                  onClick={() => {
                    setSortOrder("default");
                    setShowSortDropdown(false);
                  }}
                >
                  RECOMMENDED
                </li>
                <li
                  className={sortOrder === "lowToHigh" ? "active-sort" : ""}
                  onClick={() => {
                    setSortOrder("lowToHigh");
                    setShowSortDropdown(false);
                  }}
                >
                  PRICE - LOW TO HIGH
                </li>
                <li
                  className={sortOrder === "highToLow" ? "active-sort" : ""}
                  onClick={() => {
                    setSortOrder("highToLow");
                    setShowSortDropdown(false);
                  }}
                >
                  PRICE - HIGH TO LOW
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Shoe Grid */}
      <div className="shoe-grid">
        {sortedShoes.map((shoe) => (
          <Link to={`/shoe/${shoe.id}`} key={shoe.id} className="shoe-card-link">
            <div className="shoe-card">
              <div className="shoe-image-wrapper">
                <img src={shoe.image} alt={shoe.name} className="shoe-img" />
              </div>
              <p className="shoe-name">{shoe.name}</p>
              <p className="shoe-price">€ {shoe.price.toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* ✅ Always show Contact section at bottom */}
      <div className="contact-footer-wrapper">
        <div className="contact-embed-box">
          <Contact />
        </div>
      </div>
    </div>
  );
};

export default ShoeCategoryPage;

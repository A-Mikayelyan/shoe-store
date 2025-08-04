// src/pages/ShoeCategoryPage.jsx
import React from "react";
import { SHOE_API } from "../constants/api";
import ShoeCategoryLayout from "./ShoeCategoryLayout";

const menCategories = [
  { label: "View All", path: "all" },
  { label: "Loafers", path: "loafers" },
  { label: "Sandals", path: "sandal" },
  { label: "Boots", path: "boots" },
  { label: "Sneakers", path: "sneakers" },
];

const menHeroImages = {
  loafers: "/images/loafers-hero.png",
  sneakers: "/images/sneakers-hero.png",
  boots: "/images/boots-hero.png",
  sandal: "/images/sandals-hero.png",
  all: "/images/all-men-hero.png",
};

const ShoeCategoryPage = () => (
  <ShoeCategoryLayout
    title="Men's"
    categories={menCategories}
    shoes={SHOE_API}
    heroImages={menHeroImages}
    baseRoute="men"
  />
);

export default ShoeCategoryPage;

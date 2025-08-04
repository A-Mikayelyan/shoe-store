// src/pages/WomenCategoryPage.jsx

import { WOMEN_SHOE_API } from "../constants/api";
import ShoeCategoryLayout from "./ShoeCategoryLayout";

const womenCategories = [
  { label: "View All", path: "all" },
  { label: "Sneakers", path: "sneaker" },
  { label: "Loafers", path: "loafer" },
  { label: "Sandals", path: "sandal" },
  { label: "Heels", path: "heel" },
];

const womenHeroImages = {
  loafer: "/images/women-loafers-hero.png",
  sneaker: "/images/women-sneakers-hero.png",
  sandal: "/images/women-sandals-hero.png",
  heel: "/images/women-heels-hero.png",
  all: "/images/all-women-hero.png",
};

const WomenCategoryPage = () => (
  <ShoeCategoryLayout
    title="Women's"
    categories={womenCategories}
    shoes={WOMEN_SHOE_API}
    heroImages={womenHeroImages}
    baseRoute="women"
  />
);

export default WomenCategoryPage;

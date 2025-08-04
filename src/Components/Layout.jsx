import { Link, NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import CartDrawer from "../CartDrawer";
import SummaryDrawer from "./SummaryDrawer";
import "./Layout.css";
import { useRef, useState } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useCartDrawer } from "../context/CartDrawerContext";
import AiChatBot from "./AiChatbot";

export const menCategories = [
  { name: "SNEAKERS", path: "/men/sneakers" },
  { name: "LOAFERS", path: "/men/loafers" },
  { name: "BOOTS", path: "/men/boots" },
  { name: "SANDALS", path: "/men/sandals" },
  { name: "VIEW ALL", path: "/men/all" },
];

export const womenCategories = [
  { name: "SNEAKERS", path: "/women/sneaker" },
  { name: "LOAFERS", path: "/women/loafer" },
  { name: "HEELS", path: "/women/heel" },
  { name: "SANDALS", path: "/women/sandal" },
  { name: "VIEW ALL", path: "/women/all" },
];

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isManHovered, setIsManHovered] = useState(false);
  const [isWomanHovered, setIsWomanHovered] = useState(false);
  const { openCartDrawer } = useCartDrawer();
  const hoverTimeOut = useRef(null);

  const isCheckout = location.pathname.startsWith("/checkout");

  return (
    <div className="layout-wrapper">
      {!isCheckout && (
        <nav className="navbar">
          <div className="nav-container">
            {/* Left-aligned group */}
            <div className="nav-left-group">
              <button className="logo-button" onClick={() => navigate("/")}>
                P E L L É
              </button>
              <div className="nav-links">
                {/* MAN nav */}
                <div
                  className="man-nav-wrapper"
                  onMouseEnter={() => setIsManHovered(true)}
                  onMouseLeave={() => setIsManHovered(false)}
                  style={{ position: "relative" }}
                >
                  <span className="nav-link man-link">MAN</span>
                  {isManHovered && (
                    <div className="dropdown-grid" style={{ left: "0" }}>
                      {menCategories.map((category) => (
                        <Link
                          key={category.name}
                          to={category.path}
                          className="category-grid-item"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* WOMAN nav */}
                <div
                  className="woman-nav-wrapper"
                  onMouseEnter={() => setIsWomanHovered(true)}
                  onMouseLeave={() => setIsWomanHovered(false)}
                  style={{ position: "relative" }}
                >
                  <span className="nav-link woman-link">WOMAN</span>
                  {isWomanHovered && (
                    <div className="dropdown-grid" style={{ left: "0" }}>
                      {womenCategories.map((category) => (
                        <Link
                          key={category.name}
                          to={category.path}
                          className="category-grid-item"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* ABOUT */}
                <NavLink to="/about" className="nav-link">
                  ABOUT
                </NavLink>
              </div>
            </div>

            {/* Right-aligned group */}
            <div className="nav-right-group">
              <div
                className="cart-icon-wrapper"
                onMouseEnter={() => {
                  hoverTimeOut.current = setTimeout(openCartDrawer, 400);
                }}
                onMouseLeave={() => {
                  clearTimeout(hoverTimeOut.current);
                }}
              >
                <HiOutlineShoppingBag size={27} className="icon-link" />
              </div>

              <NavLink to="/favorites" className="nav-link icon-link">
                <span className="heart-icon">♥</span>
              </NavLink>
            </div>
          </div>
        </nav>
      )}

      {/* Main content */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* Global components */}
      {!isCheckout && (
        <>
          <CartDrawer />
          <AiChatBot />
        </>
      )}
      <SummaryDrawer />
    </div>
  );
};

export default Layout;

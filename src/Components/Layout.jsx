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

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isManHovered, setIsManHovered] = useState(false);
  const { openCartDrawer } = useCartDrawer();
  const hoverTimeOut = useRef(null);

  const isCheckout = location.pathname.startsWith("/checkout");
  const isShoeDetail = location.pathname.startsWith("/shoe/");

  return (
    <div className="layout-wrapper">
      {/* ✅ Hide navbar on checkout */}
      {!isCheckout && (
        <nav className="navbar">
          <div className="nav-container">
            {/* Left-aligned group (logo + nav-links) */}
            <div className="nav-left-group">
              <button className="logo-button" onClick={() => navigate("/")}>
                P E L L É
              </button>
              <div className="nav-links">
                <div
                  className="man-nav-wrapper"
                  onMouseEnter={() => setIsManHovered(true)}
                  onMouseLeave={() => setIsManHovered(false)}
                >
                  <span className="nav-link man-link">MAN</span>
                  {isManHovered && (
                    <div className="category-grid-dropdown">
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

                <NavLink to="/about" className="nav-link">
                  ABOUT
                </NavLink>
                <NavLink to="/contact" className="nav-link">
                  CONTACT
                </NavLink>
              </div>
            </div>

            {/* Right-aligned group (cart, favorites, etc.) */}
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

      {/* ✅ Routed content */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* ✅ Global components */}
      {!isCheckout && (
        <>
          <CartDrawer />
          <AiChatBot /> {/* ✅ Chatbot rendered globally except on checkout */}
        </>
      )}
      <SummaryDrawer />
    </div>
  );
};

export default Layout;

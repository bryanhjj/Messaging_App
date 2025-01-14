import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

// get some mui icons

export default function Navbar () {
    const [isExpanded, setIsExpanded] = useState(false);
    const expandMenu = () => setIsExpanded(true);
    const collapseMenu = () => setIsExpanded(false);

    return (
      <>
        <nav className="sidebar">
            {/* Mobile only. This button will open the menu */}
            <button
                  className="menuToggle"
                  aria-label="open-menu"
                  onClick={expandMenu}
            >
              <span className="">Insert MUI icon here</span>
            </button>
            <div
              className={`${isExpanded ? "expanded" : "not-expanded"}`}
            >
              <button
                  className="close-button"
                  onClick={collapseMenu}
                  aria-label="close-menu"
              >
                X
              </button>
              <ul className="link-container">
                  <li>
                      <Link
                          onClick={collapseMenu}
                          className="link"
                          to="/profile"
                      >
                          Profile
                      </Link>
                </li>
                <li>
                      <Link
                          onClick={collapseMenu}
                          className="link"
                          to="/users"
                      >
                          User setting
                      </Link>
                </li>
              </ul>
            </div>
          </nav>
          <div className="content">
            <Outlet />
          </div>
      </>
        
      );
};

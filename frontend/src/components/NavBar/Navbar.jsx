import { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";
import styles from "./Navbar.module.css";

// get some mui icons

export function Navbar () {
    const [isExpanded, setIsExpanded] = useState(false);

    const expandMenu = () => setIsExpanded(true);
    const collapseMenu = () => setIsExpanded(false);

    return (
        <nav className={styles.nav}>
          {/* Mobile only. This button will open the menu */}
          <button
                className={styles.menuToggle}
                aria-label="open-menu"
                aria-expanded={isExpanded}
                onClick={expandMenu}
          >
            <span className={styles.hamburger}>Insert MUI icon here</span>
          </button>
          <div
            className={`${isExpanded ? styles.mobileNav : styles.navListWrapper}`}
          >
            <button
                className={styles.menuToggleOff}
                onClick={collapseMenu}
                aria-label="close-menu"
            >
              X
            </button>
            <ul className={styles.navList}>
                <li>
                    <Link
                        onClick={collapseMenu}
                        className={styles.navLink}
                        to="/profile"
                    >
                        Profile
                    </Link>
              </li>
              <li>
                    <Link
                        onClick={collapseMenu}
                        className={styles.navLink}
                        to="/friends"
                    >
                        Friends
                    </Link>
              </li>
              <li>
                    <Link
                        onClick={collapseMenu}
                        className={styles.navLink}
                        to="/users"
                    >
                        User setting
                    </Link>
              </li>
            </ul>
          </div>
        </nav>
      );
};

Navbar.propTypes = {
    userImg: PropTypes.string,
};
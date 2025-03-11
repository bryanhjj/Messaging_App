import { useState, useContext, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import "./Navbar.css";
import { UserContext } from "../Users/UserContext";

// get some mui icons
import MenuIcon from '@mui/icons-material/Menu';

export default function Navbar () {
    const [isExpanded, setIsExpanded] = useState(false);
    const [user] = useContext(UserContext);

    const toggleExpand = () => {
      setIsExpanded(!isExpanded);
    };

    return (
      <div className="root">
        <nav className="navbar">

          {/* navbar for mobile devices */}
          <div className="mobilebar">

            <button className="menuToggle" onClick={toggleExpand}>
              <MenuIcon />
            </button>
          
            <div className={`${isExpanded ? "expanded" : "not-expanded"}`} >
              <button className={`${isExpanded ? "close-menu" : "hidden-close-menu"}`} onClick={toggleExpand}>
                X
              </button>
              {user ?
              <ul className="link-container">
                <li>
                  <Link
                    onClick={toggleExpand}
                    className="link"
                    to={`profile/${user.id}`}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={toggleExpand}
                    className="link"
                    to="user/edit"
                  >
                    Edit user details
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={toggleExpand}
                    className="link"
                    to="user/delete"
                  >
                    Delete user account
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={toggleExpand}
                    className="link"
                    to="/logout"
                  >
                    Logout
                  </Link>
                </li>
              </ul>
              : 
              <></>
              }
            </div>
          </div>

          <h1 className="title">blahblah</h1>

          {/* desktop ver of navbar */}
          <div className="desktopbar">
            {user ?
              <ul className="link-container">
                <li>
                  <Link
                    onClick={toggleExpand}
                    className="link"
                    to={`profile/${user.id}`}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={toggleExpand}
                    className="link"
                    to="user/edit"
                  >
                    Edit user details
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={toggleExpand}
                    className="link"
                    to="user/delete"
                  >
                    Delete user account
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={toggleExpand}
                    className="link"
                    to="/logout"
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            : 
              <div></div>
            }
          </div>

        </nav>

        <div className="content">
          <Outlet />
        </div>
        
      </div>
    );
};

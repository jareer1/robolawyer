import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { HamburgetMenuClose, HamburgetMenuOpen } from "./Icons";
import { auth } from "../Firebase/firebaseconfig";
import { signOut } from "firebase/auth";

function NavBar() {
  const [click, setClick] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/", { replace: true });
      
      window.history.pushState(null, null, "/");
      window.addEventListener("popstate", function(event) {
        window.history.pushState(null, null, "/");
      });
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            <span>Robo Lawyer</span>
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={() => setClick(false)}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/OurTeam"
                activeClassName="active"
                className="nav-links"
                onClick={() => setClick(false)}
              >
                Our Team
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/Login"
                activeClassName="active"
                className="nav-links"
                onClick={handleLogout}
              >
                Logout
              </NavLink>
            </li>
          </ul>
          <div className="nav-icon" onClick={() => setClick(!click)}>
            {click ? (
              <span className="icon">
                <HamburgetMenuClose />{" "}
              </span>
            ) : (
              <span className="icon">
                <HamburgetMenuOpen />
              </span>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;

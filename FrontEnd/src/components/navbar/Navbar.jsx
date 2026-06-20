import React, { useState, useContext } from "react";
import "./Navbar.css";
import { assets } from "../../assets/frontend_assets/assets.js";
import { Link } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext.jsx";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const { getTotalCartAmount, token, setToken } =
    useContext(StoreContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setShowProfile(false);
  };

  return (
    <div className="navbar" id="home">
      <Link to="/">
        <img src={assets.logo_2} alt="Logo" className="logo" />
      </Link>

      <div
        className="hamburger"
        onClick={() => setMobileMenu(!mobileMenu)}
      >
        ☰
      </div>

      {mobileMenu && (
        <div
          className="menu-overlay"
          onClick={() => setMobileMenu(false)}
        />
      )}

      <ul className={`navbar-menu ${mobileMenu ? "open" : ""}`}>
        <Link
          to="/"
          onClick={() => {
            setMenu("home");
            setMobileMenu(false);
          }}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>

        <a
          href="#explore-menu"
          onClick={() => {
            setMenu("menu");
            setMobileMenu(false);
          }}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </a>

        <a
          href="#app-download"
          onClick={() => {
            setMenu("mobile-app");
            setMobileMenu(false);
          }}
          className={menu === "mobile-app" ? "active" : ""}
        >
          Mobile App
        </a>

        <a
          href="#footer"
          onClick={() => {
            setMenu("contact");
            setMobileMenu(false);
          }}
          className={menu === "contact" ? "active" : ""}
        >
          Contact Us
        </a>
      </ul>

      <div className="navbar-right">
        <img src={assets.search_icon} alt="Search" />

        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="Cart" />
          </Link>

          <div
            className={getTotalCartAmount() === 0 ? "" : "dot"}
          ></div>
        </div>

        {!token ? (
          <button onClick={() => setShowLogin(true)}>
            Sign In
          </button>
        ) : (
          <div className="navbar-profile">
            <img
              src={assets.profile_icon}
              alt="Profile"
              onClick={() => setShowProfile(!showProfile)}
              style={{ cursor: "pointer" }}
            />

            {showProfile && (
              <ul className="nav-profile-dropdown">
                <li>
                  <img src={assets.bag_icon} alt="" />
                  <p>Orders</p>
                </li>

                <hr />

                <li onClick={logout}>
                  <img src={assets.logout_icon} alt="" />
                  <p>Logout</p>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
import React from "react";
import "./Header.css";
import headerImg from "../../assets/header_img.png";

const Header = () => {
  return (
    <div
      className="header"
      style={{ backgroundImage: `url(${headerImg})` }}
    >
      <div className="header-contents">
        <h1>Order Your Favorite Food Here</h1>
        <p>
          Explore our diverse menu featuring a delicious selection of dishes,
          carefully crafted with the finest ingredients and exceptional culinary
          expertise. Whether you're craving comfort food or something new and
          exciting, we're here to satisfy your appetite and elevate your dining
          experience—one delightful meal at a time.
        </p>
        <button>View Menu</button>
      </div>
    </div>
  );
};

export default Header;
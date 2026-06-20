import React, { useState } from "react";
import "./Sidebar.css";
import { assets } from "../../Assets/admin_assets/assets.js";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({
    x: 15,
    y: 70,
  });

  const startDrag = (e) => {
    const startX = e.clientX || e.touches[0].clientX;
    const startY = e.clientY || e.touches[0].clientY;

    const offsetX = startX - position.x;
    const offsetY = startY - position.y;

    const handleMove = (event) => {
      const clientX = event.clientX || event.touches[0].clientX;
      const clientY = event.clientY || event.touches[0].clientY;

      setPosition({
        x: clientX - offsetX,
        y: clientY - offsetY,
      });
    };

    const stopDrag = () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", stopDrag);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("touchend", stopDrag);
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", stopDrag);
    document.addEventListener("touchmove", handleMove);
    document.addEventListener("touchend", stopDrag);
  };

  return (
    <>
      <div
        className="hamburger"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
        onMouseDown={startDrag}
        onTouchStart={startDrag}
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </div>

      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-options">
          <NavLink
            to="/add"
            className="sidebar-option"
            onClick={() => setIsOpen(false)}
          >
            <img src={assets.add_icon} alt="" />
            <p>Add Items</p>
          </NavLink>

          <NavLink
            to="/list"
            className="sidebar-option"
            onClick={() => setIsOpen(false)}
          >
            <img src={assets.order_icon} alt="" />
            <p>List Items</p>
          </NavLink>

          <NavLink
            to="/orders"
            className="sidebar-option"
            onClick={() => setIsOpen(false)}
          >
            <img src={assets.order_icon} alt="" />
            <p>Orders</p>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
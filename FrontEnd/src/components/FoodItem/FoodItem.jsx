import React, { useState, useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/frontend_assets/assets.js";
import { StoreContext } from "../../Context/StoreContext.jsx"

const FoodItem = ({ id, name, price, description, image }) => {
  const {cartItems, addToCart, removeFromCart} = useContext(StoreContext)
  const quantity = cartItems[id] || 0
  
  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-img" src={image} alt={name} />

        {quantity > 0 && (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt="remove"
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt="add"
            />
          </div>
        )}
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <p className="food-item-price">${price}</p>
        </div>
      </div>

      {quantity === 0 && (
        <button className="add-btn" onClick={() => addToCart(id)}>
          🛒 Add to Cart
        </button>
      )}

      <button className="order-btn">Order Now</button>
    </div>
  );
};

export default FoodItem;

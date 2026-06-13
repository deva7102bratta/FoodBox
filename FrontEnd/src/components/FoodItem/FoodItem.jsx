import React, { useState, useContext } from "react";
import {useNavigate} from "react-router-dom"
import "./FoodItem.css";
import { assets } from "../../assets/frontend_assets/assets.js";
import { StoreContext } from "../../Context/StoreContext.jsx"

const FoodItem = ({ id, name, price, description, image }) => {
  const {cartItems, addToCart, removeFromCart} = useContext(StoreContext)
  const quantity = cartItems[id] || 0
  const navigate = useNavigate()
  
  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-img" src={image} alt={name} />

        {!quantity
        ?<img className="add-food" onClick={() => addToCart(id)} src={assets.add_icon_white}/>
        :(
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

      <button
        className="order-btn"
        onClick={() =>
          navigate("/ordernow", {
            state: {
              id,
              name,
              price,
              image,
              quantity: cartItems[id] || 1,
              total: (cartItems[id] || 1) * price,
            },
          })
        }
      >
        Order Now
      </button>
    </div>
  );
};

export default FoodItem;

import React, { useState, useEffect } from "react";
import "./OrderNow.css";
import { useLocation } from "react-router-dom";

const OrderNow = () => {
  const { state } = useLocation();

  const price = state?.price || 0;

  // Store quantity as text while typing
  const [quantity, setQuantity] = useState(
    state?.quantity?.toString() || "0"
  );

  const qty = Number(quantity) ;

  const subtotal = price * qty;
  const deliveryFee = qty > 0 ? 250 : 0;
  const total = subtotal + deliveryFee;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <form className="place-order" id="place-order">
      {/* Left Side */}
      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="multi-fields">
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
        </div>

        <input type="email" placeholder="Email Address" />
        <input type="text" placeholder="Street" />

        <div className="multi-fields">
          <input type="text" placeholder="City" />
          <input type="text" placeholder="State" />
        </div>

        <div className="multi-fields">
          <input type="text" placeholder="Zip Code" />
          <input type="text" placeholder="Country" />
        </div>

        <input type="text" placeholder="Phone Number" />
      </div>

      {/* Right Side */}
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Order Totals</h2>

          <div className="quantity-update">
            <label htmlFor="quantity">
              Quantity (changes total price)
            </label>

            <input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="qty"
            />
          </div>

          <hr />

          <div className="cart-total-details">
            <p>Quantity</p>
            <p>{qty}</p>
          </div>
          
          <hr />
          
          <div className="cart-total-details">
            <p>Price</p>
            <p>₹{price}</p>
          </div>

          <hr />


          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>₹{subtotal}</p>
          </div>

          <hr />

          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>₹{deliveryFee}</p>
          </div>

          <hr />

          <div className="cart-total-details">
            <b>Total</b>
            <b>₹{total}</b>
          </div>

          <button type="submit">
            PROCEED TO PAYMENT
          </button>
        </div>
      </div>
    </form>
  );
};

export default OrderNow;
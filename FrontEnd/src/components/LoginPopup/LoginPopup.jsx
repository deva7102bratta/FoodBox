import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/frontend_assets/assets.js";
import { StoreContext } from "../../Context/StoreContext.jsx";
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);

  const [currState, setCurrState] = useState("Sign Up");
  const [showPassword, setShowPassword] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onLogin = async (event) => {
    event.preventDefault();

    try {
      let newUrl = url;

      if (currState === "Log In") {
        newUrl += "/api/user/login";
      } else {
        newUrl += "/api/user/register";
      }

      const response = await axios.post(newUrl, data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={onLogin}>
        <div className="login-popup-title">
          <h1>{currState}</h1>
          <img
            src={assets.cross_icon}
            alt="Close"
            onClick={() => setShowLogin(false)}
          />
        </div>

        <div className="login-popup-inputs">
          {currState === "Sign Up" && (
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={data.name}
              onChange={onChangeHandler}
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={data.email}
            onChange={onChangeHandler}
            required
          />

          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={onChangeHandler}
              required
            />

            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👀"}
            </span>
          </div>
        </div>

        <button type="submit">
          {currState === "Sign Up" ? "Create Account" : "Log In"}
        </button>

        <div className="login-popup-conditions">
          <input type="checkbox" required />
          <p>
            By continuing, I agree to the terms of use &amp; privacy policy.
          </p>
        </div>

        {currState === "Log In" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click Here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Log In")}>Log In</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
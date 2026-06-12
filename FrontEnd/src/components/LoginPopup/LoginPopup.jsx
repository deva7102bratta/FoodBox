import React, {useState} from "react"
import "./LoginPopup.css"
import {assets} from "../../assets/frontend_assets/assets.js"

const LoginPopup = ({setShowLogin})=>{
  const [currState, setcurrState] = useState("Sign Up")
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className = "login-popup">
      <form className="login-popup-container">
        <div className="login-popup-title">
          <h1>{currState}</h1>        
          <img onClick = {()=>setShowLogin(false)} src={assets.cross_icon} />
        </div>
        <div className="login-popup-inputs">
          {currState==="Log In"?<></>:<input type="text" placeholder="Your Name" required></input>}
          <input type="email" placeholder="Your Email" required></input>
        <div className="password-field">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
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
        <button>{currState==="Sign Up"?"Create Account":"Log In"}</button>
        <div className="login-popup-conditions">
          <input type="checkbox" required></input>
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>
          {currState==="Log In"
          ?<p>Create a new account? <span onClick={()=>setcurrState("Sign Up")}>Click Here</span></p>
          :<p>Already have an account? <span onClick={()=>setcurrState("Log In")}>Log In</span></p>
          }
      </form>
    </div>
  )
}
export default LoginPopup
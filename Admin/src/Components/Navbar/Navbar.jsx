import React from "react"
import "./Navbar.css"
import {assets } from "../../Assets/admin_assets/assets.js"

const Navbar = ()=>{
  return (
    <div className="navbar">
    <a
  href="https://foodbolg.netlify.app"
  target="_blank"
  rel="noopener noreferrer"
    >
     <img className="logo" src={assets.logo_2} alt="Logo" />
    </a>
      <img className="profile" src={assets.profile_image} />
    </div>
  )
}
export default Navbar
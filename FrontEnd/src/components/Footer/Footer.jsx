import React from 'react'
import {Link} from "react-router-dom"
import './Footer.css'
import { assets } from '../../assets/frontend_assets/assets.js'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <Link to="/"><img src={assets.logo_2} alt="" width="200px"/></Link>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                   <img
                      src={assets.ig_icon}
                      alt="Instagram"
                      onClick={() =>
                        window.open(
                          "https://www.instagram.com/foodbox_imphal?igsh=Y2hrZHllcGhkZ3pl",
                          "_blank",
                          "noopener,noreferrer"
                        )
                      }
                      style={{ cursor: "pointer" }}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          window.open(
                            "https://www.instagram.com/foodbox_imphal?igsh=Y2hrZHllcGhkZ3pl",
                            "_blank",
                            "noopener,noreferrer"
                          );
                        }
                      }}
                    />
                </div>
            </div>
            
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+91 9863645438</li>
                    <li>contact@tomato.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">Copyright 2024 © FoodBox.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer

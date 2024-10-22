import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={assets.logo} alt="" className='footer-logo' />
                    <p> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque corrupti nihil nesciunt quas, fuga ipsa aperiam, dolorem quos reiciendis similique ducimus! Perferendis, nobis? Eius nisi sapiente corrupti, sit, enim asperiores in, quia quo mollitia amet distinctio? Aliquid nisi porro deleniti?</p>
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
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
                    <h2>get in Touch</h2>
                    <ul>
                        <li>+91 9876543210</li>
                        <li>contact@foodie.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className='footer-copyright'>Copyright 2024  FoodieWoodie.com - All Rights Reserved</p>
        </div>
    )
}

export default Footer
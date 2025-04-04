import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import axios from 'axios';
import { toast } from 'react-toastify';

const LoginPopup = ({ setShowLogin }) => {

    const [data, setData] = useState({
        name: "",
        email: "foodieWoodie@gmail.com",
        password: "foodie@2025"
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    }

    const onLogin = async (event) => {
        event.preventDefault();

        const email = "foodieWoodie@gmail.com";
        const password = "foodie@2025";

        if (data.email == email) {
            setShowLogin(false);
            toast.success("Successfull Login...");

        }
        else {
            toast.error("Unauthorized User...");
        }
    }

    return (
        <div className='login-popup'>
            <form className="login-popup-container" onSubmit={onLogin}>
                <div className="login-popup-title">
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    <input type="email" onChange={onChangeHandler} value={data.email} name="email" placeholder='Your email' required />
                    <input type="password" onChange={onChangeHandler} value={data.password} name="password" placeholder='Password' required />
                </div>
                <div className="login-popup-condition">
                    <input type="checkbox" name="" id="" required />
                    <p>By continuing , I agree to the terms of use & privacy policy.</p>
                </div>
                <button type="submit">Login</button>
                <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>

            </form>
        </div>
    )
}

export default LoginPopup
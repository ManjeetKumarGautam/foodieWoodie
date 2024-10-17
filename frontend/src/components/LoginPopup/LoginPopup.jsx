import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import axios from 'axios';
import { toast } from 'react-toastify';
import { StoreContext } from '../../context/StoreContext';

const LoginPopup = ({ setShowLogin }) => {
    const [currState, setCurrState] = useState("Login");

    const { setToken, token, url } = useContext(StoreContext);

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    }

    const onLogin = async (event) => {
        event.preventDefault();

        let newUrl = url;

        if (currState === "Login") {
            newUrl += "/api/user/login";

        }
        else {
            newUrl += "/api/user/register";
        }

        const response = await axios.post(newUrl, data);

        if (response.data.success) {
            console.log(response);
            setShowLogin(false);
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            toast.success("Successfull Login");

        }
        else {
            alert(response.data.message);
        }
    }

    return (
        <div className='login-popup'>
            <form className="login-popup-container" onSubmit={onLogin}>
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Login" ? <></> : <input type="text" onChange={onChangeHandler} value={data.name} name="name" placeholder='Your Name' />}
                    <input type="email" onChange={onChangeHandler} value={data.email} name="email" placeholder='Your email' />
                    <input type="password" onChange={onChangeHandler} value={data.password} name="password" placeholder='Password' />
                </div>
                <div className="login-popup-condition">
                    <input type="checkbox" name="" id="" required />
                    <p>By continuing , I agree to the terms of use & privacy policy.</p>
                </div>
                <button type="submit">{currState === "Sign Up" ? "Create account" : "Login"}</button>
                {
                    currState === "Login" ?
                        <p>Create a new account <span onClick={() => setCurrState("Sign Up")}>Click here</span></p> :
                        <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
                }
            </form>
        </div>
    )
}

export default LoginPopup
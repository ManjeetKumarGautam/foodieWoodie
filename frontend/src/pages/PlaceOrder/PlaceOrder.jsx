import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
    const { getTotalCartAmount, deliveryAmount, token, food_list, cartItems, url } = useContext(StoreContext);
    const navigate = useNavigate();

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    });

    const [paymentMethod, setPaymentMethod] = useState("cod"); // Default: Online Payment

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const placeOrder = async (event) => {
        event.preventDefault();
        let orderItems = food_list
            .filter(item => cartItems?.[item._id] > 0)
            .map(item => ({ ...item, quantity: cartItems[item._id] }));

        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + deliveryAmount,
            paymentMode: paymentMethod
        };

        if (paymentMethod === "online") {
            // Online Payment Flow
            try {
                let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
                if (response.data.success) {
                    window.location.replace(response.data.session_url);
                } else {
                    alert("Error in processing payment.");
                }
            } catch (error) {
                alert("Something went wrong!");
            }
        } else {
            // Cash on Delivery Flow
            try {
                console.log("cash on delivery.....")
                let response = await axios.post(url + "/api/order/cod", orderData, { headers: { token } });
                if (response.data.success) {
                    toast.success(response.data.message);

                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                toast.error("Something went wrong!");
            }
        }
    };

    useEffect(() => {
        if (!token || getTotalCartAmount() === 0) {
            navigate('/cart');
        }
    }, [token]);

    return (
        <form onSubmit={placeOrder} className='place-order'>
            <div className="place-order-left">
                <p className='title'>Delivery Information</p>
                <div className='multi-fields'>
                    <input required type="text" name='firstName' onChange={onChangeHandler} value={data.firstName} placeholder='First Name' />
                    <input required type="text" name="lastName" onChange={onChangeHandler} value={data.lastName} placeholder='Last Name' />
                </div>
                <input required type="text" name="email" onChange={onChangeHandler} value={data.email} placeholder='Email' />
                <input required type="text" name="street" onChange={onChangeHandler} value={data.street} placeholder='Street' />
                <div className='multi-fields'>
                    <input required type="text" name="city" onChange={onChangeHandler} value={data.city} placeholder='City' />
                    <input required type="text" name="state" onChange={onChangeHandler} value={data.state} placeholder='State' />
                </div>
                <div className='multi-fields'>
                    <input required type="text" name="country" onChange={onChangeHandler} value={data.country} placeholder='Country' />
                    <input required type="text" name="zipcode" onChange={onChangeHandler} value={data.zipcode} placeholder='Pincode' />
                </div>
                <input required type="text" name="phone" onChange={onChangeHandler} value={data.phone} placeholder='Phone Number' />
            </div>

            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div className="cart-total-details">
                        <p>Sub Totals</p>
                        <p>$ {getTotalCartAmount()}</p>
                    </div>
                    <hr />
                    <div className="cart-total-details">
                        <p>Delivery Fee</p>
                        <p>$ {getTotalCartAmount() === 0 ? 0 : deliveryAmount}</p>
                    </div>
                    <hr />
                    <div className="cart-total-details total">
                        <p>Total</p>
                        <p>$ {getTotalCartAmount() === 0 ? 0 : (getTotalCartAmount() + deliveryAmount)}</p>
                    </div>


                    <div className="payment-method">
                        <h2>Select Payment Method:</h2>
                        <label>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="cod"
                                checked={paymentMethod === "cod"}
                                onChange={() => setPaymentMethod("cod")}
                            /> Cash on Delivery
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="online"
                                checked={paymentMethod === "online"}
                                onChange={() => setPaymentMethod("online")}
                            /> Online Payment
                        </label>

                    </div>

                    <button type='submit'>PROCEED TO PAYMENT</button>
                </div>
            </div>
        </form>
    );
};

export default PlaceOrder;

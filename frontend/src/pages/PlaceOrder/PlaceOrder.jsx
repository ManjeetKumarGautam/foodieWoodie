import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
const PlaceOrder = () => {

    const { getTotalCartAmount, deliveryAmount, token, food_list, cartItems, url } = useContext(StoreContext);
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
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    const placeOrder = async (event) => {
        event.preventDefault();
        let orderItems = [];
        food_list.map((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo);
            }
        })
        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 2,
        }
        let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } })
        if (response.data.success) {
            const { session_url } = response.data;
            window.location.replace(session_url);
        }
        else {
            alert("Error");
        }
    }
    const navigate = useNavigate();
    useEffect(() => {
        if (!token) {
            navigate('/cart');
        }
        else if (getTotalCartAmount() == 0) {
            navigate('/cart');
        }
    }, [token])
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
                    <button type='submit'>PROCEED TO PAYMENT</button>

                </div>
            </div>
        </form>
    )
}
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default PlaceOrder
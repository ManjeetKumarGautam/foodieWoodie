import React, { useContext, useEffect } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom';
import { FaTrash } from "react-icons/fa";
import { assets } from '../../assets/assets';
import { toast } from 'react-toastify';
const Cart = ({ setShowLogin }) => {

    const { cartItems, food_list, addToCart, deleteFromCart, removeFromCart, getTotalCartAmount, deliveryAmount, token } = useContext(StoreContext);

    const navigate = useNavigate();

    const navigatorPath = () => {
        token ? navigate('/order') : setShowLogin(true);
    }

    return (
        <div className='cart'>
            <div className="cart-items">
                <div className="cart-items-title cart-items-title-heading">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Qty</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>


                {
                    food_list.map((item, index) => {
                        if (cartItems?.[item._id] > 0) {
                            return (
                                <>
                                    <div key={index} className="cart-items-title cart-items-item">
                                        <p>
                                            <img src={item.image} alt="" />
                                        </p>

                                        <p>{item.name}</p>
                                        <p>$ {item.price}</p>
                                        {/* <p>{cartItems[item.id]}</p> */}
                                        <p >
                                            <div className='qty'>
                                                {
                                                    // cartItems[item._id] == 1 ? '' : <img className='qty-icon' onClick={() => removeFromCart(item._id)} src={assets.remove_icon_red} alt="" />
                                                }
                                                <img className='qty-icon' onClick={() => removeFromCart(item._id)} src={assets.remove_icon_red} alt="" />
                                                <p>{cartItems[item._id]}</p>
                                                <img className='qty-icon' onClick={() => addToCart(item._id)} src={assets.add_icon_green} alt="" />
                                            </div>
                                        </p>
                                        <p>$ {item.price * cartItems[item._id]}</p>
                                        <p className='cross' onClick={() => deleteFromCart(item._id)}><FaTrash /></p>
                                    </div>
                                </>
                            )
                        }
                    })
                }
            </div>


            <div className="cart-bottom">
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
                    <button onClick={() => navigatorPath()}>PROCEED TO CHECKOUT</button>
                </div>

                <div className="cart-prormocode">
                    <div>
                        <p>If you have a promo code, Enter it here</p>
                        <div className="cart-promocode-input">
                            <input type="text" name="" id="" placeholder='Promo Code' />
                            <button type="submit">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
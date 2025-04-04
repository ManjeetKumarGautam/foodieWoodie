import { createContext, useEffect, useState } from "react";
import axios from 'axios'

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({})

    // const url = "https://foodiewoodie-5up0.onrender.com";
    const url = "http://localhost:4000";

    const [token, setToken] = useState("");

    const [food_list, setFood_list] = useState([]);

    const fetchFoodList = async () => {
        const response = await axios.get(`${url}/api/food/list`);
        if (response.data.success) {
            setFood_list(response.data.data);
        }
        else {
            console.log(response.data.message);

        }

    }

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    }, []);


    const addToCart = async (itemId) => {
        if (!cartItems?.[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } })
        }
    }
    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } })
        }
    }
    const deleteFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: null }))
    }

    const deliveryAmount = 10;

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const loadCartData = async (token) => {
        const response = await axios.get(url + "/api/cart/get", {}, { headers: { token } });
        setCartItems(response.data.cartData);
    }

    const contextValue = {
        url,
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        deleteFromCart,
        getTotalCartAmount,
        deliveryAmount,
        token,
        setToken

    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider;
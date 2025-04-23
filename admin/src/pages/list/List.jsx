import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaTrash, FaRegEdit } from 'react-icons/fa';

const List = ({ url, setUpdateFood, setFood }) => {

    const [foodList, setFoodList] = useState([]);

    const fetchFoodList = async () => {

        const response = await axios.get(`${url}/api/food/list`);
        if (response.data.success) {
            setFoodList(response.data.data);
        }
        else {
            toast.error(response.data.message);
        }

    }
    const deleteFoodItem = async (foodId) => {
        const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
        await fetchFoodList();
        if (response.data.success) {
            toast.success(response.data.message);
        }
        else {
            console.log(response.data);
            toast.error(response.data.message);
        }
    }


    useEffect(() => {
        fetchFoodList();
    }, []);


    return (
        <div className="list add flex-col">
            <h1 className='food-list-title'>All Foods List</h1>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                {
                    foodList.map((item, index) => {
                        return (
                            <div key={index} className='list-table-format'>
                                <a href={item.image} target='_tab'>
                                    <img src={item.image} alt="" />
                                </a>
                                <p>{item.name}</p>
                                <p>{item.category}</p>
                                <p>{item.price}</p>
                                <div className='action-btn'>
                                    <p className='cursor' onClick={() => { setUpdateFood(true); setFood(item) }}><FaRegEdit /></p>
                                    <p className='cursor' onClick={() => deleteFoodItem(item._id)}><FaTrash /></p>
                                </div>

                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default List
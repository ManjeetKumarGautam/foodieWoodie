import React from 'react'
import { useState } from 'react';
import { FaTimes } from "react-icons/fa";
import { toast } from 'react-toastify';
import './FoodUpdate.css'
import axios from 'axios';

const FoodUpdate = ({ setUpdateFood, food, url, setFood }) => {
    const [newImage, setNewImage] = useState();

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFood(food => ({ ...food, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log(food);

            await axios.put(`${url}/api/food/update/${food._id}`, food);
            setUpdateFood(false);
            toast.success("Food item updated!");

        } catch (error) {
            toast.error("Error updating food item.");
        }
    }

    return (
        <div className='food-update-popup '>
            <form className="flex-col food-update-popup-container" onSubmit={handleSubmit}>
                <div className="food-update-popup-title">
                    <h2>Update Food</h2>
                    <p className='cross-btn' onClick={() => setUpdateFood(false)}><FaTimes /></p>
                </div>
                <div className="img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={newImage ? URL.createObjectURL(newImage) : food.image} alt="" />
                    </label>
                    <input type="file" name="" id="image" onChange={(e) => setNewImage(e.target.files[0])} hidden />
                </div>
                <div className="product-name flex-col">
                    <p>Product Name</p>
                    <input onChange={onChangeHandler} value={food.name} type="text" name='name' />
                </div>
                <div className="product-desc flex-col">
                    <p>Product Description</p>
                    <textarea onChange={onChangeHandler} value={food.description} name="description" id="" cols="30" rows="6"></textarea>
                </div>
                <div className="category-price">
                    <div className="category flex-col">
                        <p>Product Category</p>
                        <select onChange={onChangeHandler} name="category" id="">
                            <option value={food.category} selected disabled>{food.category}</option>
                            <option value="Salad" >Salad</option>
                            <option value="Rolls" >Rolls</option>
                            <option value="Deserts" >Deserts</option>
                            <option value="Sandwich" >Sandwich</option>
                            <option value="Cake" >Cake</option>
                            <option value="Pure Veg" >Pure Veg</option>
                            <option value="Pasta" >Pasta</option>
                            <option value="Noodles" >Noodles</option>
                        </select>
                    </div>
                    <div className="price flex-col">
                        <p>Product Price</p>
                        <input onChange={onChangeHandler} value={food.price} type="number" name="price" id="" placeholder='$ 20' />
                    </div>
                </div>
                <button type="submit" className='btn'>Update Food</button>
            </form >
        </div >
    )
}

export default FoodUpdate
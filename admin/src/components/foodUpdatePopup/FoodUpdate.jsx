import React from 'react'
import { assets } from '../../assets/assets'
import { useState } from 'react';
import { FaTimes } from "react-icons/fa";
import './FoodUpdate.css'

const FoodUpdate = ({ setUpdateFood, food, url, setFood }) => {
    const [image, setImage] = useState(food.image);

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFood(food => ({ ...food, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/food/update/${id}`, food);
            alert("Food item updated!");
            navigate('/admin/foods'); // Redirect to food list or dashboard
        } catch (error) {
            alert("Error updating food item.");
            console.error(error);
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
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    </label>
                    <input type="file" name="" id="image" onChange={(e) => setImage(e.target.files[0])} hidden />
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
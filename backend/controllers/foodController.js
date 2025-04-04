import food from "../models/food.js";
import fs from 'fs'
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});
// add food items
const addFood = async (req, res) => {

    const uploadResult = await cloudinary.uploader.upload(req.file.path);
    fs.unlink(`uploads/${req.file.path}`, () => { })
    const food_data = new food({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: uploadResult.url,
        category: req.body.category
    })
    try {
        await food_data.save();
        res.json({ success: true, message: "Food Added" })
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }

}
const listFood = async (req, res) => {
    try {
        const foodList = await food.find();
        res.json({ success: true, data: foodList })
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

const updateFood = async (req, res) => {
    try {
        await food.findByIdAndUpdate(req.params.id, req.body);
        res.json({ success: true, data: foodItem })
    } catch (error) {
        res.json({ success: false, message: "Error" })
    }
}

const removeFood = async (req, res) => {

    try {

        const foodItem = await food.findById(req.body.id);
        fs.unlink(`uploads/${foodItem.image}`, () => { })

        await food.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food removed" })
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}
export { addFood, listFood, removeFood, updateFood }
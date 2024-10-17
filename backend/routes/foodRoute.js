import crypto from "crypto";
import express from "express"
import { addFood, foodItem, listFood, removeFood } from "../controllers/foodController.js"
import multer from "multer"

const foodRouter = express.Router();


// image storage
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, callback) => {
        return callback(null, `${crypto.randomUUID({ disableEntropyCache: true })}.png`)
    }
})
const upload = multer({ storage: storage })

foodRouter.post("/add", upload.single("image"), addFood)

foodRouter.get("/list", listFood)

foodRouter.post("/remove", removeFood)

foodRouter.get("/item", foodItem)

export default foodRouter;
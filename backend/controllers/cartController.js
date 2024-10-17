import user from "../models/user.js";


const addToCart = async (req, res) => {
    try {
        let userData = await user.findById(req.body.userId);
        let cartData = await user.cartData;
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1
        }
        else {
            cartData[req.body.itemId] += 1;

        }
        await user.findByIdAndUpdate(req.body.userId, { cartData });
        return res.json({ success: true, message: "Added to Cart" })
    } catch (error) {
        res.json({ success: false, message: "Error." })
    }
}

const removeFromCart = async (req, res) => {
    try {
        let userData = await user.findById(req.body.userId);
        let cartData = await user.cartData;
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1
        }

        await user.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Removed from Cart" })
    } catch (error) {
        res.json({ success: false, message: "Error." })
    }
}
const getCart = async (req, res) => {
    try {
        let userData = await user.findById(req.body.userId);
        let cartData = await user.cartData;
        res.json({ success: true, cartData })
    } catch (error) {
        res.json({ success: false, message: "Error." })
    }
}

export { addToCart, removeFromCart, getCart };
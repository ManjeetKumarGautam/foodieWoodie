import order from "../models/order.js";
import user from "../models/user.js";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing user order for frontend
const frontendUrl = "https://foodiewoodie-frontend.onrender.com"

const placeOrder = async (req, res) => {

    try {
        const newOrder = new order({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
            paymentMethod: req.body.paymentMethod
        })
        await newOrder.save();
        await user.findByIdAndUpdate(req.body.userId, { cartData: {} });

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100 * 80
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2 * 100 * 80
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: ` ${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: ` ${frontendUrl}/verify?success=false&orderId=${newOrder._id}`,

        })
        res.json({ success: true, session_url: session.url })
    } catch (error) {
        console.log(error);
        res.json({ success: true, message: "Error" });

    }
}

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success == "true") {
            await order.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Paid" });
        }
        else {
            await order.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Not Paid" })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}
// user orders for frontend
const UserOrders = async (req, res) => {
    try {
        const orders = await order.find({ userId: req.body.userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

// Listing orders of admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await order.find({});
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}
// updating order status
const updateStatus = async (req, res) => {
    try {
        await order.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Status Updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}


const cod = async (req, res) => {
    try {
        const { address, items, amount, paymentMethod } = req.body;

        const newOrder = new order({
            userId: req.user.id,
            address,
            items,
            amount,
            paymentMethod, // "cod"
            status: "Pending", // Order status for COD
        });

        await newOrder.save();
        res.json({ success: true, message: "Order placed successfully via Cash on Delivery!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export { placeOrder, verifyOrder, UserOrders, listOrders, updateStatus, cod }
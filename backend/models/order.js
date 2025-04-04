import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    paymentMode: { type: String, required: true },
    status: { type: String, default: "Food Processing" },
    date: { type: Date, default: Date.now() },
    paymentStatus: { type: Boolean, default: false },
})

const orderModel = mongoose.models.order || mongoose.model("orders", orderSchema);

export default orderModel;
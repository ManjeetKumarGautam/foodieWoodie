import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    paymenMethod: { type: String, required: true },
    status: { type: String, default: "Food Processing" },
    date: { type: Date, default: Date.now() },
    userId: { type: Boolean, default: false },
})

const order = mongoose.models.order || mongoose.model("orders", orderSchema);

export default order;
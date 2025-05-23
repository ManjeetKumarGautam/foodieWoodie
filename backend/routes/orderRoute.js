import express from "express";
import authMiddleware from "../middleware/auth.js";

import { placeOrder, UserOrders, verifyOrder, listOrders, updateStatus, cod } from "../controllers/orderController.js";


const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/cod", authMiddleware, cod);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders", authMiddleware, UserOrders);
orderRouter.get("/list", listOrders);
orderRouter.post("/status", updateStatus)

export default orderRouter;
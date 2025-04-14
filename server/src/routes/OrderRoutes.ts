import express from "express";

import { adminOnly } from "../middlewares/auth.js";
import { NewOrder, allOrders, deleteOrder, getSingleOrder, myOrders, processOrder } from "../controllers/OrderController.js";

const app = express.Router();

app.post("/new",NewOrder)

app.get("/my", myOrders);


app.get("/all",adminOnly,allOrders);

app.get("/:id", getSingleOrder);

app.put("/:id", adminOnly, processOrder);


app.delete("/:id", adminOnly, deleteOrder);




export default app;

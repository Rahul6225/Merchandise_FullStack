import express from "express";

import { adminOnly } from "../middlewares/auth.js";
import { singleUpload } from "../middlewares/multer.js";
import {
  GetLatestProduct,
  deleteProduct,
  getAdminProducts,
  getAllCategories,
  getAllProducts,
  getSingleProduct,
  newProduct,
  updateProduct,
} from "../controllers/productController.js";

const app = express.Router();

app.post("/new", adminOnly, singleUpload, newProduct);
app.get("/latest", GetLatestProduct);
app.get("/categories", getAllCategories);
app.get("/admin-products", adminOnly, getAdminProducts);
app.get("/all", getAllProducts);
app.get("/:id", getSingleProduct);
app.put("/:id",adminOnly,singleUpload, updateProduct);
app.delete("/:id",adminOnly, deleteProduct);





export default app;

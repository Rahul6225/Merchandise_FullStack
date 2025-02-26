const express = require("express");
const DB = require("./configs/Configs.js");
const cors = require("cors");
require("dotenv").config();
const productroutes = require("./Routes/product.js");
const cartroutes = require('./Routes/cart.js');

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

// HOMEPAGE ROUTE
app.get("/", (req, res) => {
  res.send("HOMEPAGE");
  console.log("Home Page viewed");
});

// GET ALL PRODUCTS
app.use("/products", productroutes);

// ADD A PRODUCT TO WEBSITE
app.use("/add-product", productroutes);

//Delete Product FROM WEBSITE
app.use("/", productroutes);

//ADD ITEM FROM cart
app.use("/",cartroutes)

//GET ITEMS FROM CAFRT
app.use('/',cartroutes)


app.listen(port, () => {
  console.log(`Server is Running on port ${port}`);
});

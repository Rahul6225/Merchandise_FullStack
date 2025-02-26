const express = require("express");
const Router = express.Router();
const DB = require("../configs/Configs.js");

//ADD TO CART
Router.post("/add-to-cart", (req, res) => {
  const { product_id, name, price, quantity } = req.body;

  // Validate input
  if (!product_id || !name || !price || !quantity) {
    return res.status(400).json({ error: "All fields are required!" });
  }
  const sql = `INSERT INTO cart (product_id,name, price, quantity)
      VALUES (?,?,?,?) 
      ON DUPLICATE KEY UPDATE  
      quantity=quantity+VALUES(quantity);
      `;

  DB.query(sql, [product_id, name, price, quantity], (err, result) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ error: err.message });
    }
    return res
      .status(201)
      .json({ message: "Product Added to CART Successfully!", result });
  });
});

//GET ITEMS FROM CART

Router.get("/cart", (req, res) => {
  DB.query("SELECT * FROM cart", (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
    console.log("Data Fetched From Cart");
  });
});

// DELETE ITEMS FROM CART

Router.delete("/:id", (req, res) => {
  const { id } = req.params;
  //check if product is exists
  const checkinsql = "SELECT * FROM cart WHERE id = ?";
  DB.query(checkinsql, [id], (err, result) => {
    if (err) return res.status(500).json({ err: err.message });

    if (result.length == 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    const sql = "DELETE FROM cart WHERE id = ?";
    DB.query(sql, [id], (err, result) => {
      if (err) res.send(500).json({ error: err.message });
      res.json({ message: "Product Deleted" });
      console.log("Product deleted");
    });
  });
});

module.exports = Router;

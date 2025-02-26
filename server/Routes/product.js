const express = require ('express');
const Router = express.Router();
const DB = require('../configs/Configs.js')

Router.get("/products", (req, res) => {
    DB.query("SELECT * FROM products", (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(result);
      console.log("Data-Fetched");
    });
});

Router.post("/add-product", (req, res) => {
    const { name, price, quantity } = req.body;
  
    // Validate input
    if (!name || !price || !quantity) {
      return res.status(400).json({ error: "All fields are required!" });
    }
    const sql =`INSERT INTO products (name, price, quantity)
      VALUES (?, ?, ?) 
      ON DUPLICATE KEY UPDATE  
      quantity=quantity+VALUES(quantity);
      `;
      
    DB.query(sql, [name, price, quantity], (err, result) => {
      if (err) {
        console.error("Database Error:", err); // Debugging log
        return res.status(500).json({ error: err.message }); // Stop execution after sending response
      }
      return res
        .status(201)
        .json({ message: "Product Added Successfully!", result });
    });
});
module.exports = Router;
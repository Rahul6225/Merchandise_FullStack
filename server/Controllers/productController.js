const Product = require("../Models/product");

const getAllProducts = (req, res) => {
    Product.getAllProducts((err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
};

const addProduct = (req, res) => {
    const { product_id, name, price, quantity } = req.body;

    if (!product_id || !name || !price || !quantity) {
        return res.status(400).json({ error: "All fields are required!" });
    }

    Product.addProduct(product_id, name, price, quantity, (err, result) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ error: err.message });
        }
        return res.status(201).json({ message: "Product Added Successfully!", result });
    });
};

const deleteProduct = (req, res) => {
    const { id } = req.params;

    Product.checkProduct(id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        if (result.length == 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        Product.deleteProduct(id, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Product Deleted Successfully!" });
        });
    });
};

module.exports = { getAllProducts, addProduct, deleteProduct };

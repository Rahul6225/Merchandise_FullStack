const Cart = require("../Models/cart");

const addToCart = (req, res) => {
    const { product_id, name, price, quantity } = req.body;

    if (!product_id || !name || !price || !quantity) {
        return res.status(400).json({ error: "All fields are required!" });
    }

    Cart.addToCart(product_id, name, price, quantity, (err, result) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ error: err.message });
        }
        return res.status(201).json({ message: "Product Added to Cart Successfully!", result });
    });
};

const getCartItems = (req, res) => {
    Cart.getCartItems((err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
};

const deleteCartItem = (req, res) => {
    const { id } = req.params;

    Cart.checkCartItem(id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        if (result.length == 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        Cart.deleteCartItem(id, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Product Deleted from Cart" });
        });
    });
};

module.exports = { addToCart, getCartItems, deleteCartItem };

const DB = require("../configs/Configs");

const Product = {
  getAllProducts: (callback) => {
    const sql = "SELECT * FROM products";
    DB.query(sql, [], callback);
  },

  addProduct: (product_id, name, price, quantity, callback) => {
    const sql = `INSERT INTO products (product_id, name, price, quantity)
                 VALUES (?, ?, ?, ?) 
                 ON DUPLICATE KEY UPDATE  
                 quantity=quantity+VALUES(quantity)`;
    DB.query(sql, [product_id, name, price, quantity], callback);
  },

  deleteProduct: (id, callback) => {
    const sql = "DELETE FROM products WHERE id = ?";
    DB.query(sql, [id], callback);
  },

  checkProduct: (id, callback) => {
    const sql = "SELECT * FROM products WHERE id = ?";
    DB.query(sql, [id], callback);
  }
};

module.exports = Product;

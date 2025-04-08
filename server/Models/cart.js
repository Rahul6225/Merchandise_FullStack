const DB = require("../configs/Configs");

const Cart = {
  addToCart: (product_id, name, price, quantity, callback) => {
    const sql = `INSERT INTO cart (product_id, name, price, quantity)
                 VALUES (?, ?, ?, ?) 
                 ON DUPLICATE KEY UPDATE  
                 quantity=quantity+VALUES(quantity)`;
    DB.query(sql, [product_id, name, price, quantity], callback);
  },

  getCartItems: (callback) => {
    const sql = "SELECT * FROM cart";
    DB.query(sql, [], callback);
  },

  deleteCartItem: (id, callback) => {
    const sql = "DELETE FROM cart WHERE id = ?";
    DB.query(sql, [id], callback);
  },

  checkCartItem: (id, callback) => {
    const sql = "SELECT * FROM cart WHERE id = ?";
    DB.query(sql, [id], callback);
  }
};

module.exports = Cart;

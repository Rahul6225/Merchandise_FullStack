const express = require("express");
const DB = require("./configs/Configs.js");
const cors = require("cors");
require("dotenv").config();
const productroutes = require('./Routes/product.js')

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

// HOMEPAGE ROUTE
app.get("/", (req, res) => {
  res.send("HOMEPAGE");
});

// GET ALL PRODUCTS
app.use('/',productroutes);


// ADD A PRODUCT (POST REQUEST)
app.use('/add-product',productroutes);

app.delete('/products/:id',(req,res)=>{
    const {id} = req.params;
    //check if product is exists
    const checkinsql = "SELECT * FROM products WHERE id = ?";
    DB.query(checkinsql,[id],(err,result)=>{
        if(err) return res.status(500).json({err:err.message});

        if(result.length == 0){
            return res.status(404).json({message:"Product not found"});
        }
        const sql = "DELETE FROM products WHERE id = ?";
        DB.query(sql,[id],(err,result)=>{
            if(err) res.send(500).json({error:err.message});
            res.json({message:"Product Delete"})
            console.log("Product deleted");
        })
    })

    
})

app.listen(port, () => {
  console.log(`Server is Running on port ${port}`);
});

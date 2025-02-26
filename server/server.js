const express = require('express');
const DB = require('./Configs.js');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;

app.get('/',(req,res)=>{
    DB.query("SELECT * FROM users",(err,result)=>{
        if(err){
            return res.status(500).json({
                error:err.message
            });
        }
        res.json(result);
    })
});

app.post('/',(req,res)=>{
    // const Data = {id:105,name:"Prabal",Roll_number:657}; // static DATA
    const Data = req.body;
    DB.query("INSERT INTO users SET ?",Data,(error,result,fields)=>{
        if(error) res.status(500).json({error:err.message});
        res.status(200).send(result);
    })
})
app.listen(port,()=>{
    console.log(`Server is Running on port ${port}`)
});
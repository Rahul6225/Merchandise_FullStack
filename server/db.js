const mysql = require("mysql");

require('dotenv').config();

const DB = mysql.createConnection({
    host:process.env.DB,
    user:'root',
    password:"",
    database:'test'

});

DB.connect((err)=>{
    if(err){
        console.warn("ERROR");
    }
    else{
        console.warn("MySQL Connected Succesfully......");
    }
});

DB.query("select * from users ",(err,res)=>{
    console.warn("Result",res);
})

module.exports = DB;
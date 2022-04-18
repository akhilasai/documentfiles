const express=require('express');
const app=express();
const port=7000;
require('./dbconnection/connect')
const User=require("./model/userSchema")

app.get('/',(req,res)=>{
const data
}); 

app.listen(port,()=>{
console.log("Server Started")
});
const express=require('express');
const mongoose=require('mongoose');

const router=require('./router');

var MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/mydatabase'
const app=express()

mongoose.connect(url,
    {   useNewUrlParser : true,
        // useFindAndModify: false,
        // useUnifiedTopology: true})
    })
// const con=mongoose.connection

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});


// con.on('open',function(){
//     console.log("Connected....")
// })


app.listen(9000, function(){
    console.log("server started")
});
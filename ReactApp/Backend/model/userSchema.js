const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String
    },
    phone_number:{
        type:Number
    },
    age:{
        type:Number
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
})

const User=mongoose.model("User",userSchema)
module.export=User;
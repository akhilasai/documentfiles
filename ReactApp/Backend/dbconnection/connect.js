const mongoose = require('mongoose')
const url = 'mongodb+srv://athumma:Akhila%40123@cluster0.iiybw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose
        .connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        console.log("Database connected successfully"))

        .catch((error) => {
            console.log(error);
        })


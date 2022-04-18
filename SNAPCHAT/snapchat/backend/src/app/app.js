//Importing Express and Mongoose
const express = require('express')
const mongoose = require('mongoose')

//Assiging Express to varaible app
const app = express();

// Created use function to get body i.e data
app.use(express.json())

//Assigning port number to port varaible
const port = 1109;

// const userRoutes = require('./src/routes/userRoutes')
const cors = require('cors')
app.use(cors())
// const userschema = require('./src/schema/userSchema')
const userroutes = require('../routes/router')
app.use("/", userroutes)
app.use(express.urlencoded({ extended: true }))

//Connecting to mongodb using url.
mongoose.connect("mongodb+srv://athumma:Akhila%40123@cluster0.iiybw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",

	{
		useNewUrlParser: true,
		// useFindAndModify: false,
		useUnifiedTopology: true
	}
);
const con = mongoose.connection
con.once("open", function () {
	console.log("Database connection successfully")
})
app.listen(port, () => {
	console.log(`app listening http://localhost:${port}`)
})

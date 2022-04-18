//Importing mongoose
const mongoose = require('mongoose');
//Connected to Database 
const url = "mongodb+srv://athumma:Akhila%40123@cluster0.iiybw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose
	.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.catch((error) => {
		console.log(error)
	})

const con = mongoose.connection
con.once('open', () => console.log("Database Connected Successfully"))
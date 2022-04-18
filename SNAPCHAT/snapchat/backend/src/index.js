const express = require('express');
const port = 1109
const cors = require('cors');
const app = express();
const userSchemadata = require("./schema/userdata")

app.use(express.json());
app.use(cors());

require("./database/connect")

// app.use('/',userSchemadata)

app.post('/userPostData', (req, res) => {
	console.log(req.body)
	userSchemadata.insertMany(req.body)
	res.send("done")
})

app.post('/validateDetails', (req, res) => {
	console.log(req.body)
	userSchemadata.find(req.body, (err, data) => res.status(200).send(data))

})

app.listen(port, () =>
	console.log("Listening on port: " + port)
)
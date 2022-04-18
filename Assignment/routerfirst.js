const express = require('express');
let app=express();
const router = express.Router();
   

router.get('/',(req, res) => {
    res.end('When a GET request is made, then this '
            + 'is the response sent to the client!');
})
app.use

module.exports = router;
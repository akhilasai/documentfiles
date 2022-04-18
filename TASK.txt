const express = require('express') //importing the express
const app = express() //calling the express function and storing it in a variable
const port = 3000 //assigning a port to it
const fs = require('fs') // importing fs
var bodyParser = require("body-parser"); //importing body parser, body-parser is which allows express to read the body and then parse that into a Json object that we can understand
app.use(bodyParser.json());
const midFun = require('./middlewareFun')

// The app.listen() function is used to bind and listen the connections on the
// specified host and port.
app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})

function CreateTable(req, res, next) {
    if (fs.existsSync('./database/' + req.params.table_name + '.json')) {
        res.end("Table already exists")
        next('route')
    } else {
        next()
        // res.end()
    }

}
function CreateRecordInTable(req, res, next) {
    if (fs.existsSync('./database/' + req.params.table_name + '.json')) {
        next()
    } else {
        res.end("Table does not exists")
        // next('route')

    }

}

app.post('/create_table/:table_name', CreateTable, (req, res) => {
    let table_name = req.params.table_name
    let data = '[]'
    fs.writeFile('./database/' + table_name + '.json', data, (err) => { //writing the new data from postman and appending it with existing data in file
        if (err) 
            console.log(err);
        else {
            console.log("table written successfully\n");
            res.end(data);
        }
    });
});

app.post('/create_record/:table_name', CreateRecordInTable, (req, res) => {
    let table_name = req.params.table_name

    fs.readFile('./database/' + table_name + '.json', 'utf8', (err, data) => {
        data = JSON.parse(data)
        data.push(req.body)
        data = JSON.stringify(data)
        fs.writeFile('./database/' + table_name + '.json', data, (err) => { //writing the new data from postman and appending it with existing data in file
            if (err) 
                console.log(err);
            else {
                console.log("table written successfully\n");
                res.end(data);
            }
        });
    });

});

app.delete('/delete_table/:table_name', (req, res) => {
    let table_name = req.params.table_name

    fs.unlink('./database/' + table_name + '.json', function (err) {
        if (err) 
            throw err;
        res.end('table deleted! ');
    })
});

app.delete('/delete_record/:table_name/:key', (req, res) => {
  let table_name = req.params.table_name
  let val=req.params.key

  fs.readFile('./database/' + table_name + '.json', 'utf8', (err, data) => {
        data = JSON.parse(data)
        let obj=data.filter(a=>a.id!=val)
        obj=JSON.stringify(obj)
        fs.writeFile('./database/' + table_name + '.json', obj, (err) => { //writing the new data from postman and appending it with existing data in file
            if (err) 
                console.log(err);
            else {
                console.log("table written successfully\n");
                res.end(obj);
            }
        });
    });
});

app.put('/update_record/:table_name/:val', (req, res) => {
    let table_name = req.params.table_name
    let val=req.params.val

  
    fs.readFile('./database/' + table_name + '.json', 'utf8', (err, data) => {
          data = JSON.parse(data)
          let obj = data.map(a=>{
            // console.log(a.id,val,typeof a.id, typeof val)
              if(a.id===val){
                  a = req.body;
                  a.id = val;
          }
          return a
        })
          console.log(obj)
          obj=JSON.stringify(obj)
          fs.writeFile('./database/' + table_name + '.json', obj, (err) => { //writing the new data from postman and appending it with existing data in file
              if (err)
                  console.log(err);
              else {
                  console.log("table written successfully\n");
                  res.end(obj);
              }
          });
      });
  });

app.get('/:table_name/:id?', (req, res) => {
    let id = req.params.id
    let tableName = req.params.table_name
    if(id === undefined){
        fs.readFile('./database/' + tableName + '.json', 'utf8', (err, data) => {
            res.end(data)
    })
    }
    else{
        fs.readFile('./database/' + tableName + '.json', 'utf8', (err, data) => {
            data = JSON.parse(data)
            res.end(JSON.stringify(data.filter(a=>a.id === id)))
    })
    }
})

app.get('/:table_name/lessthan/:key/:val', (req, res) => {
    let key = req.params.key
    let val = req.params.val
    let tableName = req.params.table_name
    fs.readFile('./database/' + tableName + '.json', 'utf8', (err, data) => {
        data = JSON.parse(data)
        res.end(JSON.stringify(data.filter(a=>a[key]<val)))
    });
})

app.get('/:table_name/greaterthan/:key/:val', (req, res) => {
    let key = req.params.key
    let val = req.params.val
    let tableName = req.params.table_name
    fs.readFile('./database/' + tableName + '.json', 'utf8', (err, data) => {
        data = JSON.parse(data)
        res.end(JSON.stringify(data.filter(a=>a[key]>val)))
    });
})
  

app.get('/', (req, res) => {
    res.end('Hello World!');
});

//re  in movies.json
app.get("/:table_name", (req, res) => {
    fs.readFile(__dirname + '/demo.json', 'utf8', (err, data) => {
        res.end(data);
    });
});

//post is used to insert new data into the api
app.post('/list_members', (req, res) => {
    fs.readFile(__dirname + '/demo.json', 'utf8', (err, data) => {
        data = JSON.parse(data) //converts string to array
        data.push(req.body) //appending the data written into the api and appending it with existing data
        data = JSON.stringify(data) //converting into string
        fs.writeFile(__dirname + '/demo.json', data, (err) => { //writing the new data from postman and appending it with existing data in file
            if (err) 
                console.log(err);
            else {
                console.log("File written successfully\n");
                // console.log("The written has the following contents:");
                // console.log(fs.readFileSync("books.txt", "utf8"));
                res.end(data);
            }
        });
    });

})

//used to retrieve data with specific id only
app.get("/list_members/:index", (req, res) => {
    fs.readFile(__dirname + '/demo.json', 'utf8', (err, data) => {
        let findId = req.params.index //storing the id put in the command
        data = JSON.parse(data) //converts string to array
        let obj = data.filter(a => a.index.toString() === findId) //checks if the id given as input in the commnad is there or not
        //  console.log(obj)
        res.end(JSON.stringify(obj)); //converts the object to string format
    });
});

//get elements by fone_number
app.get("/list_member/:fone_number", (req, res) => {
    fs.readFile(__dirname + '/demo.json', 'utf8', (err, data) => {
        let findId = req.params.fone_number //storing the id put in the command
        data = JSON.parse(data) //converts string to array
        let obj = data.filter(a => a.fone_number.toString() === findId) //checks if the id given as input in the commnad is there or not
        //  console.log(obj)
        res.end(JSON.stringify(obj)); //converts the object to string format
    });
});

//get elements by first_name
app.get("/list_memberss/:first_nmae", (req, res) => {
    fs.readFile(__dirname + '/demo.json', 'utf8', (err, data) => {
        let findId = req.params.first_nmae //storing the id put in the command
        data = JSON.parse(data) //converts string to array
        let obj = data.filter(a => a.first_nmae.toString() === findId) //checks if the id given as input in the commnad is there or not
        //  console.log(obj)
        res.end(JSON.stringify(obj)); //converts the object to string format
    });
});

//get elements by last_name
app.get("/list_membersss/:last_name", (req, res) => {
    fs.readFile(__dirname + '/demo.json', 'utf8', (err, data) => {
        let findId = req.params.last_name //storing the id put in the command
        data = JSON.parse(data) //converts string to array
        let obj = data.filter(a => a.last_name.toString() === findId) //checks if the id given as input in the commnad is there or not
        //  console.log(obj)
        res.end(JSON.stringify(obj)); //converts the object to string format
    });
});

//used to delete a specific element with a particular id
app.delete("/list_members/:index", (req, res) => {
    fs.readFile(__dirname + '/demo.json', 'utf8', (err, data) => {
        let findId = req.params.index //retrieving the id put in the command
        data = JSON.parse(data) //converts string to array
        let obj = data.filter(a => a.index.toString() !== findId) //checks if the id given as input in the commnad is there or not
        //  console.log(obj)

        fs.writeFile(__dirname + '/demo.json', JSON.stringify(obj), (err) => {
            if (err) 
                console.log(err);
            else {
                console.log("File written successfully\n");
                // console.log("The written has the following contents:");
                // console.log(fs.readFileSync("books.txt", "utf8"));
                res.end(JSON.stringify(obj));
            }
        }); //converts the object to string format
    });
});
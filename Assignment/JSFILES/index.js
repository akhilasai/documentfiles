const express = require('express')    //importing the express
const app = express()                 //calling the express function and storing it in a variable
const port = 3000                    //assigning a port to it
const fs = require('fs')             // importing fs
var bodyParser = require("body-parser");  //importing body parser, body-parser is which allows express to read the body and then parse that into a Json object that we can understand
app.use(bodyParser.json());  

//The app.listen() function is used to bind and listen the connections on the specified host and port. 
app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
//returns hello world when we open the local host without any params
app.get('/', (req, res) => {        //
  res.end('Hello World!');
});


//returns the data in movies.json 
app.get("/stack_flow", (req, res) => {
  fs.readFile(__dirname + '/' + 'stack.json', 'utf8', (err, data) => {
      res.end(data);
  });
});


//post is used to insert new data into the api
app.post('/stack_flow',(req,res)=>
{
  fs.readFile(__dirname + '/' + 'stack.json', 'utf8', (err, data) => {
    data=JSON.parse(data)      //converts string to array
    data.push(req.body)        //appending the data written into the api and appending it with existing data
    data=JSON.stringify(data)  //converting into string
    fs.writeFile(__dirname + '/' + 'stack.json', data, (err) => {   //writing the new data from postman and appending it with existing data in file
      if (err)
        console.log(err);
      else {
        console.log("File written successfully\n");
        //console.log("The written has the following contents:");
        //console.log(fs.readFileSync("books.txt", "utf8"));
        res.end(data);
      }
    });
});
  
})




//used to retrieve data with specific id only
app.get("/stack_flow/:id", (req, res) => {
    fs.readFile(__dirname + '/' + 'stack.json', 'utf8', (err, data) => {
     let findId=req.params.id   //storing the id put in the command
     data=JSON.parse(data) //converts string to array
     let obj=data.filter(a=>a.id.toString()===findId) //checks if the id given as input in the commnad is there or not
    //console.log(obj)
    res.end(JSON.stringify(obj));  //converts the object to string format
    });
});

//post is used to insert new data into the api
app.post('/stack_flow',(req,res)=>
{
  
  fs.readFile(__dirname + '/' + 'stack.json', (err, data) => {
    data=JSON.parse(data)      //converts string to array
    data.push(req.body)        //appending the data written into the api and appending it with existing data
    data=JSON.stringify(data)  //converting into string
    fs.writeFile(__dirname + '/' + 'stack.json', data, (err) => {   //writing the new data from postman and appending it with existing data in file
      if (err)
        console.log(err);
      else {
        console.log("File written successfully\n");
        //console.log("The written has the following contents:");
        //console.log(fs.readFileSync("books.txt", "utf8"));
        res.end(data);
      }
    });
});
  
})

//used to retrieve data with specific id only
app.get("/stack_flow/:id", (req, res) => {
    fs.readFile(__dirname + '/' + 'stack.json', 'utf8', (err, data) => {
     let findId=req.params.id   //storing the id put in the command
     data=JSON.parse(data) //converts string to array
     let obj=data.filter(a=>a.id.toString()===findId) //checks if the id given as input in the commnad is there or not
    //  console.log(obj)
        res.end(JSON.stringify(obj));  //converts the object to string format
    });
});

//used to delete a specific element with a particular id
app.delete("/stack_flow/:account_id", (req, res) => {
  fs.readFile(__dirname + '/' + 'stack.json', 'utf8', (err, data) => {
   let findId=req.params.id   //retrieving the id put in the command
   data=JSON.parse(data) //converts string to array
   let obj=data.filter(a=>a.account_id.toString()!==findId) //checks if the id given as input in the commnad is there or not
  //  console.log(obj)
       
      fs.writeFile(__dirname + '/' + 'stack.json',JSON.stringify(obj), (err) => {
        if (err)
          console.log(err);
        else {
          console.log("File written successfully\n");
          //console.log("The written has the following contents:");
          //console.log(fs.readFileSync("books.txt", "utf8"));
          res.end(JSON.stringify(obj));
        }
      }); //converts the object to string format
  });
});
});
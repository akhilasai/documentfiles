const express = require('express')  //importing the express
const app=express()                 //calling the express function and storing it in a variable
const fs = require('fs')            // importing fs
const port = 3000                   //assigning a port to it
var bodyParser = require("body-parser");  //importing body parser, body-parser is which allows express to read the body and then parse that into a Json object that we can understand
app.use(bodyParser.json());  

app.get('/',(req,res)=>{
    res.send("CURD Application")
})
//The app.listen() function is used to bind and listen the connections on the specified host and port. 
app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})

//returns hello world when we open the local host without any params
app.get('create_table/:table_name',getCheck, (req, res) => {   
    fs.readFile(__dirname +'/database'+ '/' + req.params.table_name +'.json',(err,data) => {
       res.send(data)
    })     
    
});

function getCheck(req,res,next){
    fs.readFile(__dirname +'/database'+ '/' + req.params.table_name +'.json',(err,data) => {
        if (err){
            next('route')
            res.end("404")
        }else if(data){
            next()
        }
    })
}

app.post('/create_table/:table_name',(req,res)=>{
    let body=req.body
    fs.writeFile(__dirname +'/database'+ '/' + table_name +'.json',JSON.stringify(body), (err) => {
        if (err)
          console.log(err);
        else {
          console.log("File written successfully\n");
          res.end(JSON.stringify(body)) 
        }
      }); 
})


app.delete("/:table_name/:id", (req, res) => {
    fs.readFile(__dirname +'/database'+ '/' + req.params.table_name +'.json',(err,data) => {
        let findId=req.params.id   //retrieving the id put in the command
     data=JSON.parse(data) //converts string to array
     let obj=data.filter(a=>a.id.toString()!==findId) //checks if the id given as input in the commnad is there or not
    //  console.log(obj)
    fs.writeFile(__dirname + '/' + '.json',JSON.stringify(obj), (err) => {
        if (err)
          console.log(err);
        else {
          console.log("File written successfully\n");
          //console.log("The written has the following contents:");
          //console.log(fs.readFileSync("books.txt", "utf8"));
          res.end(JSON.stringify(obj));
        }
      });
    })

    fs.readFile(__dirname + '/' + 'data.json', 'utf8', (err, data) => {
     let findId=req.params.id   //retrieving the id put in the command
     data=JSON.parse(data) //converts string to array
     let obj=data.filter(a=>a.id.toString()!==findId) //checks if the id given as input in the commnad is there or not
    //  console.log(obj)
         
        fs.writeFile(__dirname + '/' + 'data.json',JSON.stringify(obj), (err) => {
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

app.put("/create_table/:id", (req, res) => {
    fs.readFile(__dirname + '/' + 'data.json', 'utf8', (err, data) => {
     let findId=req.params.id   //retrieving the id put in the command
     let new_val=req.body.name
    //  console.log(req.body)
     data=JSON.parse(data) //converts string to array
     let obj=data.map(a=>{
         if(a.id==findId)
         {
             a.name=new_val
         }
         return a

     })
    res.send(JSON.stringify(obj))
    });
});
  



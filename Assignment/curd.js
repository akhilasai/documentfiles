/**
 * Implementation of Curd properties i.e Create,Read,Update and Delete. 
 */

// Importing Express and FileStream
const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;
// var bodyParser = require("body-parser");  //importing body parser, body-parser is which allows express to read the body and then parse that into a Json object that we can understand
// app.use(bodyParser.json()); 
  

const test = require('./router.js');
app.use('/', test);

app.listen(3000);

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})

//middleware function to check the table exists or not.
function Check(req,res,next){
    var t_name = req.params.table_name;
    console.log(t_name);
    console.log(__dirname)
    try{
        if(fs.existsSync(__dirname+'/database'+'/'+t_name+'.json')){
            console.log("File Exists")
            res.sendStatus(201)
        }
        else{
            console.log("File does not Exists");
            res.sendStatus(404)
            next();
        }
    }
    catch(err)
    {
        res
            .sendStatus(403)
            .send(err);
    }
}

app.get('/create_table/:table_name',Check, (req, res) => {  
    console.log(__dirname)
    fs.readFile(__dirname +'/database'+ '/' + req.params.table_name +'.json',(err,data) => {
        res.send(data)
}); 
});

app.post('/create_table/:table_name',(req,res)=>{
    fs.readFile(__dirname +'/database'+ '/' + req.params.table_name +'.json',(err,data) => { 
        // console.log(err,data)
        if(err) {
            // console.log(err)
          let data="[]"
          fs.writeFile(__dirname +'/database'+ '/' + req.params.table_name +'.json',data,(err)=>{
              if(err) {
                  console.log("error")
              }
              else{
                  console.log("file written successfully")
              }
          })
          console.log(data)
          }  
        else
        {
            res.end("File Exsits")
        }
})
})

app.post('/create_record/:table_name',(req,res)=>{
   
    fs.readFile(__dirname +'/database'+ '/' + req.params.table_name +'.json','utf8',(err,data) => { 
    data=JSON.parse(data);
    console.log(data)
    let body=req.body
    data.push(body)
    data=JSON.stringify(data)
    
    fs.writeFile(__dirname +'/database'+ '/' + req.params.table_name +'.json',JSON.stringify(data), (err) => {
        if (err)
          console.log(err);
        else {
          console.log("File written successfully\n");
          res.end(JSON.stringify(body));
        }
      }); 
});
});
app.delete('/delete_table/:table_name',(req,res)=>{
    fs.unlink(__dirname + '/database' +'/'+ req.params.table_name+'.json',(err, data)=>{
        if(err) {
            res.end("404")
        }
        res.end("Table deleted")
    })
})
app.delete("/delete_record/:table_name/:id", (req, res) => {
    fs.readFile(__dirname + '/database' +'/'+ req.params.table_name+'.json',(err, data) => {
     let findId=req.params.id   //retrieving the id put in the command
     data=JSON.parse(data) //converts string to array
     console.log(data)
     let obj=data.filter(a=>a.id.toString()!=findId) //checks if the id given as input in the commnad is there or not
    //  console.log(obj)
         
        fs.writeFile(__dirname + '/database' +'/'+ req.params.table_name+'.json',JSON.stringify(obj), (err) => {
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

  app.put("/update_record/:table_name/:id", (req, res) => {
    fs.readFile(__dirname + '/database' + '/'+req.params.table_name+'.json', 'utf8', (err, data) => {
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
     fs.writeFile(__dirname + '/database' +'/'+ req.params.table_name+'.json',JSON.stringify(obj), (err) => {
        if (err)
          console.log(err);
        else {
          console.log("File written successfully\n");
          //console.log("The written has the following contents:");
          //console.log(fs.readFileSync("books.txt", "utf8"));
          res.end(JSON.stringify(obj));
        }
      }); 
    res.send(JSON.stringify(obj))
    });
});

app.get('/read_table/:table_name', (req, res) => {  
    fs.readFile(__dirname +'/database'+ '/' + req.params.table_name +'.json',(err,data) => {
        res.send(data)
}); 
});

app.get('/read_table/:table_name/:id', (req, res) => {  
    fs.readFile(__dirname +'/database'+ '/' + req.params.table_name +'.json','utf8',(err,data) => {
        data=JSON.parse(data);
        let findId=req.params.id
        let obj=data.filter(a=>a.id==findId);
        console.log(obj)
        res.end(JSON.stringify(obj))
}); 
});

app.get('/read_table/:table_name/lessthan/:column_name/:value', (req, res) => {  
    fs.readFile(__dirname +'/database'+ '/' + req.params.table_name +'.json','utf8',(err,data) => {
        data=JSON.parse(data);
        let value=req.params.value;
        console.log(value);
        let obj=data.filter(a=>a.name<value);
        console.log(obj)
        res.end(JSON.stringify(obj))
}); 
});

app.get('/read_table/:table_name/greaterthan/:column_name/:value', (req, res) => {  
    fs.readFile(__dirname +'/database'+ '/' + req.params.table_name +'.json','utf8',(err,data) => {
        data=JSON.parse(data);
        let value=req.params.value;
        console.log(value);
        let obj=data.filter(a=>a.name>value);
        console.log(obj)
        res.end(JSON.stringify(obj))
}); 
});


